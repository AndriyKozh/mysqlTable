const result = require("../json_subtitle/5DGDv4mQWZc/count_5DGDv4mQWZc.json");
const fs = require("fs");

const myObj = result;
console.log(myObj);

function resultSubtitle(myObj) {
  for (let i = 0; i < myObj.length; i++) {
    const arrRes = myObj[i];
    const arrId = arrRes.titleUrl.slice(32, 47);

    const folderPath = `./json_subtitle/${arrId}`;
    const fileName = "result_5DGDv4mQWZc.json";

    const sortedObj = Object.keys(myObj)
      .sort((a, b) => myObj[b] - myObj[a])
      .reduce((acc, key) => {
        acc[key] = myObj[key];
        return acc;
      }, {});

    const filteredObj = Object.entries(sortedObj).reduce(
      (acc, [key, value]) => {
        if (isNaN(key)) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    fs.writeFile(
      `${folderPath}/${fileName}`,
      JSON.stringify(filteredObj),
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );
  }
}
resultSubtitle(myObj);
console.log(filteredObj);
