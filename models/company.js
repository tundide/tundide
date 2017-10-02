let mongoose = require('mongoose');

let companySchema = mongoose.Schema({
    id: String,
    description: String,
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    clients: [{type: Schema.Types.ObjectId, ref: 'Client'}]
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