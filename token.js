const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend running");
});

const { AccessToken } = require("livekit-server-sdk");

app.get("/token", (req, res) => {
  try {
    const room = req.query.room || "default-room";
    const name = req.query.name || "guest";

    const at = new AccessToken(
      process.env.APIHhCSZmAy8QZ8,
      process.env.voUPrcBFYZKE9sO6q3zMmjcSXYWbe8bx7tJ3v88k81X,
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
      token,
      url: process.env.wss://spark-83iz2caa.livekit.cloud,
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