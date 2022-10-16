const videoModel = require("../models/videoModel");

const getAllVideos = (req, res) => {
  const videosData = videoModel.getAllVideos();
  res.status(200).json(videosData);
};

const createVideo = (req, res) => {
  const newVideo = videoModel.createVideo(req.body.title, req.body.description);
  res.status(201).json(newVideo);
};

const getIndividualVideo = (req, res) => {
  const individualVideo = videoModel.getIndividualVideo(req.params.videosId);
  res.status(200).json(individualVideo);
};

const getVideoComments = (req, res) => {
  const comments = videoModel.getVideoComments(req.params.videosId);
  res.status(200).json(comments);
};

const createNewComment = (req, res) => {
  const newComment = videoModel.createNewComment(
    req.body.comment,
    req.params.videosId
  );
  res.status(201).json(newComment);
};

const likeVideo = (req, res) => {
  const likedVideo = videoModel.likeVideo(req.params.videosId);
  res.status(201).send(likedVideo);
};

module.exports = {
  getAllVideos,
  getIndividualVideo,
  createVideo,
  getVideoComments,
  createNewComment,
  likeVideo,
};
