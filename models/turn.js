/**
 * The data-layer for a Appointment
 * @module Appointment
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TurnSchema = mongoose.Schema({
    id: { type: Schema.Types.ObjectId },
    position: Number,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    subsidiary: { type: Schema.Types.ObjectId, ref: 'Subsidiary' },
});

/**
 * Mongoose model for Turn.
 *
 * @class Turn
 * @memberof module:Appointments
 * @property {ObjectId}              id                            - Id of turn
 * @property {Number}                position                      - The position in the queue
 * @property {ObjectId}              client                        - Id of client
 * @property {ObjectId}              company                       - Id of the Company
 */
module.exports = mongoose.model('Turn', TurnSchema);