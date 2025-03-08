import express from "express";
import path from "path";
import getDesigns from "../middleware/getDesigns.js";
import getPhotographs from "../middleware/getPhotographs.js";
import programming from "../portfolioInfo/programming_projects.js";
const router = express.Router();

//creates a route to display the photgraphy and design images 
router.use('/photograph', express.static(path.join(process.cwd(), 'portfolioInfo/photographs')));
router.use('/design', express.static(path.join(process.cwd(), 'portfolioInfo/designs')));

router.get('/programming',(req,res)=>{
    res.json(programming)
})
//route to get route for pictures
//calls middleware functions that sends an array of routes for the images 
router.get("/designs",getDesigns, (req, res) => {
      res.json(req.designs);
});
router.get("/photographs",getPhotographs, (req, res) => {
    res.json(req.photographs);
});
export default router;