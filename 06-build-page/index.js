const fs = require("fs");
const path = require("path");
const { createReadStream, createWriteStream } = require("fs");
const { copyFile } = require("fs/promises");

const componentsFolder = path.join(__dirname, "components");
const templateFolder = path.join(__dirname, "project-dist");
const bundleCssFilePath = path.join(__dirname, "project-dist", "style.css");
const bundleHtmlFilePath = path.join(__dirname, "project-dist", "index.html");
const stylesFolder = path.join(__dirname, "styles");
const templateFile = path.join(__dirname, "template.html");
const assetsCopyFolder = path.join(__dirname, "project-dist", "assets");
const assetsFolder = path.join(__dirname, "assets");
const stylesBundle = createWriteStream(bundleCssFilePath);
const str = createWriteStream(bundleCssFilePath);

// создание дирикторию project-dist
fs.mkdir(templateFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

// собор всех стилей в общий файл
stylesBundle.once("open", () =>
  fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
    for (let file of files) {
      const extname = path.extname(file.name);
      const extn = extname.slice(1);
      if (file.isFile() && extn === "css") {
        const stream = createReadStream(
          path.join(stylesFolder, path.basename(file.name))
        );
        stream.on("data", (chunk) => {
          str.write(chunk);
        });
      }
    }
  })
);

//перенос папки assets в папку project-dist

async function copyDir() {
  //создаение папки assets
  fs.mkdir(assetsCopyFolder, { recursive: true }, (err) => {
    if (err) throw err;
  });

  function listObjects(pathD, folder) {
    fs.readdir(pathD, { withFileTypes: true }, (err, files) => {
      if (err) throw err;
      for (let file of files) {
        // let name = path.basename(file);
        fs.stat(path.join(pathD, file.name), (errStat, status) => {
          if (errStat) throw errStat;

          if (status.isDirectory()) {
            fs.mkdir(
              path.join(assetsCopyFolder, file.name),
              { recursive: true },
              (err) => {
                if (err) throw err;
              }
            );
            let folder = file.name;
            listObjects(path.join(pathD, file.name), folder);
          } else {
            fs.copyFile(
              path.join(pathD, path.basename(file.name)),
              path.join(assetsCopyFolder, folder, path.basename(file.name)),
              (err) => {
                if (err) throw err;
              }
            );
          }
        });
      }
    });
  }
  listObjects(assetsFolder);

  //   fs.readdir(filesFolder, { withFileTypes: true }, (err, files) => {
  //     files.forEach((file) => {
  //       if (file.isFile()) {
  //         fs.copyFile(
  //           path.join(filesFolder, path.basename(file.name)),
  //           path.join(copyFolder, path.basename(file.name)),
  //           (err) => {
  //             if (err) throw err;
  //           }
  //         );
  //       }
  //     });
  //   });
}

copyDir();

//замена шаблонов в html
