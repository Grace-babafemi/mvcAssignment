const mongoose = require("mongoose");
require("dotenv/config");
const {MONGODB_URL} = process.env

const dataBase = async (params) => {
    try {
        await mongoose.connect(MONGODB_URL)
        console.log("connected")
    } catch (error) {
        console.log(error), error
    }
}

module.exports = dataBase