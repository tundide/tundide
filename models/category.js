/**
 * The data-layer for a Category
 * @module Category
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
 * Mongoose model for Category.
 *
 * @class Category
 * @memberof module:Product
 * @property {ObjectId}              id                            - Id of Category
 * @property {Number}                description                   - Description for the Category
 * @property {String}                shorthand                     - Abbreviation for the Category (This appear in the ticket ex: "AA 1234")
 */
module.exports = mongoose.model('Category', CategorySchema);