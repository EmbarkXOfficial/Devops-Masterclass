const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const HOSTNAME = process.env.HOSTNAME || require("os").hostname();
const TAX_SERVICE_URL = process.env.TAX_SERVICE_URL || "http://service-b:4000";

// CORS (must come before routes)
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // mobile/curl
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS blocked"));
  }
}));

// Route
app.get("/price", async (req, res) => {
  const amount = Number(req.query.amount || 0);
  const country = (req.query.country || "DEFAULT").toUpperCase();

  const r = await axios.get(`${TAX_SERVICE_URL}/tax?country=${country}`);
  const tax = Number(r.data.tax);

  res.json({
    service: "A",
    amount,
    tax,
    total: amount + tax,
    container: HOSTNAME,
    service_b_container: r.data.container
  });
});

app.listen(3000, () => console.log("Service A running on 3000"));
