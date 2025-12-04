const express = require("express");
const app = express();
const HOSTNAME = process.env.HOSTNAME || require('os').hostname();
const TAX_TABLE = { IN: 18, US: 8, EU: 20 };

app.get("/tax", (req, res) => {
  const country = (req.query.country || "DEFAULT").toUpperCase();
  const tax = TAX_TABLE[country] ?? 10;
  res.json({ service: "B", country, tax, container: HOSTNAME });
});

app.listen(4000, () => console.log("Tax Service B running on 4000"));
