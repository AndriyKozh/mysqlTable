const fs = require("fs");
const natural = require("natural");
const arrHistory = require("./arrHistory/arrTest");

function textInJson(arrHistory) {
  for (let i = 0; i < arrHistory.length; i++) {
    const arrRes = arrHistory[i];
    const arrId = arrRes.titleUrl.slice(32, 47);
    console.log(arrId);

    const vttFilePath = `./src/subtitle/subtitleVTT/${arrId}.ru.vtt`;

    const folderPath = "./src/subtitle/json_subtitle";
    const fileName = `./${arrId}/${arrId}.json`;
    const folderName = `./src/subtitle/json_subtitle/${arrId}`;
    const a = [];
    fs.readFile(vttFilePath, "utf8", (err, data) => {
      if (err) throw err;
      const vttString = data;
      // const stemCounts = stemAndCount(vttString);
      a.push(vttString);
      console.log(a);

      // Create the folder
      fs.mkdir(folderName, (err) => {
        if (err) throw err;
        console.log("Folder created successfully.");
      });

      // Write the `a` variable to a new file
      fs.writeFile(`${folderPath}/${fileName}`, JSON.stringify(a), (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
    });
  }
}
// textInJson(arrHistory);

module.exports = { textInJson };
