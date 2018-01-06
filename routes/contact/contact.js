let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let Contact = require('../../models/contact');
let shortid = require('shortid');
let session = require('../auth/session');
let httpstatus = require('../../config/response').httpstatus;
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
router.post('/', session.authorize(), function(req, res, next) {
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

    cli.validate(function(err) {
        if (err) {
            res.status(httpstatus.badrequest).json({
                message: 'Error ocurred.',
                errors: err.errors
            });
        } else {
            cli.save().then(function(doc) {
                    res.status(httpstatus.successcreated).send();
                },
                function(err) {
                    next(new Error('An unexpected error occurred'));
                });
        }
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
router.patch('/', session.authorize(), function(req, res) {
    Contact.findOneAndUpdate({ _id: req.body._id }, req.body, { runValidators: true, context: 'query' }, function(err, doc) {
        if (err) {
            return res.status(httpstatus.badrequest).json({
                message: 'Error ocurred.',
                errors: [err.message]
            });
        };

        return res.status(httpstatus.success).json({
            message: 'Contact created correctly',
            data: doc
        });
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
            next(new Error('An unexpected error occurred'));
        };

        res.status(httpstatus.successcreated).send();
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
router.get('/list', session.authorize(), function(req, res, next) {
    Contact.find({ user: req.user._id }, function(err, contacts) {
        if (err) {
            next(new Error('An unexpected error occurred'));
        };
        if (contacts.length > 0) {
            return res.status(httpstatus.success).json(contacts);
        } else {
            return res.status(httpstatus.nocontent).send();
        }
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
router.get('/id/:id', session.authorize(), function(req, res, next) {
    Contact.findById(req.params.id, function(err, contact) {
        if (err) {
            next(new Error('An unexpected error occurred'));
        };
        if (contact) {
            return res.status(httpstatus.success).json(contact);
        } else {
            return res.status(httpstatus.notfound).send();
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
                { "lastName": { "$regex": req.query.search, "$options": "i" } },
                { $where: "/^.*" + req.query.search + ".*/.test(this.document)" }
            ]
        }]
    }, function(err, contacts) {
        if (err) {
            next(new Error('An unexpected error occurred'));
        };
        if (contacts.length > 0) {
            return res.status(httpstatus.success).json(contacts);
        } else {
            return res.status(httpstatus.nocontent).send();
        }
    });
});

module.exports = router;