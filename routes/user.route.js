const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const secretKey = process.env.secretKey;
const userRoute = express.Router()
const { User } = require("../models/user.model")


userRoute.post("/signup", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {

            return res.status(403).send({ "error": "user already exists!!" })

        }
        const { confirmPassword, email, password } = req.body;
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(404).send({ "error": err.message })
            }
            user = await User({ email, password: hash, confirmPassword: hash })
            await user.save();
            return res.status(201).send({ "message": "User has been registerd" })
        })


    } catch (error) {
        res.send({ error: error.message })
    }


})





//  login 
userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(403).send({ "error": "Invailid credentials" })
    }
    bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
            let token = jwt.sign({ user: user.email, userID: user._id }, secretKey)
            res.cookie("token", token)
            return res.status(200).send({ "message": "Login Successfully", "token": token })
        }
        else {
            return res.status(403).send({ "error": err.message })
        }
    })

})





module.exports = { userRoute }