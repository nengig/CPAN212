//imports
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import recipe_router from "./routes/recipes_router.js"

//variables
dotenv.config()
const app = express();
const PORT = process.env.PORT || 6001

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

app.use("/recipe", recipe_router)

