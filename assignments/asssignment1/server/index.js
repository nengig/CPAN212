import express from "express"; // if you are using type: module
import cors from "cors";
import resume_route from './routes/resume_route.js';
import portfolio_route from'./routes/portfolio_route.js';

const app = express();
const PORT = process.env.PORT || 8000;


// middlelware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/resume',resume_route);
app.use('/portfolio', portfolio_route)
 
// routes
app.get("/", (req, res) => {
    res.send("Welcome to server")
});
 
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
}); 
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});