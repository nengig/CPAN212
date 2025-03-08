import path from "path";
import fs from "fs";
//this function retreives all the files in the photographs folder and saves in the req parameter the link to 
//the images in the phorographs folder
//it will be called in a route and  that route will send the array to the front end to be displayed using .map
const getPhotographs = (req, res, next) => {
  const photographsFolder = path.join(process.cwd(), "portfolioInfo/photographs");

  fs.readdir(photographsFolder, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read images directory" });
    }

    // Store image URLs in request object
    req.photographs = files.map(file => `http://localhost:8000/portfolio/photograph/${file}`);

    next(); // Pass control to the next handler
  });
};

export default getPhotographs;