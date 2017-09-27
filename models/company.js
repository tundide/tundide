let mongoose = require('mongoose');
let appointment = require('./appointment.js');
let turn = require('./turn.js');

let companySchema = mongoose.Schema({
    id: String,
    description: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    appointments: [appointment.schema],
    turns: [turn.schema]
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