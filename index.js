const express = require("express");
const cors = require("cors");
const videosRoutes = require("./routes/videosRoutes");

const app = express();

require("dotenv").config();
const { PORT } = process.env;

//MIDDLEWARE
app.use(cors());
app.use(express.json());

app.use("/videos", videosRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
