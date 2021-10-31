const { createReadStream } = require("fs");
const path = require("path");

const stream = createReadStream(path.join(__dirname, "./text.txt"));
stream.on("data", (chunk) => {
  console.log(chunk.toString());
});
