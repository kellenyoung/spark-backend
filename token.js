console.log("🔥 STARTING SERVER FILE");
const jwt = require("jsonwebtoken");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/token", (req, res) => {
  res.json({
    token: "working",
    url: "working"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});