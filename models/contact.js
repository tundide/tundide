let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let contactSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    document: Number,
    contact: {
        cellPhone: Number,
        email: String,
        phone: Number
    },
    location: {
        province: Number,
        place: Number,
        street: String,
        number: Number
    },
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

// TODO: Completar documentacion
/**
 * Mongoose model for Contact.
 *
 * @class Contact
 * @memberof module:AppointmentCenter
 * @property {String}       id             - id of Contact
 * @property {String}       description    - description of the Contact
 */
module.exports = mongoose.model('Contact', contactSchema);