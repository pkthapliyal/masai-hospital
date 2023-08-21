const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect("mongodb+srv://pkthapliyal:pankajkr@cluster0.l1f5yob.mongodb.net/masai-hospital?retryWrites=true&w=majority");

module.exports = { connection }
