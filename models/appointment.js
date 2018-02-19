/**
 * The data-layer for a Appointment
 * @module AppointmentCenter
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AppointmentSchema = mongoose.Schema({
    id: { type: Schema.Types.ObjectId },
    description: String,
    endDate: { type: Date, default: Date.now },
    startDate: { type: Date, default: Date.now },
    shortId: String,
    status: { type: Number, default: 1 },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    client: { type: Schema.Types.ObjectId, ref: 'Contact' },
    subsidiary: { type: Schema.Types.ObjectId, ref: 'Subsidiary' }
});
// TODO: Acomodar la documentacion
/**
 * Mongoose model for Appointment.
 *
 * @class Appointment
 * @memberof module:AppointmentCenter
 * @property {ObjectId}              id                            - Id of publication
 * @property {String}                description                   - Description of Appointment
 * @property {Date}                  endDate                       - End date of appointment
 * @property {Date}                  startDate                     - Start date of appointment
 * @property {String}                shortId                       - Short ID to identify the publication
 * @property {Number}                status=1                      - Status of publication (1 - Active, 2 - Canceled, 3 - Approval Pending)
 * @property {ObjectId}              user                          - Id of the owner of the appointment
 * @property {ObjectId}              client                        - Id of the client of the appointment
 */
module.exports = mongoose.model('Appointment', AppointmentSchema);