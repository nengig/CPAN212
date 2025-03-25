import express from "express"
import Book from "../models/book.js"

const router = express.Router()
//1- fetch all
router.get("/", (req, res) => {
    Book.find() // fetch from db
        .then((results) => {
            res.json(results) //send to client
        })
})

//2- fetch by id
router.get("/:id", (req, res) => {
    Book.findById(req.params.id) // fetch from db
        .then((results) => {
            res.json(results) //send to client
        })
})
//3- search
router.get("/search", (req, res) => {
    const filters = {}
    //query
    if (req.query.title) {
        filters.title = req.query.title;
    }
    if (req.query.pages) {
        let pages = parseInt(req.query.pages)
        if (req.query.logicalOperators) {
            switch (req.query.logicalOperators) {
                case gte:
                    filters.pages = { $gte: { pages } }
                    break;
                default:
                    break;
            }
        }
        filters.pages = req.query.title;
    }
    Book.find(filters)// fetch from db
        .then((results) => {
            res.json(results) //send to client
        })
})
//4- update
router.put("/:id", (req, res) => {
    Book.findByIdAndUpdate(req.params.id) // fetch from db
        .then(() => {
            res.json({ message: "update successful" }) //send to client
        })
})
//4- delete
router.delete("/:id", (req, res) => {
    Book.findByIdAndDelete(req.params.id) // fetch from db
        .then(() => {
            res.json({ message: "delete successful" }) //send to client
        })
})

router.post("/save", (req, res) => {
    const { title, author, publisher, pages } = req.body

    let newBook = new Book({
        title,
        author,
        publisher,
        pages
    })
    newBook.save()
        .then(() => {
            res.json({ message: "data saved" })
        })
})
export default router