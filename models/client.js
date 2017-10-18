let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let clientSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    document: Number,
    email: String,
    cellPhone: String,
    company: { type: Schema.Types.ObjectId, ref: 'Company' }
});

/**
 * Mongoose model for Client.
 *
 * @class Client
 * @memberof module:Product
 * @property {String}       id             - id of Client
 * @property {String}       description    - description of the Client
 */
module.exports = mongoose.model('Client', clientSchema);