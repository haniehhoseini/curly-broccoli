const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");

// Load environment variables from .env file
require("dotenv").config();

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});