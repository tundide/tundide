let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const validateEmail = email => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

let contactSchema = mongoose.Schema({
    firstName: { type: String, maxlength: 20 },
    lastName: String,
    document: Number,
    contact: {
        cellPhone: Number,
        email: {
            type: String,
            trim: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please provide a valid email address'],
        },
        phone: Number
    },
    location: {
        province: Number,
        place: {
            code: Number,
            description: String,
            zip: Number
        },
        street: String,
        number: Number
    },
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
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