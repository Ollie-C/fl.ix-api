const express = require("express");
const app = express();
const cors = require("cors");
const crypto = require("crypto");
// const { v4: uuid } = require("uuid");
const fs = require("fs");

//DOTENV
require("dotenv").config();
const { PORT } = process.env;

//MIDDLEWARE
app.use(cors());
app.use(express.json());
//TEST
app.use((req, res, next) => {
  console.log(
    `Incoming request: ${req.path}, Host: ${req.hostname} / IP: ${req.ip}`
  );
  next();
});

//GET DATA
app.route("/videos").get((req, res) => {
  const fileContent = fs.readFileSync("./data/videos.json");
  res.status(200).json(JSON.parse(fileContent));
});
// .post((req, res) => {
//   console.log(/*data*/);
//   res.status(201).json(/*data*/);
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
