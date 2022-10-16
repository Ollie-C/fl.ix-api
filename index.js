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

// videos

app
  .route("/videos")
  .get((req, res) => {
    const videosData = JSON.parse(fs.readFileSync("./data/videos.json"));
    res.status(200).json(videosData);
  })
  .post((req, res) => {
    const videosData = JSON.parse(fs.readFileSync("./data/videos.json"));
    const newVideo = {
      id: crypto.randomBytes(16).toString("hex"),
      title: req.body.title,
      channel: "Red Cow",
      image: "https://i.imgur.com/l2Xfgpl.jpg",
      description: req.body.description,
      views: Math.floor(Math.random() * 10000),
      likes: Math.floor(Math.random() * 100),
      duration: "3:00",
      video: "https://project-2-api.herokuapp.com/stream",
      timestamp: Date.now(),
      comments: [
        {
          id: crypto.randomBytes(16).toString("hex"),
          name: "Nice",
          comment: "Nice.",
          likes: 100,
          timestamp: Date.now(),
        },
        {
          id: crypto.randomBytes(16).toString("hex"),
          name: "Nice",
          comment: "Nice.",
          likes: 10000,
          timestamp: Date.now(),
        },
      ],
    };
    videosData.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videosData));
    res.status(201).json(newVideo);
  });

app.get("/videos/:videosId", (req, res) => {
  const videosData = JSON.parse(fs.readFileSync("./data/videos.json"));
  const individualVideo = videosData.find(
    (video) => video.id === req.params.videosId
  );
  res.status(200).json(individualVideo);
});

app
  .get("/videos/:videosId/comments", (req, res) => {
    const videosData = JSON.parse(fs.readFileSync("./data/videos.json"));
    const individualVideoComments = videosData.find(
      (video) => video.id === req.params.videosId
    ).comments;
    res.status(200).json(individualVideoComments);
  })
  .post("/videos/:videosId/comments", (req, res) => {
    const videosData = JSON.parse(fs.readFileSync("./data/videos.json"));
    const newComment = {
      id: crypto.randomBytes(16).toString("hex"),
      name: "User Name",
      comment: req.body.comment,
      likes: Math.floor(Math.random() * 1000),
      timestamp: Date.now(),
    };
    videosData
      .find((video) => video.id === req.params.videosId)
      .comments.push(newComment);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videosData));
    res.status(201).json(newComment);
  });

app.put("/videos/:videosId/likes", (req, res) => {
  const videosData = JSON.parse(fs.readFileSync("./data/videos.json"));
  videosData.find((video) => video.id === req.params.videosId).likes = `${
    parseFloat(
      videosData
        .find((video) => video.id === req.params.videosId)
        .likes.replace(/,/g, "")
    ) + 1
  }`;
  fs.writeFileSync("./data/videos.json", JSON.stringify(videosData));
  res.status(201).json(videosData);
});

// app.delete("/:videosId/comments/:commentId", (req, res) => {
//   const videosId = req.params.videosId;
//   const commentId = req.params.commentId;

//   const videosData = JSON.parse(fs.readFileSync("./data/videos.json"));

//   delete videosData
//     .find((video) => video.id == videosId)
//     .comments.find((comment) => comment.id == commentId);
//   fs.writeFileSync("./data/videos.json", JSON.stringify(videosData));
//   res.send(videosData);
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
