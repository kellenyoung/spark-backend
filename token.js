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
    token: "working",
    url: "working"
  });
});

// 👇 THIS IS THE PART YOU JUST FIXED
const PORT = process.env.PORT;

if (!PORT) {
  console.error("❌ PORT is missing");
  process.exit(1);
}

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port", PORT);
});