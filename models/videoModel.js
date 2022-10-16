const { readData, writeData } = require("../utils/helpers.js");
const crypto = require("crypto");

const getAllVideos = () => {
  const videosData = readData();
  return videosData;
};

const createVideo = (title, description) => {
  const videosData = readData();
  const newVideo = {
    id: crypto.randomBytes(16).toString("hex"),
    title: title,
    channel: "Red Cow",
    image: "https://i.imgur.com/l2Xfgpl.jpg",
    description: description,
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
  writeData(videosData);
  return newVideo;
};

const getIndividualVideo = (videoId) => {
  const videosData = readData();
  const currentVideo = videosData.find((video) => video.id === videoId);

  return currentVideo;
};

const getVideoComments = (videoId) => {
  const videosData = readData();
  const individualVideoComments = videosData.find(
    (video) => video.id === videoId
  ).comments;
  return individualVideoComments;
};

const createNewComment = (comment, videoId) => {
  const videosData = readData();
  const newComment = {
    id: crypto.randomBytes(16).toString("hex"),
    name: "User Name",
    comment: comment,
    likes: Math.floor(Math.random() * 1000),
    timestamp: Date.now(),
  };
  videosData.find((video) => video.id === videoId).comments.unshift(newComment);
  writeData(videosData);
  return newComment;
};

const likeVideo = (videoId) => {
  const videosData = readData();
  videosData.find((video) => video.id === videoId).likes = `${
    parseFloat(
      videosData.find((video) => video.id === videoId).likes.replace(/,/g, "")
    ) + 1
  }`;
  writeData(videosData);
  return;
};

module.exports = {
  getAllVideos,
  getIndividualVideo,
  createVideo,
  getVideoComments,
  createNewComment,
  likeVideo,
};
