/////////////////////////////////////////////////////////////////
const youtubedl = require("youtube-dl-exec");
const arrTest = require("./arrHistory/arrTest");
const path = require("path");
const fs = require("fs");
const { abbreviationText } = require("./abbreviation");
const { textInJson } = require("./textInJson");
const { countWord } = require("./countWord");

// const result = require("../natural");

const addSubtitle = (arrTest) => {
  for (let i = 0; i < arrTest.length; i++) {
    const arrRes = arrTest[i];
    const arrId = arrRes.titleUrl.slice(32, 47);
    console.log(arrId);
    const videoUrl = `https://www.youtube.com/watch?v=${arrId}`;
    const folderName = "./src/subtitle/subtitleVTT";
    // const fileName = `${arrId}`;
    // const filePath = path.join(__dirname, folderName, fileName);
    const options = {
      writeSub: true,
      writeAutoSub: true,
      subLang: "ru",
      skipDownload: true,
      output: path.join("./src/subtitle/subtitleVTT", `${arrId}`),
    };

    // Create the folder if it does not exist
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }

    youtubedl(videoUrl, options)
      .then((output) => {
        console.log("Subtitles downloaded:", output);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }
};
module.exports = { addSubtitle };
