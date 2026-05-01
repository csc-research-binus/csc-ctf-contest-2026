const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Serve semua file statis dari folder 'public' sebagai root
app.use(express.static(path.join(__dirname, "public")));

// Route untuk root (/) - arahkan ke public/index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Optional: log semua request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.listen(port, "0.0.0.0", () => {
  console.log(`CTF Challenge running at http://localhost:${port}`);
  console.log(`Serving files from: ${path.join(__dirname, "public")}`);
});
