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

    const room = req.query.room || "default-room";
    const name = req.query.name || "guest";

    const API_KEY = APIHhCSZmAy8QZ8;
    const API_SECRET = voUPrcBFYZKE9sO6q3zMmjcSXYWbe8bx7tJ3v88k81X;
    const LIVEKIT_URL = wss://spark-83iz2caa.livekit.cloud;

    if (!API_KEY || !API_SECRET || !LIVEKIT_URL) {
      console.error("❌ Missing environment variables");
      return res.status(500).json({ error: "Missing env vars" });
    }

    const payload = {
      iss: API_KEY,
      sub: name,
      video: {
        roomJoin: true,
        room: room,
        canPublish: true,
        canSubscribe: true
      }
    };

    const token = jwt.sign(payload, API_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      url: LIVEKIT_URL
    });

  } catch (err) {
    console.error("❌ Token error:", err);
    res.status(500).json({ error: err.message });
  }
});