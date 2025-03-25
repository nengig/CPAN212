import express from "express"
import User from "../models/user.js"
import bcrypt from "bcryptjs"

const router = express.Router()

//register
router.post("/register", (req, res) => {
    const { email, password } = req.body; //parse info
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    bcrypt.hash(password, 10) // hash password
        .then((hashedPassword) => {
            let newUser = new User({
                email,
                password: hashedPassword
            })
            newUser.save() //save
                .then(() => {
                    res.json({ message: "you are registered" })
                })
        })

})
//login
router.post("/login", (req, res) => {
    const { email, password } = req.body; //parse info
    User.findOne({ email: email })
        .then((useraccount) => {
            if (!useraccount) {
                return res.status(400).json({ message: "NO ACCOUNT FOUUND" })
            }
            bcrypt.compare(password, useraccount.password)
                .then((compareResults) => {
                    if (compareResults) {
                        res.json({ message: "you have logged in" })
                    }
                })
        })
        .catch((err) => {
            console.log(err)
            res.json({ message: "account not found" })
        })
})

export default router;