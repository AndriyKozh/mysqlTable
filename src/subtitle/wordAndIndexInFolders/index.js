const fs = require("fs");
const { db } = require("../../model/dbConnection");
lastId = null;

setInterval(() => {
  const mysqlQuery =
    "SELECT user_history_youtube_id FROM user_history_youtube WHERE statusWord = 'false' AND statusSub='subtitleSaved'  ORDER BY viewes DESC";

  db.query(mysqlQuery, function (err, results) {
    if (err) {
      console.error(err);
      return;
    }
    if (results.length > 0) {
      const rowID = Object.values(results[0]);
      if (rowID !== lastId) {
        console.log(rowID);
        frequency(rowID);
        lastId = rowID;
      }
    }
  });
}, 1000);

function frequency(objWords) {
  const sqlQuery =
    "UPDATE user_history_youtube SET statusWord=? WHERE user_history_youtube_id=?";
  db.query(sqlQuery, [1, objWords], (err, result) => {
    if (err) {
      console.log(err);
      // reject(err);
    }
    console.log(result);
  });
  const objWord = require(`../json_subtitle/${objWords}/count_${objWords}.json`);
  const arrays = Object.keys(objWord);
  console.log(arrays);
  function createDir(path) {
    const parts = path.split("/");
    const filename = parts.pop() + ".txt";
    for (let i = 1; i <= parts.length; i++) {
      const subPath =
        "./src/subtitle/wordAndIndexInFolders/" + parts.slice(0, i).join("/");
      console.log(subPath);
      if (!fs.existsSync(subPath)) {
        fs.mkdirSync(subPath);
      }
    }
    const filePath =
      "./src/subtitle/wordAndIndexInFolders/" +
      parts.join("/") +
      "/" +
      filename;
    // console.log(filePath);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `"${objWords}",`);
    } else {
      fs.appendFileSync(filePath, `"${objWords}",`);
    }
  }
  for (const word of arrays) {
    createDir(word.split("").join("/"));
  }
}
// frequency("ZwCyCron4a4");
