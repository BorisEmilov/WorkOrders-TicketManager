const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        mongoose.connect(db);
        console.log('Mongo connected');
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

module.exports = connectDB;