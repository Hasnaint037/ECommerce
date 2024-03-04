let mongoose = require("mongoose");
let dot = require("dotenv").config();
exports.dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_NAME);
        console.log("database connected")
    } catch (err) {
        console.log(err);
    }
}