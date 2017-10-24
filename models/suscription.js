let mongoose = require('mongoose');

let suscriptionSchema = mongoose.Schema({
    id: String,
    description: String
});

/**
 * Mongoose model for Suscription.
 *
 * @class Suscription
 * @memberof module:BillingCenter
 * @property {String}       id             - id of the suscription
 * @property {String}       description    - description of the suscription
 */
module.exports = mongoose.model('Suscription', suscriptionSchema);