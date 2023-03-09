/////////////////////////////////////////////////////////////////
const youtubedl = require("youtube-dl-exec");
const arrTest = require("./arrHistory/arrTest");
const path = require("path");
const fs = require("fs");
const { db } = require("../model/dbConnection");

const addSubtitle = (arrTest) => {
  for (let i = 0; i < arrTest.length; i++) {
    // download the file with subtitles in vtt format

    const arrRes = arrTest[i];
    const arrId = arrRes.titleUrl.slice(32, 47);
    console.log(arrId);
    const videoUrl = `https://www.youtube.com/watch?v=${arrId}`;
    const folderName = "./src/subtitle/subtitleVTT";

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
    // video subtitles processed
    const sqlQuery =
      "UPDATE user_history_youtube SET subtitleAdd=? WHERE user_history_youtube_id=?";
    db.query(sqlQuery, ["true", arrId], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  }
};

module.exports = addSubtitle;
