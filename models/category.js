let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategorySchema = mongoose.Schema({
    id: { type: Schema.Types.ObjectId },
    description: String,
    shorthand: String
});

/**
 * Mongoose model for Category.
 *
 * @class Category
 * @memberof module:AppointmentCenter
 * @property {ObjectId}              id                            - Id of Category
 * @property {Number}                description                   - Description for the Category
 * @property {String}                shorthand                     - Abbreviation for the Category (This appear in the ticket ex: "AA 1234")
 */
module.exports = mongoose.model('Category', CategorySchema);