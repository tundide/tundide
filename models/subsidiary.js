let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let subsidiarySchema = mongoose.Schema({
    id: { type: Schema.Types.ObjectId },
    code: String,
    description: String,
    appointments: [{type: Schema.Types.ObjectId, ref: 'Appointment'}],
    machines: [{type: Schema.Types.ObjectId, ref: 'Machine'}]
});

/**
 * Mongoose model for Subsidiary.
 *
 * @class Subsidiary
 * @memberof module:Product
 * @property {ObjectId}             id               - Id of the subsidiary
 * @property {String}               code             - Code to identify the subsidiary
 * @property {String}               description      - Description of the subsidiary
 * @property {Array<Appointment>}   appointments     - List of subsidiary appointments
 * @property {Array<Machine>}       machines         - List of subsidiary machines
 */
module.exports = mongoose.model('Subsidiary', subsidiarySchema);