const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT : process.env.PORT || 7000,
    MONGO_DB_URI : process.env.MONGO_DB_URI,
    NODE_ENV : process.env.NODE_ENV || "development",
    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,
}