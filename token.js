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

    console.log("Room:", room, "Name:", name);

    const payload = {
      iss: "test",
      sub: name,
      video: {
        roomJoin: true,
        room: room,
        canPublish: true,
        canSubscribe: true
      }
    };

    console.log("Payload built");

    const token = jwt.sign(payload, "test-secret", { expiresIn: "1h" });

    console.log("Token created");

    res.json({
      token,
      url: "test"
    });

  } catch (err) {
    console.error("❌ Token error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});