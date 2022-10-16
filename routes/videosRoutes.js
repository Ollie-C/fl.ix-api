const router = require("express").Router();

const {
  getAllVideos,
  createVideo,
  getIndividualVideo,
  getVideoComments,
  createNewComment,
  likeVideo,
} = require("../controllers/videosController");

router.get("/", getAllVideos);
router.post("/", createVideo);
router.get("/:videosId", getIndividualVideo);
router.get("/:videosId/comments", getVideoComments);
router.post("/:videosId/comments", createNewComment);
router.put("/:videosId/likes", likeVideo);

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

module.exports = router;
