const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    queueasociated: {type: mongoose.Schema.Types.ObjectId, ref: 'queue'},
    asignedto: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    createdby: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    description: {type: String, required: true},
    currentsituation: {
        status: {type: String, enum: ['pending', 'processing', 'closed'], default: 'pending'},
        changedon: {type: Date, default: Date.now}
    },
    comments:[{
        commenter: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        comment: {type: [String], required: true},
        date: {type: Date, default: Date.now}
    }],
    processinghistory:[{
        user: {types: mongoose.Schema.Types.ObjectId, ref: 'user'},
        date: {type: Date, default: Date.now}
    }],
    createdat: {type: Date, default: Date.now},
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);