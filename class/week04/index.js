import express from "express"; // if you are using type: module
import logger from "./middleware/logger.js";
import auth from "./middleware/auth.js";
//const express = require("express"); // if using common JS (Default)
 
const app = express();
const PORT = process.env.PORT || 8000;


// middlelware
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

//app.use(logger);// application wide so it runs everywhere

// routes
app.get("/",logger, (req, res) => {
    // logger(req);
    res.send("Welcome to our server");
});

app.get("/about", (req, res) => {
    res.send("Welcome to the about page");
});

app.get("/login", (req, res) => {
    res.send("We have received your request -Login");
});

app.post("/login", (req, res) => {
    res.send("We stole your information");
});

app.get("/fetchdata",auth, (req, res) => {
    res.send("Hi Jecoliah, here is your profile data");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
// all of routing should be above this 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});