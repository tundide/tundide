let mongoose = require('mongoose');

let companySchema = mongoose.Schema({
    id: String,
    description: String,
    type: {
        type: String,
        enum: ['MEDICAL', 'OTHERS'],
        default: 'MEDICAL'
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    clients: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
    subsidiaries: [{ type: Schema.Types.ObjectId, ref: 'Subsidiary' }]
});

/**
 * Mongoose model for Company.
 *
 * @class Company
 * @memberof module:Product
 * @property {String}        id             - id of company
 * @property {String}        description    - description of the company
 * @property {String}        type           - define the type of the company, for example Hospital.
 * @property {Array<User>}   users          - List of company users
 * @property {Array<Client>} clients        - List of company clients
 */
module.exports = mongoose.model('Company', companySchema);