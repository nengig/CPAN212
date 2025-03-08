import path from "path";
import fs from "fs";

//this function retreives all the files in the design folder and saves in the req parameter the link to 
//the images in the design folder
//this will be sent to the front end to be displayed using .map
const getDesigns = (req, res, next) => {
  const designsFolder = path.join(process.cwd(), "portfolioInfo/designs");

  fs.readdir(designsFolder, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read images directory" });
    }

    // Store image URLs in request object
    req.designs = files.map(file => `http://localhost:8000/portfolio/design/${file}`);

    next(); // Pass control to the next handler
  });
};

export default getDesigns;