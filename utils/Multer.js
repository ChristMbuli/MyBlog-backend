const multer = require("multer");
const storage = multer.memoryStorage();
const path = require("path");

// Multer config

const multerMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".webp" &&
      ext !== ".mp4"
    ) {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
}).array("image", 1);

module.exports = multerMiddleware;
