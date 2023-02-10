const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// Load environment variables from .env file
require("dotenv").config();

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});