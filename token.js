console.log("🔥 STARTING SERVER FILE");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

console.log("ENV TEST:", process.env.TEST_VAR);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/token", (req, res) => {
  try {
    const jwt = require("jsonwebtoken");

    const token = jwt.sign(
      { test: true },
      "test-secret",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      url: process.env.LIVEKIT_URL || "test"
    });

  } catch (err) {
    console.error("JWT error:", err);
    res.status(500).json({ error: err.message });
  }
});