const fs = require("fs");

const readData = () => {
  return JSON.parse(fs.readFileSync("./data/videos.json"));
};

const writeData = (myData) => {
  fs.writeFileSync("./data/videos.json", JSON.stringify(myData));
};

module.exports = {
  readData,
  writeData,
};
