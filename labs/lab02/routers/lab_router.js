import express from "express";

const router = express.Router()
router.get("/", (req,res)=>{
    res.send("Welcome to the lab router")
})
router.get("/name", (req,res)=>{
    res.send("Jecoliah .O. Gbobo")
})
router.get("/greetings", (req,res)=>{
    res.send("Hello from Jecoliah, n01681308")
})
router.get("/add/:x/:y", (req,res)=>{
    let x = parseFloat(req.params.x)
    let y = parseFloat(req.params.y)

    res.send(`${x+y}`)
})
router.get("/calculate/:a/:b/:operation", (req,res)=>{
    let a = parseFloat(req.params.a)
    let b = parseFloat(req.params.b)
    let operation = req.params.operation
    let result = 0;
    switch (operation) {
        case "+":
            result = a+b
            break;
        case "-":
            result = a-b
            break;
        case "*":
            result = a*b
            break;  
        case "/":
            switch (b) {
                case 0:
                    res.send("Cannot Divide by 0");
                    break;
                default:
                    result = a/b
                    break;
            }
            break;  
        default:
            res.send("Invalid Operation");
    }
   res.send(`${result}`);
})

export default router;