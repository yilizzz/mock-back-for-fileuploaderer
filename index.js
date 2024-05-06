const express = require("express");
const multer = require("multer");
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define a POST route for file upload
app.post("/upload", upload.any(), (req, res) => {
  if (req.files.length > 0) {
    res.status(200).send({
      message: "File uploaded successfully!",
    });
  } else {
    res.status(400).send({ message: "Please upload a file." });
  }
});

app.get("/", (req, res) => {
  res.send("I am a mock back for file-uploader");
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
