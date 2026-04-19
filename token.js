console.log("ENV TEST:", process.env.TEST_VAR);
console.log("🔥 STARTING SERVER FILE");

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

console.log("✅ Imports loaded");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/token", (req, res) => {
  console.log("➡️ /token route hit");

  try {
    const room = req.query.room || "default-room";
    const name = req.query.name || "guest";

    const API_KEY = process.env.LIVEKIT_API_KEY;
    const API_SECRET = process.env.LIVEKIT_API_SECRET;
    const LIVEKIT_URL = process.env.LIVEKIT_URL;

    // 🚨 safety check (this is what was missing before)
    if (!API_KEY || !API_SECRET || !LIVEKIT_URL) {
      console.error("❌ Missing environment variables");
      return res.status(500).json({
        error: "Missing LiveKit environment variables"
      });
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