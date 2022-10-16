const express = require("express");
const cors = require("cors");
const videosRoutes = require("./routes/videosRoutes");

const app = express();

require("dotenv").config();
const { PORT } = process.env;

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//STATIC FILES
app.use(express.static("public"));

//ERROR HANDLING
app.use((err, req, res, next) => {
  console.log(err);
  res.status(422).send({ error: err.message });
});

//ROUTES
app.use("/videos", videosRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
