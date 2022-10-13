// const videoLocation = "./data/videos.json";

export const readData = () => {
  return JSON.parse(fs.readFileSync("./data/videos.json"));
};

// export const writeData = () = {

// }
