const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// Simple health check
app.get("/", (req, res) => {
  res.send("Backend running");
});

// TEMP: no LiveKit yet (we confirm server works first)
app.get("/token", (req, res) => {
  res.json({
    token: "working",
    url: "working"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});