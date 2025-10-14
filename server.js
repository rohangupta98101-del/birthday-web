const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // serves index.html, box.jpeg, etc.

// POST endpoint to save gift choice
app.post("/save-choice", (req, res) => {
  const { choice } = req.body;
  const log = `Choice: ${choice} | Time: ${new Date().toLocaleString()}\n`;
  fs.appendFileSync(path.join(__dirname, "choices.txt"), log);
  console.log("✅ Saved choice:", choice);
  res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
  console.log(`🎉 Server running at http://localhost:${PORT}`);
  app.get("/choices", (req, res) => {
    const file = path.join(__dirname, "choices.txt");
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, "utf-8");
      res.type("text/plain").send(data);
    } else {
      res.send("No choices yet.");
    }
  });
  
});

