import path from "path";
import fs from "fs";

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