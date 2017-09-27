let mongoose = require('mongoose');
let user = require('./user.js');

let companySchema = mongoose.Schema({
    id: String,
    description: String,
    user: [user.schema]
});

// TODO: Complete documantation
/**
 * Mongoose model for Company.
 *
 * @class Company
 * @memberof module:Billing
 * @property {String}       id             - id of plan
 * @property {String}       description    - description of the plan
 */
module.exports = mongoose.model('Company', companySchema);