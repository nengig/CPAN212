const auth = (req, res, next) =>{
    if (req.query.username == "Jecoliah"){
        next();
    } else {
        res.send("You are not authorized for this page")
    }
}
export default auth;