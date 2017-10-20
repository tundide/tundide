let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let Client = require('../../models/client');
let shortid = require('shortid');
let session = require('../auth/session');
let clientResponse = require('../../config/response').client;
let authenticationResponse = require('../../config/response').authentication;
let Response = require('../shared/response.js');
let Validators = require('../../lib/Validators/ObjectId.js');
let _ = require('lodash');

// TODO:Completar ejemplos
/**
 * @api {post} / Save client
 * @apiName saveclient
 * @apiGroup Client
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
    let cli = new Client();
    cli.user = req.user._id;

    cli.save().then(function(doc) {
            res.status(clientResponse.successcreated.status).json(
                new Response(clientResponse.successcreated.clientSuccessfully, doc)
            );
        },
        function(err) {
            res.status(clientResponse.internalservererror.status).json(
                new Response(clientResponse.internalservererror.database, err)
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
    let client = {
        endDate: Date.parse(req.body.endDate),
        startDate: Date.parse(req.body.startDate),
        description: req.body.description,
        client: req.client._id
    };

    Client.findOneAndUpdate({ _id: req.body.id }, client, { upsert: true }, function(err, doc) {
        if (err) {
            res.status(clientResponse.internalservererror.status).json(
                new Response(clientResponse.internalservererror.database, err)
            );
        };

        return res.status(clientResponse.successnocontent.status).json(
            new Response(clientResponse.successnocontent.updatedSuccessfully, doc)
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
    let clientId = new mongoose.Types.ObjectId(req.params.id);

    Client.remove({ _id: clientId }, function(err) {
        if (err) {
            res.status(clientResponse.internalservererror.status).json(
                new Response(clientResponse.internalservererror.database, err)
            );
        };

        return res.status(clientResponse.successnocontent.status).json(
            new Response(clientResponse.successnocontent.deletedSuccessfully)
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
    Client.find({ user: req.user._id }, function(err, clients) {
        if (err) {
            return res.status(clientResponse.internalservererror.status).json(
                new Response(clientResponse.internalservererror.database, err)
            );
        };
        if (clients.length > 0) {
            return res.status(clientResponse.success.status).json(
                new Response(clientResponse.success.retrievedSuccessfully, clients)
            );
        } else {
            return res.status(clientResponse.successnocontent.status).json(
                new Response(clientResponse.successnocontent.clientsNotFound)
            );
        }
    });
});

module.exports = router;