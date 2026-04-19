const express = require("express");
const cors = require("cors");
const { AccessToken } = require("livekit-server-sdk");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/token", (req, res) => {
  try {
    const room = req.query.room || "default-room";
    const name = req.query.name || "guest";

    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: name,
      }
    );

    at.addGrant({
      roomJoin: true,
      room: room,
      canPublish: true,
      canSubscribe: true,
    });

    const token = at.toJwt();

    res.json({
      token: token,
      url: process.env.LIVEKIT_URL,
    });

  } catch (err) {
    console.error("Token error:", err);
    res.status(500).json({ error: "Token generation failed" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});