/**
 * The data-layer for a Appointment
 * @module Appointment
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AppointmentSchema = mongoose.Schema({
    description: String,
    id: { type: Schema.Types.ObjectId },
    configuration: {
        category: Number,
        subcategory: Number,
        showCalendar: Boolean,
        showContactInformation: Boolean,
        subcategory: Number
    },
    endDate: { type: Date, default: Date.now },
    startDate: { type: Date, default: Date.now },
    shortId: String,
    status: { type: Number, default: 1 },
    title: String,
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    subsidiary: { type: Schema.Types.ObjectId, ref: 'Subsidiary' },
    client: { type: Schema.Types.ObjectId, ref: 'Client' }
});
// TODO: Acomodar la documentacion
/**
 * Mongoose model for Appointment.
 *
 * @class Appointment
 * @memberof module:Appointments
 * @property {Date}                  dateOfExpiration              - Indicates the expiration of the publication
 * @property {String}                description                   - Descriptio nof publication
 * @property {ObjectId}              id                            - Id of publication
 * @property {Caegory}               category                      - Category of publication
 * @property {Array.<ObjectId>}      images                        - Images of publication
 * @property {Number}                price                         - Price per hour of publication
 * @property {Configuration}         configuration                 - Custom configuration of publication
 * @property {Date}                  publishedDate=Now             - Date of publication
 * @property {Array.<Review>}        review                        - Reviews of publication
 * @property {Array.<Reservation>}   reservations                  - Reservations of publication
 * @property {String}                shortId                       - Short ID to identify the publication
 * @property {Number}                status=1                      - Status of publication (1 - Active, 2 - Paused)
 * @property {String}                title                         - Title of publication
 * @property {ObjectId}              user                          - Id the owner of the publication
 */
module.exports = mongoose.model('Appointment', AppointmentSchema);