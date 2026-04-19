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
  res.json({
    token: "no-jwt-yet",
    url: process.env.LIVEKIT_URL || "test"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});