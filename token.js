import express from "express";
import cors from "cors";
import { AccessToken } from "livekit-server-sdk";

const app = express();
app.use(cors());

const API_KEY = "APIHhCSZmAy8QZ8";
const API_SECRET = "voUPrcBFYZKE9sO6q3zMmjcSXYWbe8bx7tJ3v88k81X";

app.get("/token", (req, res) => {
  const room = req.query.room || "default-room";
  const name = req.query.name || "guest";

  const at = new AccessToken(APIHhCSZmAy8QZ8, voUPrcBFYZKE9sO6q3zMmjcSXYWbe8bx7tJ3v88k81X, {
    identity: name
  });

  at.addGrant({
    roomJoin: true,
    room,
    canPublish: true,
    canSubscribe: true
  });

  const token = at.toJwt();

  res.json({
    token: "test",
    url: "wss://test"
  });
});

app.listen(3000, () => {
  console.log("Token server running on http://localhost:3000");
});