const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

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
  async (req, res) => {
    try {

      const formData = new FormData();

      formData.append(
        "image",
        fs.createReadStream(req.file.path)
      );

      const flaskResponse = await axios.post(
        "http://127.0.0.1:5001/analyze",
        formData,
        {
          headers: formData.getHeaders(),
        }
      );

      fs.unlinkSync(req.file.path);
      console.log(flaskResponse.data);

      res.json({
        success: true,
        age: flaskResponse.data.age,
        gender: flaskResponse.data.gender,
        income: req.body.income,
      });

    } catch (error) {

      console.error(error.message);

      res.status(500).json({
        error: "AI Analysis Failed",
      });
    }
  }
);

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});