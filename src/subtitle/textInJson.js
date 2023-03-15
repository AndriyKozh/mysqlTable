const fs = require("fs");
const natural = require("natural");
const arrHistory = require("./arrHistory/arrTest");

const textInJson = (arrHistory) => {
  return new Promise((resolve, reject) => {
    const vttFilePath = `./src/subtitle/subtitleVTT/${arrHistory}.ru.vtt`;

    const folderPath = "./src/subtitle/json_subtitle";
    const fileName = `./${arrHistory}/${arrHistory}.json`;
    const folderName = `./src/subtitle/json_subtitle/${arrHistory}`;
    const a = [];

    fs.readFile(vttFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error:", err);
        reject(err);
        return;
      }
      const vttString = data;
      a.push(vttString);
      console.log(a);

      // Create the folder
      fs.mkdir(folderName, (err) => {
        if (err) {
          console.error("Error:", err);
          reject(err);
          return;
        }
        console.log("Folder created successfully.");

        // Write the `a` variable to a new file
        fs.writeFile(`${folderPath}/${fileName}`, JSON.stringify(a), (err) => {
          if (err) {
            console.error("Error:", err);
            reject(err);
          } else {
            console.log("The file has been saved!");
            resolve();
          }
        });
      });
    });
  });
};

module.exports = textInJson;
