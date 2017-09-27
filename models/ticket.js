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
    subsidiary: { type: Schema.Types.ObjectId, ref: 'Subsidiary' },
});

/**
 * Mongoose model for Ticket.
 *
 * @class Ticket
 * @memberof module:Product
 * @property {ObjectId}              id                            - Id of ticket
 * @property {ObjectId}              category                      - Category of the ticket
 * @property {Number}                position                      - The position in the queue
 * @property {ObjectId}              client                        - Id of client
 * @property {ObjectId}              subsidiary                    - Id of the Subsidiary
 */
module.exports = mongoose.model('Ticket', TicketSchema);