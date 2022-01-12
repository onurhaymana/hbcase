const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 8081;

app.use(express.static("build"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
