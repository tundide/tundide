let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let Appointment = require('../../models/appointment');
let Province = require('../../models/province');
let shortid = require('shortid');
let session = require('../auth/session');
let appointmentResponse = require('../../config/response').appointment;
let authenticationResponse = require('../../config/response').authentication;
let Response = require('../shared/response.js');
let Validators = require('../../lib/Validators/ObjectId.js');
let _ = require('lodash');

let nodemailer = require("nodemailer");
let ical = require('ical-generator');

// TODO:Completar ejemplos
/**
 * @api {post} / Save publication
 * @apiName savepublication
 * @apiGroup Publication
 * @apiExample {js} Service Example
 * {
 * 	"type":"service"
 * }
 * 
 * @apiSuccess {Object} Publication Model.
 * @apiSuccessExample {json} Success-Response:
 * { 
 *    "status": "200",
 *    "message": "OK"
 * }
 * 
 */
router.post('/', session.authorize(), function(req, res) {
    let app = new Appointment();
    app.user = req.user._id;
    app.description = req.body.description;
    app.startDate = req.body.startDate;
    app.endDate = req.body.endDate;
    app.shortId = 'AP-' + shortid.generate();

    app.save().then(function(doc) {
            // EnviarEmail(app);
            res.status(appointmentResponse.successcreated.status).json(
                new Response(appointmentResponse.successcreated.appointmentSuccessfully, doc)
            );
        },
        function(err) {
            res.status(appointmentResponse.internalservererror.status).json(
                new Response(appointmentResponse.internalservererror.database, err)
            );
        });
});

function EnviarEmail(app) {
    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'marcos.panichella@gmail.com', // generated ethereal user
            pass: 'Mavi34518147' // generated ethereal password
        }
    });


    let cal = ical({ domain: 'tundide.com', name: 'Cita' });

    cal.domain('tundide.com');

    cal.createEvent({
        start: app.startDate,
        end: app.endDate,
        summary: app.description,
        description: app.description,
        location: 'Ubicacion Prueba',
        url: 'http://tundide.com/'
    });


    transport.sendMail({
        from: 'marcos.panichella@gmail.com',
        to: 'mpanichella@outlook.com',
        subject: 'Meeting',
        html: "Hola",
        text: "Hola!!",
        alternatives: [{
            contentType: "text/calendar; charset=\"utf-8\"; method=REQUEST",
            content: new Buffer(cal.toString())
        }]
    }, function(err, responseStatus) {
        if (err) {
            console.log(err);
            res.render('schedule', { errors: err.message });
        } else {
            console.log(responseStatus.message);
            res.render('schedule', { success_msg: "Successfully Created!" });
        }
    });
}
// TODO:Completar ejemplos
/**
 * @api {patch} / Update publication
 * @apiName updatepublication
 * @apiGroup Publication
 * @apiExample {js} Service Example
 * {
 * 	"type":"service"
 * }
 * 
 * @apiSuccess {Object} Publication Model.
 * @apiSuccessExample {json} Success-Response:
 * { 
 *    "status": "200",
 *    "message": "OK"
 * }
 * 
 */
router.patch('/:id', session.authorize(), function(req, res) {
    let appointment = {
        endDate: Date.parse(req.body.endDate),
        startDate: Date.parse(req.body.startDate),
        description: req.body.description,
        client: req.client._id
    };

    Appointment.findOneAndUpdate({ _id: req.body.id }, appointment, { upsert: true }, function(err, doc) {
        if (err) {
            res.status(appointmentResponse.internalservererror.status).json(
                new Response(appointmentResponse.internalservererror.database, err)
            );
        };

        return res.status(appointmentResponse.successnocontent.status).json(
            new Response(appointmentResponse.successnocontent.updatedSuccessfully, doc)
        );
    });
});

// TODO:Completar ejemplos
/**
 * @api {delete} / Delete publication
 * @apiName deletepublication
 * @apiGroup Publication
 * @apiExample {js} Service Example
 * {
 * 	"type":"service"
 * }
 * 
 * @apiSuccess {Object} Publication Model.
 * @apiSuccessExample {json} Success-Response:
 * { 
 *    "status": "200",
 *    "message": "OK"
 * }
 * 
 */
router.delete('/:id', session.authorize(), function(req, res) {
    let appointmentId = new mongoose.Types.ObjectId(req.params.id);

    Appointment.remove({ _id: appointmentId }, function(err) {
        if (err) {
            res.status(appointmentResponse.internalservererror.status).json(
                new Response(appointmentResponse.internalservererror.database, err)
            );
        };

        return res.status(appointmentResponse.successnocontent.status).json(
            new Response(appointmentResponse.successnocontent.deletedSuccessfully)
        );
    });
});

/** // TODO: Completar la documentacion
 * @api {get} /list List publication
 * @apiName getpublicationbystatus
 * @apiGroup Publication
 * 
 * @apiParam {int} status Status to get ()
 * @apiParamExample {int} Active publication example:
 *    id:1
 * @apiParamExample {int} Paused publication example:
 *    id:2
 * 
 */
router.get('/list', session.authorize(), function(req, res) {
    Appointment.find({ user: req.user._id }, function(err, appointments) {
        if (err) {
            return res.status(appointmentResponse.internalservererror.status).json(
                new Response(appointmentResponse.internalservererror.database, err)
            );
        };
        if (appointments.length > 0) {
            return res.status(appointmentResponse.success.status).json(
                new Response(appointmentResponse.success.retrievedSuccessfully, appointments)
            );
        } else {
            return res.status(appointmentResponse.notfound.status).json(
                new Response(appointmentResponse.notfound.appointmentsNotExist)
            );
        }
    });
});

module.exports = router;