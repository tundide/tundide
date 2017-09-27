let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let appointment = require('./appointment.js');
let machine = require('./machine.js');

let subsidiarySchema = mongoose.Schema({
    id: { type: Schema.Types.ObjectId },
    description: String,
    appointments: [appointment.schema],
    machines: [machine.schema]
});

/**
 * Mongoose model for Subsidiary.
 *
 * @class Subsidiary
 * @memberof module:Subsidiary
 * @property {ObjectId}             id               - Id of the subsidiary
 * @property {Number}               code             - Code of the subsidiary
 * @property {String}               description      - Description of the subsidiary
 */
module.exports = mongoose.model('Subsidiary', subsidiarySchema);