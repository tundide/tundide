let mongoose = require('mongoose');

let viewerSchema = mongoose.Schema({
    id: { type: Schema.Types.ObjectId },
    code: String,
    categoriesToShow: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    lastTickets: [{type: Schema.Types.ObjectId, ref: 'Ticket'}]
});

/**
 * Mongoose model for Viewer.
 *
 * @class Viewer
 * @memberof module:Product
 * @property {ObjectId}          id                  - id of machine
 * @property {String}            code                - Code to identify the machine
 * @property {Array<ObjectId>}   categoriesToShow    - Categories to show in viewer
 * @property {Array<Ticket>}     lastTickets         - List of the last ten tickets to show in viewer
 */
module.exports = mongoose.model('Viewer', viewerSchema);