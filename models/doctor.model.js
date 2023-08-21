const { default: mongoose } = require("mongoose")


const doctorSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    slots: { type: Number, required: true },
    fee: { type: Number, required: true },


}, { versionKey: false });

const Doctor = mongoose.model("doctor", doctorSchema)

module.exports = { Doctor }