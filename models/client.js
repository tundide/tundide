let mongoose = require('mongoose');

let clientSchema = mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    dni: Number,
    email: String,
    cellPhone: String,
    company: { type: Schema.Types.ObjectId, ref: 'Company' }
});

/**
 * Mongoose model for Client.
 *
 * @class Plan
 * @memberof module:Billing
 * @property {String}       id             - id of plan
 * @property {String}       description    - description of the plan
 */
module.exports = mongoose.model('Client', clientSchema);