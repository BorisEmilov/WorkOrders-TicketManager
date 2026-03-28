const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
    forrole: {type: String, enum: ['FrontDev', 'BackDev', 'DBAdmin', 'Test', 'QA', 'TL', 'OPM'], required: true},
    jobsnum: {type: Number, default: 0},
    lownum: {type: Number, default: 0},
    midnum: {type: Number, default: 0},
    highnum: {type: Number, default: 0},
    createdat: {type: Dtae, default: Date.now}
});

module.exports = Queue = mongoose.model('queue', QueueSchema);