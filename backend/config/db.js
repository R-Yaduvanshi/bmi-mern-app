const mongoose = require("mongoose");
require("dotenv").config();
const connectin = mongoose.connect(process.env.MONGO_URL);
module.exports = { connectin };
