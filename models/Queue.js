const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
    forrole: {type: String, enum: ['backEnd', 'frontEnd', 'database', 'devOps'], required: true},
    jobsnum: {type: Number, default: 0},
    createdat: {type: Date, default: Date.now}
});

module.exports = Queue = mongoose.model('queue', QueueSchema);