/**
 * The data-layer for a Laboratory
 * @module Laboratory
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let laboratorySchema = mongoose.Schema({
    code: Number,
    medicines: [{
        code: Number,
        actions: [String],
        drugs: [String],
        formats: [{
            ioma: {
                affiliate: Number,
                observations: String,
                patient: Number
            },
            lastUpdate: Date,
            name: String,
            pami: {
                affiliate: Number,
                observations: String,
                patient: Number
            },
            price: Number
        }],
        name: String,
        types: [
            String
        ]
    }]
});

// TODO: Completar la documentacion
/**
 * Mongoose model for user document.
 *
 * @class User
 * @property {string}               firstName       - The first name of the user
 * @property {string}               lastName        - The last name of the user
 * @property {Plan}                 plan            - plan of the user
 * @property {Authentication}       authentication  - Authentication information of the user
 * @property {string}               shortId         - shortId of the user
 * @property {string}               socketId        - id of the socket.io of the user
 * @property {ArrayArray.<Role>}    roles           - list of roles for the user
 */
module.exports = mongoose.model('Laboratory', laboratorySchema);