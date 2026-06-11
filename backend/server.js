const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const db = require("./db");

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

      formData.append(
        "income",
        req.body.income
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
      age_group: flaskResponse.data.age_group,
      income: req.body.income,
      recommended_product:
      flaskResponse.data.recommended_product,
  });
    } catch (error) {

      console.error(error.message);

      res.status(500).json({
        error: "AI Analysis Failed",
      });
    }
  }
);

//Total Customers API
app.get("/api/analytics/total-customers", (req, res) => {

  const query = `
    SELECT COUNT(*) AS total
    FROM customers
  `;

  db.query(query, (err, results) => {

    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json({
      total_customers: results[0].total,
    });

  });

});

// Gender Analytics API
app.get("/api/analytics/gender", (req, res) => {

  const query = `
    SELECT gender,
    COUNT(*) AS count
    FROM customers
    GROUP BY gender
  `;

  db.query(query, (err, results) => {

    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json(results);

  });

});

//Product Analytics API
app.get("/api/analytics/products", (req, res) => {

  const query = `
    SELECT recommended_product,
    COUNT(*) AS count
    FROM customers
    GROUP BY recommended_product
  `;

  db.query(query, (err, results) => {

    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json(results);

  });

});

//Income Analytics API
app.get("/api/analytics/income", (req, res) => {

  const query = `
    SELECT income,
    COUNT(*) AS count
    FROM customers
    GROUP BY income
  `;

  db.query(query, (err, results) => {

    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json(results);

  });

});

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});