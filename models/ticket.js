/**
 * The data-layer for a Ticket
 * @module Ticket
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TicketSchema = mongoose.Schema({
    id: { type: Schema.Types.ObjectId },
    position: Number,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    subsidiary: { type: Schema.Types.ObjectId, ref: 'Subsidiary' },
});

/**
 * Mongoose model for Ticket.
 *
 * @class Ticket
 * @memberof module:Appointments
 * @property {ObjectId}              id                            - Id of ticket
 * @property {Number}                position                      - The position in the queue
 * @property {ObjectId}              client                        - Id of client
 * @property {ObjectId}              company                       - Id of the Company
 */
module.exports = mongoose.model('Ticket', TicketSchema);