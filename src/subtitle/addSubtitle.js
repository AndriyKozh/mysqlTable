/////////////////////////////////////////////////////////////////
const youtubedl = require("youtube-dl-exec");
const arrTest = require("./arrHistory/arrTest");
const path = require("path");
const fs = require("fs");
const { db } = require("../model/dbConnection");

const addSubtitle = (arrTest) => {
  return new Promise((resolve, reject) => {
    const videoUrl = `https://www.youtube.com/watch?v=${arrTest}`;
    const folderName = "./src/subtitle/subtitleVTT";

    const options = {
      writeSub: true,
      writeAutoSub: true,
      subLang: "ru",
      skipDownload: true,
      output: path.join("./src/subtitle/subtitleVTT", `${arrTest}`),
    };

    // Create the folder if it does not exist
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }

    youtubedl(videoUrl, options)
      .then((output) => {
        console.log("Subtitles downloaded:", output);
        // video subtitles processed
        const sqlQuery =
          "UPDATE user_history_youtube SET subtitleAdd=? WHERE user_history_youtube_id=?";
        db.query(sqlQuery, [1, arrTest], (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        });
      })
      .catch((err) => {
        console.error("Error:", err);
        reject(err);
      });
  });
};
// addSubtitle(arrTest);
module.exports = addSubtitle;
