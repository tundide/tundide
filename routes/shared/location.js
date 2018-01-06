let express = require('express');
let router = express.Router();
let Province = require('../../models/province');
let Response = require('../shared/response.js');
let httpstatus = require('../../config/response').httpstatus;
let cache = require('../shared/cache');
let redis = require('redis');

let client = redis.createClient(process.env.REDIS_URL);
/**
 * @api {get} /:id Get reviews
 * @apiName getreviews
 * @apiGroup Review
 * 
 * @apiParam {int} id Id of publication
 * 
 * @apiSuccess {Object} Success Message.
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "message": "Recover reviews correctly",
 *   "obj": [
 *     {
 *       "_id": "58c4a29e54eb8a335c293ab0",
 *       "score": 4,
 *       "message": "Messege of review",
 *       "user": User
 *     }
 *   ]
 * }
 * 
 */
router.get('/', cache.cache, function(req, res) {
    Province.find({}, function(err, provinces) {
        if (err) {
            next(new Error('An unexpected error occurred'));
        };
        if (provinces) {
            return res.status(httpstatus.success).json(provinces);
        } else {
            return res.status(httpstatus.nocontent).send();
            // client.set(req.baseUrl, JSON.stringify(provinces), 'EX', 86400); // TODO: Corregir el cache
        }
    });
});

module.exports = router;