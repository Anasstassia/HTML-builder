const fs = require("fs");
const { copyFile } = require("fs/promises");
const path = require("path");

async function copyDir() {
  const filesFolder = path.join(__dirname, "files");
  const copyFolder = path.join(__dirname, "files-copy");

  //создаем директорию
  fs.mkdir(copyFolder, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(copyFolder, { withFileTypes: true }, (err, files) => {
    if (files.length !== 0) {
      files.forEach((file) => {
        if (file.isFile()) {
          fs.unlink(path.join(copyFolder, path.basename(file.name)), (err) => {
            if (err) throw err;
          });
        }
      });
    }
  });

  fs.readdir(filesFolder, { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        fs.copyFile(
          path.join(filesFolder, path.basename(file.name)),
          path.join(copyFolder, path.basename(file.name)),
          (err) => {
            if (err) throw err;
          }
        );
      }
    });
  });
}

copyDir();
