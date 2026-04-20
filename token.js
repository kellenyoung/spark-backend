app.get("/token", (req, res) => {
  try {
    const jwt = require("jsonwebtoken");

    const room = req.query.room || "default-room";
    const name = req.query.name || "guest";

    const API_KEY = process.env.LIVEKIT_API_KEY;
    const API_SECRET = process.env.LIVEKIT_API_SECRET;
    const LIVEKIT_URL = process.env.LIVEKIT_URL;

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