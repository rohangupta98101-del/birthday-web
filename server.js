const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve index.html & images

// Save choice
app.post("/save-choice", (req, res) => {
  const { choice } = req.body;
  const log = `Choice: ${choice} | Time: ${new Date().toLocaleString()}\n`;
  fs.appendFileSync(path.join(__dirname, "choices.txt"), log);
  console.log("Saved choice:", choice);
  res.sendStatus(200);
});

// Show choices
app.get("/choices", (req, res) => {
  const filename = path.join(__dirname, "choices.txt");
  if (fs.existsSync(filename)) {
    res.type("text/plain").send(fs.readFileSync(filename, "utf-8"));
  } else {
    res.send("No choices yet.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

