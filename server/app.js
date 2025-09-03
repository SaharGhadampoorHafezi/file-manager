const express = require("express");
const { uploadFile, deleteFile, listFile } = require("./middleware/multer");
const app = express();
const port = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", uploadFile.single("image"), (req, res) => {
  console.log(req.body);

  if (!req.file) {
    return res.status(400).send("no file uploaded");
  }

  res.send({
    message: "file uploaded successfully",
    file: req.file,
  });
});

app.delete("/delete/:filename", deleteFile);

app.get("/files", listFile);

app.listen(port, () => {
  console.log("server is running");
});
