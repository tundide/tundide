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
// router.post('/', session.authorize(), function(req, res) {
//     let pub = new Appointment();
//     pub.user = req.user._id;
//     pub.title = req.body.title;
//     pub.description = req.bodydescription;
//     pub.configuration = req.body.configuration;
//     pub.startDate = req.body.startDate;
//     pub.endDate = req.body.endDate;
//     pub.shortId = 'AP-' + shortid.generate();

//     pub.save().then(function(doc) {
//             res.status(publicationResponse.successcreated.status).json(
//                 new Response(publicationResponse.successcreated.publicatedSuccessfully, doc)
//             );
//         },
//         function(err) {
//             res.status(publicationResponse.internalservererror.status).json(
//                 new Response(publicationResponse.internalservererror.database, err)
//             );
//         });
// });

// // TODO: Completar documentacion y ejemplos
// /**
//  * @api {patch} / Update publication
//  * @apiName delete
//  * @apiGroup Publication
//  * 
//  */
// router.patch('/', session.authorize(), function(req, res) {
//     if (req.user.id !== req.body.user) {
//         return res.status(authenticationResponse.forbidden.status).json(
//             new Response(authenticationResponse.forbidden.unauthorized)
//         );
//     }

//     Appointment.findOneAndUpdate({ _id: req.body._id }, req.body, { upsert: true }, function(err, doc) {
//         if (err) {
//             return res.status(publicationResponse.internalservererror.status).json(
//                 new Response(publicationResponse.internalservererror.database, err)
//             );
//         };

//         return res.status(publicationResponse.successcreated.status).json(
//             new Response(publicationResponse.successcreated.publicatedSuccessfully, doc)
//         );
//     });
// });

// // TODO: Completar documentacion y ejemplos
// /**
//  * @api {get} / Get publication
//  * @apiName getpublication
//  * @apiGroup Publication
//  * 
//  * @apiParam {Number} id Id of the publication
//  * 
//  */
// router.get('/:id', function(req, res) {
//     if (!Validators.isValid(req.params.id)) {
//         return res.status(publicationResponse.notfound.status).json(
//             new Response(publicationResponse.notfound.publicationNotExist)
//         );
//     }

//     Appointment.findById(req.params.id, function(err, doc) {
//         if (err) {
//             return res.status(publicationResponse.internalservererror.status).json(
//                 new Response(publicationResponse.internalservererror.database, err)
//             );
//         };
//         if (doc) {
//             return res.status(publicationResponse.success.status).json(
//                 new Response(publicationResponse.success.retrievedSuccessfully, doc)
//             );
//         } else {
//             return res.status(publicationResponse.notfound.status).json(
//                 new Response(publicationResponse.notfound.publicationNotExist)
//             );
//         }
//     }); // .populate('user'); NO AGREGAR POR QUE SE PUBLICAN TODOS LOS DATOS DEL USUARIO
// });

// // TODO: Completar documentacion y ejemplos
// /**
//  * @api {get} / Find publication
//  * @apiName getpublicationbyquery
//  * @apiGroup Publication
//  * 
//  * @apiParam {String} query Query to search publication
//  * 
//  */
// router.get('/', function(req, res) {
//     let orFilter = [];

//     if (req.query.search) {
//         orFilter.push({ "title": { "$regex": req.query.search, "$options": "i" } });
//         orFilter.push({ "description": { "$regex": req.query.search, "$options": "i" } });
//     }

//     if (req.query.category) {
//         orFilter.push({ "configuration.category": req.query.category });
//     }
//     console.log(orFilter);
//     Publication.find({
//         "$and": [{
//                 "$or": orFilter
//             },
//             { "status": 1 }
//         ]

//     }).then(
//         function(publications) {
//             if (publications.length > 0) {
//                 let finished = _.after(publications.length, (publications) => {
//                     return res.status(publicationResponse.success.status).json(
//                         new Response(publicationResponse.success.retrievedSuccessfully, publications)
//                     );
//                 });

//                 _.forEach(publications, (publication, key) => {
//                     Province.findOne({ "code": publication.location.province }).then(function(prov) {
//                         publication._doc.location.provinceDescription = prov.description;

//                         let place = _.find(prov.locations, (o) => {
//                             return o.code === publication.location.place;
//                         });

//                         publication._doc.location.placeDescription = place.description;

//                         finished(publications);
//                     });
//                 });
//             } else {
//                 return res.status(publicationResponse.notfound.status).json(
//                     new Response(publicationResponse.notfound.publicationNotExist)
//                 );
//             }
//         }
//     ).catch(function(err) {
//         return res.status(publicationResponse.internalservererror.status).json(
//             new Response(publicationResponse.internalservererror.database, err)
//         );
//     });
// });

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
    Appointment.find({ $and: [{ user: req.user._id }, { status: req.params.status }] }, function(err, appointments) {
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