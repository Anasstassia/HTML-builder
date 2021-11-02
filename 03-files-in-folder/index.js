const fs = require("fs");
const path = require("path");
const { stat } = require("fs");

const pathFolder = path.join(__dirname, "/secret-folder");

fs.readdir(pathFolder, { withFileTypes: true }, (err, files) => {
  files.forEach((file) => {
    if (file.isFile()) {
      const extname = path.extname(file.name);
      const filename = path.basename(file.name, extname);
      stat(path.join(pathFolder, file.name), (err, stats) => {
        console.log(`${filename} - ${extname.slice(1)} - ${stats.size}b`);
      });
    }
  });
});
