const mysql2 = require("mysql2");

require("dotenv").config();

const arrHistory = require("../array/arrHistory");

const { HOST, USER, DATABASE, PASSWORD } = process.env;

const conection = mysql2.createConnection({
  host: HOST,
  user: "root",
  database: DATABASE,
  password: PASSWORD,
});

//===================== table connection ============  watch_history - table =========

conection.connect(function (err) {
  if (err) {
    return console.error("помилка" + err.message);
  } else {
    console.log("підключення успішне");
  }
});

// conection.execute(
//   "SELECT * FROM user_history_youtube",
//   function (err, results) {
//     console.log(err);
//     console.log(results);
//   }
// );

// ================ ADD LINE INFO_HISTORY ==================

const history = [];

function resultArr(arrHistory) {
  for (let i = 0; i < arrHistory.length; i++) {
    const arrIndx = arrHistory[i];

    const titleUrl = arrIndx.titleUrl;
    // console.log(titleUrl);

    const time = arrIndx.time.split("");
    const timeOne = time.splice(10, 1, " ");
    const timeTwo = time.join("");
    const dateWathVideo = timeTwo.slice(0, 18);

    const titles = arrIndx.title;
    const titleVideo = titles.slice(18);

    if (titleUrl) {
      const id = titleUrl?.slice(32, 47);
      history.push([id, titleVideo, titleUrl, dateWathVideo, i]);
    } else {
      continue;
    }
  }
  for (let i = 0; i < history.length; i++) {
    const a = history[i];
    console.log(a);

    // const sql =
    //   "INSERT INTO user_history_youtube (user_history_youtube_id, title, titleUrl, timeDate, list) VALUE (?,?,?,?,?)"; // watch_history - table

    // conection.execute(sql, a, function (err) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log("УСПІШНО ДОБАВЛЕНО");
    //   }
    // });
  }
}

resultArr(arrHistory);
