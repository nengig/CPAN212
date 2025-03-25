//imports
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import book_router from "./routers/book_router.js"
import user_router from "./routers/user_router.js"

//variables
dotenv.config()
const app = express();
const PORT = process.env.PORT || 6000

// //middleware
app.use(cors())
app.use(express.json()) //allow to send JSON
app.use(express.urlencoded({ extended: true })) //allows to send html forms

//start up
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("database is connected")
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`)
        });
    })

//routes
app.get("/", (req, res) => {
    res.send("hi")
})

app.use("/book", book_router)
app.use("/user", user_router)
