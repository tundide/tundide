let mongoose = require('mongoose');

let terminalSchema = mongoose.Schema({
    id: { type: Schema.Types.ObjectId },
    code: String,
    type: {
        type: String,
        enum: ['TICKET', 'COMPUTER'],
        default: 'COMPUTER'
    },
    description: String,
    machine: { type: Schema.Types.ObjectId, ref: 'Machine' }
});

/**
 * Mongoose model for Terminal.
 *
 * @class Terminal
 * @memberof module:TerminalCenter
 * @property {ObjectId}       id             - id of terminal
 * @property {String}         code           - Code to identify the terminal
 * @property {String}         type           - The type of the Terminal, for example tickets machine.
 * @property {String}         description    - description of the terminal
 * @property {Machine}        machine        - The machine of the terminal
 */
module.exports = mongoose.model('Terminal', terminalSchema);