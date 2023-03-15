// const rowID = require("./arrHistory/rowID");
const { db } = require("../model/dbConnection");

const mysqlQuery =
  "SELECT user_history_youtube_id FROM user_history_youtube WHERE subtitleAdd = 'falce' ORDER BY viewe ASC LIMIT 0, 1";

db.query(mysqlQuery, function (err, results) {
  if (err) {
    console.error(err);
  }
  const rowID = Object.values(results[0]);
  console.log(rowID);
  runFunctions(rowID);
});

const {
  abbreviationText,
  addSubtitle,
  countWord,
  textInJson,
} = require("./index");
const sortWord = require("./sort/sort");
const addDB = require("./addInDB/addWordDB");

async function runFunctions(rowID) {
  await addSubtitle(rowID);
  console.log("Function 1");

  await textInJson(rowID);
  console.log("Function 2");

  await abbreviationText(rowID);
  console.log("Function 3");

  await countWord(rowID);
  console.log("Function 4");

  await sortWord(rowID);
  console.log("Function 5");

  await addDB(rowID);
  console.log("Function 6");
}

// runFunctions("_1yar9R7f5w");
