let mongoose = require('mongoose');

let paidSchema = mongoose.Schema({
    id: String,
    topic: String,
    notificationDate: { type: Date, default: Date.now }
});

/**
 * Mongoose model for Paid.
 *
 * @class Paid
 * @memberof module:BillingCenter
 * @property {String}       id                      - id of pay
 * @property {String}       topic                   - Identifica de qué se trata. Puede ser: // TODO: Completar que es este parametro
 * @property {Date}         notificationDate=Now    - Date and time of the notification
 */
module.exports = mongoose.model('Paid', paidSchema);