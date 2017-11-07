let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let Subsidiary = require('../../models/subsidiary');
let shortid = require('shortid');
let session = require('../auth/session');
let subsidiaryResponse = require('../../config/response').subsidiary;
let authenticationResponse = require('../../config/response').authentication;
let Response = require('../shared/response.js');
let Validators = require('../../lib/Validators/ObjectId.js');
let _ = require('lodash');

// TODO:Completar ejemplos
/**
 * @api {post} / Save subsidiary
 * @apiName savesubsidiary
 * @apiGroup Subsidiary
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
    let sub = new Subsidiary();
    sub.user = req.user._id;
    sub.code = req.body.code;
    sub.description = req.body.description;

    sub.save().then(function(doc) {
            res.status(subsidiaryResponse.successcreated.status).json(
                new Response(subsidiaryResponse.successcreated.subsidiarySuccessfully, doc)
            );
        },
        function(err) {
            res.status(subsidiaryResponse.internalservererror.status).json(
                new Response(subsidiaryResponse.internalservererror.database, err)
            );
        });
});

// TODO:Completar ejemplos
/**
 * @api {patch} / Update subsidiary
 * @apiName updatesubsidiary
 * @apiGroup Configuration
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
    let subsidiary = {
        endDate: Date.parse(req.body.endDate),
        startDate: Date.parse(req.body.startDate),
        description: req.body.description,
        contact: req.contact._id
    };

    Subsidiary.findOneAndUpdate({ _id: req.body.id }, subsidiary, { upsert: true }, function(err, doc) {
        if (err) {
            res.status(subsidiaryResponse.internalservererror.status).json(
                new Response(subsidiaryResponse.internalservererror.database, err)
            );
        };

        return res.status(subsidiaryResponse.successnocontent.status).json(
            new Response(subsidiaryResponse.successnocontent.updatedSuccessfully, doc)
        );
    });
});

// TODO:Completar ejemplos
/**
 * @api {delete} / Delete subsidiary
 * @apiName deletesubsidiary
 * @apiGroup Configuration
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
    let subsidiaryId = new mongoose.Types.ObjectId(req.params.id);

    Subsidiary.remove({ _id: subsidiaryId }, function(err) {
        if (err) {
            res.status(subsidiaryResponse.internalservererror.status).json(
                new Response(subsidiaryResponse.internalservererror.database, err)
            );
        };

        return res.status(subsidiaryResponse.successnocontent.status).json(
            new Response(subsidiaryResponse.successnocontent.deletedSuccessfully)
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
    Subsidiary.find({ user: req.user._id }, function(err, subsidiaries) {
        if (err) {
            return res.status(subsidiaryResponse.internalservererror.status).json(
                new Response(subsidiaryResponse.internalservererror.database, err)
            );
        };
        if (subsidiaries.length > 0) {
            return res.status(subsidiaryResponse.success.status).json(
                new Response(subsidiaryResponse.success.retrievedSuccessfully, subsidiaries)
            );
        } else {
            return res.status(subsidiaryResponse.successnocontent.status);
        }
    });
});

/** // TODO: Completar la documentacion
 * @api {get} /find/:search Find subsidiary by firstName and lastName
 * @apiName findsubsidiarybysearchdata
 * @apiGroup AppointmentCenter
 * 
 * @apiParam {string} search Find subsidiary by search data
 * @apiParamExample {string} firstName example:
 *    search:Jorge Ross
 * 
 */
router.get('/find', session.authorize(), function(req, res) {
    Subsidiary.find({
        $and: [{
            user: req.user._id
        }, {
            $or: [
                { "firstName": { "$regex": req.query.search, "$options": "i" } },
                { "lastName": { "$regex": req.query.search, "$options": "i" } },
                { $where: "/^.*" + req.query.search + ".*/.test(this.document)" }
            ]
        }]
    }, function(err, subsidiaries) {
        if (err) {
            return res.status(subsidiaryResponse.internalservererror.status).json(
                new Response(subsidiaryResponse.internalservererror.database, err)
            );
        };
        if (subsidiaries.length > 0) {
            return res.status(subsidiaryResponse.success.status).json(
                new Response(subsidiaryResponse.success.retrievedSuccessfully, subsidiaries)
            );
        } else {
            return res.status(subsidiaryResponse.successnocontent.status).send();
        }
    });
});

module.exports = router;