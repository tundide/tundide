/**
 * The data-layer for a Appointment
 * @module Appointment
 */


let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategorySchema = mongoose.Schema({
    id: { type: Schema.Types.ObjectId },
    description: String,
    shorthand: String,
    company: { type: Schema.Types.ObjectId, ref: 'Company' }
});

/**
 * Mongoose model for Turn.
 *
 * @class Turn
 * @memberof module:Appointments
 * @property {ObjectId}              id                            - Id of turn
 * @property {Number}                description                   - Description for the category
 * @property {String}                shorthand                     - Abbreviation for the category (This appear in the turn ticket ex: "AA 1234")
 */
module.exports = mongoose.model('Category', CategorySchema);