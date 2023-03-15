const { rejects } = require("assert");
const mysql2 = require("mysql2");
const { resolve } = require("path");
const arrayWords = require("../json_subtitle/allResult/test.json");
require("dotenv").config();

const { HOST, USER, DATABASE, PASSWORD } = process.env;

const conection = mysql2.createConnection({
  host: HOST,
  user: "root",
  database: DATABASE,
  password: PASSWORD,
});

// function allWord(resApp) {
//   let spreadObj = {};
//   for (let i = 0; i < resApp.length; i++) {
//     spreadObj = { ...spreadObj, ...resApp[i] };
//   }
//   return spreadObj;
// }

// const addDB = [allWord(arrayWords)];

// const result = Object.entries(addDB[0]).map(([key, value]) => [key, value]);

// console.log(addDB);

// const arrHistory = require("../array/arrHistory");

//===================== table connection ============  watch_history - table =========

// conection.connect(function (err) {
//   if (err) {
//     return console.error("помилка" + err.message);
//   } else {
//     console.log("підключення успішне");
//   }
// });

// conection.execute("SELECT * FROM words", function (err, results) {
//   console.log(err);
//   console.log(results);
// });

// ================ ADD LINE INFO_HISTORY ==================

function addDB(objWord) {
  return new Promise((resolve, reject) => {
    const arrId = require(`../json_subtitle/${objWord}/count_${objWord}.json`);

    const arrOne = Object.entries(arrId);

    console.log(arrOne);

    for (let i = 0; i < arrOne.length; i++) {
      const arrIndx = arrOne[i];
      console.log(typeof arrIndx[0]);

      const sql = `INSERT INTO words (words, num_repetitions)
  VALUES ('${arrIndx[0]}', ${arrIndx[1]})
  ON DUPLICATE KEY UPDATE num_repetitions = num_repetitions + ${arrIndx[1]};`;

      conection.execute(sql, arrIndx, function (err) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("УСПІШНО ДОБАВЛЕНО");
          resolve();
        }
      });
    }
  });
}

module.exports = addDB;
