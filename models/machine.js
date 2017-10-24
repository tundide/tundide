let mongoose = require('mongoose');

let machineSchema = mongoose.Schema({
    id: { type: Schema.Types.ObjectId },
    code: String,
    description: String,
    tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }]
});

/**
 * Mongoose model for Machine.
 *
 * @class Machine
 * @memberof module:AppointmentCenter
 * @property {ObjectId}       id             - id of machine
 * @property {String}         code           - Code to identify the machine
 * @property {String}         description    - description of the machine
 * @property {Array<Ticket>}  tickets        - List of machine tickets
 */
module.exports = mongoose.model('Machine', machineSchema);