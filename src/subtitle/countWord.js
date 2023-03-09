const natural = require("natural");
const fs = require("fs");
const tokenizer = new natural.WordTokenizer();
const arrHistory = require("./arrHistory/arrTest");

function countWord(arrHistory) {
  for (let i = 0; i < arrHistory.length; i++) {
    const arrRes = arrHistory[i];
    const arrId = arrRes.titleUrl.slice(32, 47);

    const resultSubtitle = require(`./json_subtitle/${arrId}/next_${arrId}.json`);
    // console.log(resultSubtitle);

    const stemmer = natural.PorterStemmer;
    const folderPath = `./src/subtitle/json_subtitle/${arrId}`;
    const fileName = `count_${arrId}.json`;
    const folderPathAll = `./src/subtitle/json_subtitle/allResult`;
    const fileNameAll = "allResult.json";

    const text = resultSubtitle.join(" ");

    // Tokenize the text into individual words
    const tokens = tokenizer.tokenize(text);

    // Generate stems for each word
    const stems = tokens.map((token) => stemmer.stem(token));

    // Count unique stems and their frequency of occurrence
    const stemCounts = stems.reduce((counts, stem) => {
      if (counts[stem]) {
        counts[stem]++;
      } else {
        counts[stem] = 1;
      }
      return counts;
    }, {});

    // console.log(stemCounts);

    const stemFrequencies = stems.reduce((freqs, stem) => {
      freqs[stem] = (freqs[stem] || 0) + 1;
      return freqs;
    }, {});

    fs.writeFile(
      `${folderPath}/${fileName}`,
      JSON.stringify(stemFrequencies),
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );
    fs.appendFile(
      `${folderPathAll}/${fileNameAll}`,
      `${JSON.stringify(stemFrequencies) + ","}`,
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );
  }
}
// countWord(arrHistory);

module.exports = countWord;
// const fs = require("fs");

// const folderName = "exampleFolder";
// const fileName = "exampleFile.txt";
// const fileContents = "This is an example file.";

// // Create the folder
// fs.mkdir(folderName, (err) => {
//   if (err) throw err;
//   console.log("Folder created successfully.");

//   // Save the file to the folder
//   fs.writeFile(`${folderName}/${fileName}`, fileContents, (err) => {
//     if (err) throw err;
//     console.log("File saved successfully.");
//   });
// });
