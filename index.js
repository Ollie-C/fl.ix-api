const express = require("express");
const app = express();
const cors = require("cors");
const crypto = require("crypto");
const fs = require("fs");
// const { readData } = require("./utils/helpers.mjs");
const router = require("express").Router;

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
app
  .route("/videos")
  .get((req, res) => {
    const videosData = JSON.parse(fs.readFileSync("./data/videos.json"));
    // const videosData = readData(); *DOESNT WORK*
    res.status(200).json(videosData);
  })
  .post((req, res) => {
    const videosData = JSON.parse(fs.readFileSync("./data/videos.json"));
    const newVideo = {
      id: crypto.randomBytes(16).toString("hex"),
      title: req.query.title,
      channel: "Red Cow",
      image: "https://i.imgur.com/l2Xfgpl.jpg",
      description: req.query.description,
      views: "1",
      likes: "1",
      duration: "3:00",
      video: "https://project-2-api.herokuapp.com/stream",
      timestamp: 1626032763000, //to change
      comments: [
        {
          id: crypto.randomBytes(16).toString("hex"),
          name: "Nice",
          comment: "Nice.",
          likes: 100,
          timestamp: 1628522461000,
        },
        {
          id: crypto.randomBytes(16).toString("hex"),
          name: "Nice",
          comment: "Nice.",
          likes: 10000,
          timestamp: 1628522461000,
        },
      ],
    };
    videosData.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videosData));
    res.status(201).json(newVideo);
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
