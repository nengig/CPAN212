import express from "express";
import education from "../resume/education.js";
import workExperience from "../resume/workExp.js";
import volunteerExperience from "../resume/volunteerExp.js";
import extracurricular from "../resume/extracurricular.js";
import skills from "../resume/skills.js"
import overview from "../resume/overview.js";
const router = express.Router();

//route that front end will use to fetch information
router.get('/education',(req,res)=>{
    res.json(education)
});
router.get('/workExperience',(req,res)=>{
    res.json(workExperience)
});
router.get('/volunteer', (req,res)=>{
    res.json(volunteerExperience)
});
router.get('/extracurricular', (req,res)=>{
    res.json(extracurricular)
});
router.get('/skills', (req,res)=>{
    res.json(skills)
});
router.get('/overview', (req,res)=>{
    res.json(overview)
});
export default router
