let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let Contact = require('../../models/contact');
let shortid = require('shortid');
let session = require('../auth/session');
let contactResponse = require('../../config/response').contact;
let authenticationResponse = require('../../config/response').authentication;
let Response = require('../shared/response.js');
let Validators = require('../../lib/Validators/ObjectId.js');
let _ = require('lodash');

// TODO:Completar ejemplos
/**
 * @api {post} / Save contact
 * @apiName savecontact
 * @apiGroup Contact
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
    let cli = new Contact();
    cli.user = req.user._id;
    cli.firstName = req.body.firstName;
    cli.lastName = req.body.lastName;
    cli.document = req.body.document;
    cli.contact.email = req.body.contact.email;
    cli.contact.cellPhone = req.body.contact.cellPhone;
    cli.contact.phone = req.body.contact.phone;
    cli.location.province = req.body.location.province;
    cli.location.place = req.body.location.place.code;
    cli.location.street = req.body.location.street;
    cli.location.number = req.body.location.number;

    cli.save().then(function(doc) {
            res.status(contactResponse.successcreated.status).json(
                new Response(contactResponse.successcreated.contactSuccessfully, doc)
            );
        },
        function(err) {
            res.status(contactResponse.internalservererror.status).json(
                new Response(contactResponse.internalservererror.database, err)
            );
        });
});

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
    let contact = {
        endDate: Date.parse(req.body.endDate),
        startDate: Date.parse(req.body.startDate),
        description: req.body.description,
        contact: req.contact._id
    };

    Contact.findOneAndUpdate({ _id: req.body.id }, contact, { upsert: true }, function(err, doc) {
        if (err) {
            res.status(contactResponse.internalservererror.status).json(
                new Response(contactResponse.internalservererror.database, err)
            );
        };

        return res.status(contactResponse.successnocontent.status).json(
            new Response(contactResponse.successnocontent.updatedSuccessfully, doc)
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
    let contactId = new mongoose.Types.ObjectId(req.params.id);

    Contact.remove({ _id: contactId }, function(err) {
        if (err) {
            res.status(contactResponse.internalservererror.status).json(
                new Response(contactResponse.internalservererror.database, err)
            );
        };

        return res.status(contactResponse.successnocontent.status).json(
            new Response(contactResponse.successnocontent.deletedSuccessfully)
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
    Contact.find({ user: req.user._id }, function(err, contacts) {
        if (err) {
            return res.status(contactResponse.internalservererror.status).json(
                new Response(contactResponse.internalservererror.database, err)
            );
        };
        if (contacts.length > 0) {
            return res.status(contactResponse.success.status).json(
                new Response(contactResponse.success.retrievedSuccessfully, contacts)
            );
        } else {
            return res.status(contactResponse.successnocontent.status);
        }
    });
});

/** // TODO: Completar la documentacion
 * @api {get} /find/:search Find contact by firstName and lastName
 * @apiName findcontactbysearchdata
 * @apiGroup AppointmentCenter
 * 
 * @apiParam {string} search Find contact by search data
 * @apiParamExample {string} firstName example:
 *    search:Jorge Ross
 * 
 */
router.get('/find', session.authorize(), function(req, res) {
    Contact.find({
        $and: [{
            user: req.user._id
        }, {
            $or: [
                { "firstName": { "$regex": req.query.search, "$options": "i" } },
                { "lastName": { "$regex": req.query.search, "$options": "i" } }
            ]
        }]
    }, function(err, contacts) {
        if (err) {
            return res.status(contactResponse.internalservererror.status).json(
                new Response(contactResponse.internalservererror.database, err)
            );
        };
        if (contacts.length > 0) {
            return res.status(contactResponse.success.status).json(
                new Response(contactResponse.success.retrievedSuccessfully, contacts)
            );
        } else {
            return res.status(contactResponse.successnocontent.status).send();
        }
    });
});

module.exports = router;