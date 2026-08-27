const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    await mongoose.connect(process.env.MONGOURI)
    .then(() => console.log("DB is Connected"))
    .catch((e) => console.error("DB not connected",e))
}

module.exports = connectDB;