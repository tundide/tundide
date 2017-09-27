let mongoose = require('mongoose');
let ticket = require('./ticket.js');

let machineSchema = mongoose.Schema({
    id: String,
    description: String,
    tickets: [ticket.schema]
});

// TODO: Complete documantation
/**
 * Mongoose model for Machine.
 *
 * @class Machine
 * @memberof module:Billing
 * @property {String}       id             - id of plan
 * @property {String}       description    - description of the plan
 */
module.exports = mongoose.model('Machine', machineSchema);