const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const secretKey = process.env.secretKey;
const appointmentRoute = express.Router()
const { Doctor } = require("../models/doctor.model")



// / get route 
appointmentRoute.get("/appointments/:id", async (req, res) => {
    try {

        const doctor = await Doctor.findOne({ _id: req.params.id })
        res.send(doctor)
    } catch (err) {
        res.send({ error: err.message })
    }

})

appointmentRoute.get("/appointments", async (req, res) => {
    try {
        const { specialization, date, name } = req.query;
        const sort_val = date == "asc" ? 1 : -1;

        if (specialization) {
            let data = await Doctor.find({ specialization: specialization });
            return res.send(data)
        }
        if (date) {
            let data = await Doctor.find().sort({ date: sort_val });
            return res.send(data)

        }
        if (name) {
            let data = await Doctor.find({ name: { $regex: name, $options: "i" } });
            return res.send(data)

        }
        const data = await Doctor.find()
        res.send(data)

    } catch (err) {
        res.send({ error: err.message })
    }

})



appointmentRoute.post("/appointments", async (req, res) => {
    try {
        const { name,
            image,
            specialization,
            experience,
            location,
            date,
            slots,
            fee } = req.body;
        let doctor = await Doctor(req.body)
        await doctor.save();

        res.send({ message: "One doctor has ben added" })

    } catch (err) {
        res.send({ error: err.message })
    }

})

appointmentRoute.patch("/appointments/:id", async (req, res) => {
    try {

        await Doctor.updateOne({ _id: req.params.id }, { ...req.body })
        res.send({ message: "One doctor has ben updated" })
    } catch (err) {
        res.send({ error: err.message })
    }

})

appointmentRoute.delete("/appointments/:id", async (req, res) => {
    try {

        await Doctor.deleteOne({ _id: req.params.id })
        res.send({ message: "One doctor has ben deleted " })
    } catch (err) {
        res.send({ error: err.message })
    }

})









module.exports = { appointmentRoute }