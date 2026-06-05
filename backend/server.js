const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Multer Configuration
const upload = multer({
  dest: "uploads/",
});

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Backend Working",
  });
});

// Analyze Route
app.post(
  "/api/analyze",
  upload.single("image"),
  (req, res) => {

    console.log("Income:", req.body.income);

    console.log("File:", req.file);

    res.json({
      success: true,
      message: "Image Received Successfully",
      income: req.body.income,
      fileName: req.file.originalname,
    });
  }
);

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});