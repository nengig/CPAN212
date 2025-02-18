const logger = (req, res, next)=>{
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers); // informatin about device
    console.log(Date());
    next();
}
//module.exports logger;
export default logger;