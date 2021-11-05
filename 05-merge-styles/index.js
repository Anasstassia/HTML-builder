const fs = require("fs");
const path = require("path");
const { createReadStream, createWriteStream } = require("fs");

const filesFolder = path.join(__dirname, "/styles");
const bundleFilePath = path.join(__dirname, "/project-dist/bundle.css");
const newBundle = createWriteStream(bundleFilePath);
const str = createWriteStream(bundleFilePath);

newBundle.once("open", () =>
  fs.readdir(filesFolder, { withFileTypes: true }, (err, files) => {
    for (let file of files) {
      const extname = path.extname(file.name);
      const extn = extname.slice(1);
      if (file.isFile() && extn === "css") {
        const stream = createReadStream(
          path.join(filesFolder, path.basename(file.name))
        );
        stream.on("data", (chunk) => {
          str.write(chunk);
        });
      }
    }
  })
);
