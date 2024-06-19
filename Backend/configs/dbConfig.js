const mongoose = require('mongoose');
const { MONGO_DB_URI } = require('./serverConfig');

async function connectDB() {
    try {
        await mongoose.connect(MONGO_DB_URI);
        console.log('Connected to DB');
    } catch (error) {
        console.log('Error connecting to DB');
    }
}

module.exports = connectDB;