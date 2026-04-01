const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['backEndDeveloper', 'frontEndDeveloper', 'databaseAdministrator', 'devOpsEngineer'], required: true},
    actualacces: [
        {
            toolacces: {type: String},
            ticketaces: {type: mongoose.Schema.Types.ObjectId, ref: 'ticket'},
            queueacces: {type: mongoose.Schema.Types.ObjectId, ref: 'queue'},
            dateofacces: {type: Date, default: Date.now},
        }
    ],
});

module.exports = User = mongoose.model('user', UserSchema);