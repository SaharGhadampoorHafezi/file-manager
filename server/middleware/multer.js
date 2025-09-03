const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, filename, cb) {
    fs.mkdirSync("public/upload", { recursive: true });
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const whiteListFormat = [".png", "jpeg", "webp"];
    if (whiteListFormat.includes(ext)) {
      console.log(ext, file.mimetype);
      const fileName = Date.now() + ext;
      cb(null, fileName);
    } else {
      cb(new Error("only picture allowed"));
    }
  },
});

const uploadFile = multer({ storage });

const deleteFile = async (req, res) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      return res
        .status(400)
        .json({ success: false, message: "Filename is required" });
    }

    const filePath = path.join(__dirname, "../public/upload", filename);
    console.log("Attempting to delete:", filePath);

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      return res.json({ success: true, message: "File deleted" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "File not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "error deleting file" });
  }
};

const listFile = (req, res) => {
  try {
    const uploadDir = path.join(__dirname, "../public/upload");

    if (!fs.readdirSync(uploadDir)) {
      return res.json({ success: true, files: [] });
    }
    const files = fs.readdirSync(uploadDir);

    return res.json({ success: true, files });
  } catch (err) {
    console.error("list files error", err);
    res
      .status(500)
      .json({
        success: false,
        message: "error reading files",
        error: err.message,
      });
  }
};

module.exports = { uploadFile, deleteFile, listFile };
