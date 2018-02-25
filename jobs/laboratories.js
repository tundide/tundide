const http = require("http");
const cheerio = require('cheerio');
const _ = require('lodash');
const microprofiler = require('microprofiler');
let Laboratory = require('../models/laboratory');

function trimArray(array) {
    array = array.map(function(el) {
        return el.trim();
    });
    return array;
}

function parseDate(s) {
    let months = {
        ene: 0,
        feb: 1,
        mar: 2,
        abr: 3,
        may: 4,
        jun: 5,
        jul: 6,
        ago: 7,
        sep: 8,
        oct: 9,
        nov: 10,
        dic: 11
    };
    let p = s.split('.');
    return new Date('20' + p[2], months[p[1].toLowerCase()], p[0]);
}

module.exports = {
    process: function() {
        let laboratories = [];
        let todo = []; // list of urls to process
        let running = 0; // number of running workers.

        for (i = 1; i < 4; i++) {
            todo.push({
                url: 'http://ar.kairosweb.com/laboratorios.html?g=' + i
            });
        }


        function processOne() {
            let urlToProcess = _.first(todo, 1);
            _.remove(todo, function(urlInProcess) {
                return urlInProcess.url === urlToProcess.url;
            });

            running++;

            http.get(urlToProcess.url, (resp) => {
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    $ = cheerio.load(data);

                    if ($(data).find('.indice').length > 0) { // Estoy en el indice de laboratorios
                        $('.productos td a[target="_parent"]').each(function(i, elem) {
                            if ($(this).text() != '') {

                                let laboratory = {
                                    code: elem.attribs.href.split('-').pop(),
                                    name: $(this).text(),
                                    medicines: []
                                };

                                todo.push({
                                    name: $(this).text(),
                                    url: 'http://ar.kairosweb.com/' + $(this).attr("href")
                                });

                                laboratories.push(laboratory);
                            }
                        });
                    }
                    if ($(data).find('.lab_info').length > 0) { // Estoy en el detalle del laboratorio
                        $('.productos td a[target="_parent"]').each(function(i, elem) {
                            if ($(this).text() != '') {
                                let medicine = {
                                    code: elem.attribs.href.split('-').pop(),
                                    name: $(this).text(),
                                    types: [],
                                    drugs: [],
                                    actions: [],
                                    formats: []
                                };


                                todo.push({
                                    name: $(this).text(),
                                    url: 'http://ar.kairosweb.com/laboratorios/' + $(this).attr("href")
                                });


                                let actualLaboratory = _.find(laboratories, (laboratory) => {
                                    return laboratory.name === urlToProcess.name;
                                });
                                actualLaboratory.medicines.push(medicine);
                            }
                        });
                    }

                    if ($(data).find('.nombre_produc').length > 0) { // Estoy en la medicina
                        let actualMedicine;
                        _.find(laboratories, function(laboratory) {
                            actualMedicine = _.find(laboratory.medicines, function(medicine) {
                                return medicine.name === urlToProcess.name;
                            });

                            return actualMedicine;
                        });

                        let formats = [];

                        // var medicineDetails = [];
                        let format;
                        let formatInProcess = -1;


                        let details = $('table').eq(3).find('tr').children().filter('td.descrip_derecha_tabla');

                        actualMedicine.types = trimArray(details.eq(0).text().trim().split('|'));
                        actualMedicine.drugs = trimArray(details.eq(1).text().trim().split('+'));
                        actualMedicine.actions = trimArray(details.eq(2).text().trim().split('.'));




                        $('.contenido_pag .caja_descripcion').children()
                            .each(function(i, elem) {

                                if ($(this).hasClass('descrip_derecha')) {
                                    formatInProcess++;

                                    format = {
                                        name: null,
                                        price: $(this).text().replace('$', '').trim(),
                                        lastUpdate: null,
                                        pami: null,
                                        ioma: null
                                    };
                                    formats.push(format);
                                    return true;
                                }
                                if ($(this).is('b')) {
                                    formats[formatInProcess].name = $(this).text().trim();
                                    return true;
                                }

                                if ($(this).hasClass('linea_seccion_descrip')) {
                                    let date = parseDate($(this).text());
                                    formats[formatInProcess].lastUpdate = date;
                                    return true;
                                }

                                if ($(this).hasClass('info_pami')) {

                                    let pamiDetails = {
                                        affiliate: null,
                                        patient: null,
                                        observations: null
                                    };

                                    if ($(this).find('b').length == 2) {
                                        pamiDetails.affiliate = $(this).find('b').eq(1).text().replace('$', '').trim();
                                        pamiDetails.patient = $(this).find('b').eq(0).text().replace('$', '').trim();
                                        pamiDetails.observations = $(this).clone().children().remove().end().text().trim();
                                    } else {
                                        pamiDetails.observations = $(this).text().trim();
                                    }

                                    formats[formatInProcess].pami = pamiDetails;
                                    return true;
                                }

                                if ($(this).hasClass('info_ioma')) {
                                    let iomaDetails = {
                                        affiliate: null,
                                        patient: null,
                                        observations: null
                                    };

                                    if ($(this).find('b').length == 2) {
                                        iomaDetails.affiliate = $(this).find('b').eq(1).text().replace('$', '').trim();
                                        iomaDetails.patient = $(this).find('b').eq(0).text().replace('$', '').trim();
                                        iomaDetails.observations = $(this).clone().children().remove().end().text().trim();
                                    } else {
                                        iomaDetails.observations = $(this).text().trim();
                                    }

                                    formats[formatInProcess].ioma = iomaDetails;
                                    return true;
                                }
                            });

                        actualMedicine.formats = formats;
                    }

                    while (todo.length && running < 20) {
                        processOne(); // maybe start more workers
                    }
                    running--;

                    if (todo.length == 0) {
                        let listLaboratories = [];
                        _.each(laboratories, (item) => {
                            let lab = new Laboratory();
                            lab.code = item.code;
                            lab.name = item.name;
                            lab.medicines = item.medicines;

                            listLaboratories.push(lab);
                        });


                        Laboratory.collection.insert(listLaboratories, function(err, docs) {
                            let elapsedUsFullProcess = microprofiler.measureFrom(startFullProcess);
                            console.log(elapsedUsFullProcess);
                            if (err) {
                                res.status(httpstatus.internalservererror).json(
                                    new Response(appointmentResponse.internalservererror.database, err)
                                );
                            } else {
                                res.status(httpstatus.successcreated).json(
                                    new Response(appointmentResponse.successcreated.appointmentSuccessfully, docs)
                                );
                            }
                        });
                        return;
                    }
                });

            }).on("error", (err) => {
                running--;
                console.log("Error: " + err.message);
            });

        }

        let startFullProcess = microprofiler.start();
        processOne();

    }
};