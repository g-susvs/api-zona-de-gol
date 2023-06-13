require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("ZONA DE GOL - API");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
