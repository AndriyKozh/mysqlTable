const resApp = require("./json_subtitle/allResult/allResult.json");

function allWord(resApp) {
  let spreadObj = {};
  for (let i = 0; i < resApp.length; i++) {
    spreadObj = { ...spreadObj, ...resApp[i] };
  }
  return spreadObj;
}

const addDB = allWord(resApp);
console.log(addDB);
