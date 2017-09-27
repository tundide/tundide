let mongoose = require('mongoose');
let user = require('./user.js');
let client = require('./client.js');

let companySchema = mongoose.Schema({
    id: String,
    description: String,
    users: [user.schema],
    clients: [client.schema]
});

/**
 * Mongoose model for Company.
 *
 * @class Company
 * @memberof module:Product
 * @property {String}        id             - id of company
 * @property {String}        description    - description of the company
 * @property {Array<User>}   users          - List of company users
 * @property {Array<Client>} clients        - List of company clients
 */
module.exports = mongoose.model('Company', companySchema);