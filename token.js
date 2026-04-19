const express = require("express");
const cors = require("cors");
const { AccessToken } = require("livekit-server-sdk");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Use environment variables (set these in Render)
const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

// 🔍 Health check (so you don’t see "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Spark backend is running");
});

// 🔑 Token endpoint
app.get("/token", (req, res) => {
  try {
    const room = req.query.room || "default-room";
    const name = req.query.name || "guest";

    const at = new AccessToken(API_KEY, API_SECRET, {
      identity: name,
    });

    at.addGrant({
      roomJoin: true,
      room: room,
      canPublish: true,
      canSubscribe: true,
    });

    const token = at.toJwt();

    res.json({
      token,
      url: LIVEKIT_URL,
    });
  } catch (err) {
    console.error("Token error:", err);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

// ✅ REQUIRED for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});