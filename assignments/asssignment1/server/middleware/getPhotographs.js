import path from "path";
import fs from "fs";

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