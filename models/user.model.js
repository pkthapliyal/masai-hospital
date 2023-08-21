const { default: mongoose } = require("mongoose")


const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
}, { versionKey: false });

const User = mongoose.model("user", userSchema)

module.exports = { User }