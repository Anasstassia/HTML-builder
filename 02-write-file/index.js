const { createReadStream, createWriteStream } = require("fs");
const { stdout, stdin } = require("process");
const path = require("path");
const readline = require("readline");
const fs = require("fs");

stdout.write("Привет! Введи что-нибудь:\n");

const pathFile = path.join(__dirname, "textNew.txt");

fs.writeFile(pathFile, "", () => {});
let rl = readline.createInterface(process.stdin, process.stdout);
rl.on("line", (input) => {
  if (input === "exit") {
    process.exit();
  }
  let str = input;
  const stream = createReadStream(pathFile);
  stream.on("data", (chunk) => {
    str = `${chunk.toString()}\n${str}`;
  });

  stream.on("end", () => {
    fs.writeFile(pathFile, str, function (error) {
      if (error) throw error;
    });
  });
});
process.on("exit", () => stdout.write("Всего хорошего!"));
