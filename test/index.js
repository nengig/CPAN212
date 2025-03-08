const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
 
 
// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const testMiddleware = (req,res,next) =>{
    let test_validation = req.query;
    console.log(test_validation)
    console.log(new Date ().toUTCString() + " " + `\nhttp://localhost:${PORT}${req.path}`)
    next();
}
 
 
// routes
app.get("/", (req, res)=>{
    res.send("Welcome to our server")
})
 
app.get("/route_test", testMiddleware, (req, res)=>{
    res.send("In route_test")
})
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});