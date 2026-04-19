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
  try {
    const room = req.query.room || "default-room";
    const name = req.query.name || "guest";

    const payload = {
      iss: process.env.LIVEKIT_API_KEY,
      sub: name,
      video: {
        roomJoin: true,
        room: room,
        canPublish: true,
        canSubscribe: true
      }
    };

    const token = jwt.sign(
      payload,
      process.env.LIVEKIT_API_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      url: process.env.LIVEKIT_URL
    });

  } catch (err) {
    console.error("Token error:", err);
    res.status(500).json({ error: err.message });
  }
});