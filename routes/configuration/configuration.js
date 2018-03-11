let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let User = require('../../models/user');
let shortid = require('shortid');
let session = require('../auth/session');
let httpstatus = require('../../config/response').httpstatus;
let Validators = require('../../lib/Validators/ObjectId.js');

/**
 * @api {post} / Skip configuration in first Income
 * @apiName skip
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
router.post('/skip/', session.authorize(), function(req, res) {
    User.findOneAndUpdate({ _id: req.body.user }, { firstIncome: false }, function(err) {
        if (err) {
            return res.status(httpstatus.badrequest).json({
                message: 'Error ocurred.',
                errors: [err.message]
            });
        };

        return res.status(httpstatus.success).send();
    });
});

module.exports = router;