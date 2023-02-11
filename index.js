const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { prisma } = require("./prisma");

// Load environment variables from .env file
require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Worlds!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});