const youtubedl = require("youtube-dl-exec");
// const arrTest = require("./arrHistory/arrTest");
const path = require("path");
const fs = require("fs");
const langdetect = require("langdetect");

const { db } = require("../model/dbConnection");

const addSubtitle = (arrTest) => {
  return new Promise((resolve, reject) => {
    const mysqlQuery = `SELECT language FROM user_history_youtube WHERE user_history_youtube_id = "${arrTest}";`;
    db.query(mysqlQuery, function res(err, result) {
      if (err) {
        console.log(err);
      }
      languageRes(result[0].language);
    });

    function languageRes(resultDb) {
      const myString = `${resultDb}`;
      // Call the detect() function to detect the language of the string
      // const detectedLanguage = langdetect.detect(myString);
      // // Log the detected language code to the console
      // const languageRes = detectedLanguage[0].lang;

      const videoUrl = `https://www.youtube.com/watch?v=${arrTest}`;
      const folderName = "./src/subtitle/subtitleVTT";

      const options = {
        writeSub: true,
        writeAutoSub: true,
        subLang: `${resultDb}`,
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
              // console.log(result);
              resolve(result);
            }
          });
        })
        .catch((err) => {
          console.error("Error:", err);
          reject(err);
        });
    }
  });
};

//test function
// addSubtitle("OJfzVAFW9eo");
module.exports = addSubtitle;
