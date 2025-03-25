import express from "express"
import Recipe from "../models/recipe.js"

const router = express.Router()
//fetch all recipes
router.get("/", (req,res)=>{
    Recipe.find() // fetch from db
        .then((results) => {
            res.json(results) //send to client
        })
})

//add a recipe
router.post("/", (req, res) => {
    const newRecipe = new Recipe(req.body)
    newRecipe.save()
        .then(() => {
            res.json({ message: "recipe saved" })
        })
})
// fetch by id
router.get("/:id", (req, res) => {
    Recipe.findById(req.params.id) 
        .then((results) => {
            res.json(results) 
        })
})
//update
router.put("/:id", (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id,req.body) 
        .then(() => {
            res.json({ message: "update successful" }) 
        })
})
//delete
router.delete("/:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id) 
        .then(() => {
            res.json({ message: "delete successful" }) 
        })
})

export default router