const fs = require("fs");
const path = require("path");
const { createReadStream, createWriteStream } = require("fs");
const { copyFile } = require("fs/promises");

const componentsFolder = path.join(__dirname, "/components");
const templateFolder = path.join(__dirname, "/project-dist");
const bundleCssFilePath = path.join(__dirname, "/project-dist/style.css");
const bundleHtmlFilePath = path.join(__dirname, "/project-dist/index.html");
const stylesFolder = path.join(__dirname, "/styles");
const templateFile = path.join(__dirname, "/template.html");
const assetsFolder = path.join(__dirname, "/assets");
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
