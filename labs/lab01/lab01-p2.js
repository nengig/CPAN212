import http from "http";
import fs from "fs";
import path from "path";
const app = http.createServer((req, res) => {
    if (req.url === '/'){
        const webpage = fs.readFileSync(path.join("htmlPages", "home.html"));
        res.end(webpage);
    }else if (req.url === '/about'){
        const webpage = fs.readFileSync(path.join("htmlPages", "about.html"));
        res.end(webpage);
    }else if (req.url === '/contact'){
        const webpage = fs.readFileSync(path.join("htmlPages", "contact.html"));
        res.end(webpage);
    }else if (req.url === '/services'){
        const webpage = fs.readFileSync(path.join("htmlPages", "service.html"));
        res.end(webpage);
    }else{
        res.end("PAGE NOT FOUND");
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
})