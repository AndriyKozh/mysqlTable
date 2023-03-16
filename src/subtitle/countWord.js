const natural = require("natural");
const fs = require("fs");
const tokenizer = new natural.WordTokenizer();

function countWord(arrHistory) {
  return new Promise((resolve, reject) => {
    const resultSubtitle = require(`./json_subtitle/${arrHistory}/next_${arrHistory}.json`);
    const stemmer = natural.PorterStemmer;
    const folderPath = `./src/subtitle/json_subtitle/${arrHistory}`;
    const fileName = `count_${arrHistory}.json`;
    const folderPathAll = `./src/subtitle/json_subtitle/allResult`;
    const fileNameAll = "allResult.json";

    const text = resultSubtitle.join(" ");

    // Tokenize the text into individual words
    const tokens = tokenizer.tokenize(text);

    // Generate stems for each word
    const stems = tokens.map((token) => stemmer.stem(token));

    const stemFrequencies = stems.reduce((freqs, stem) => {
      freqs[stem] = (freqs[stem] || 0) + 1;
      return freqs;
    }, {});

    const dividedFrequencies = {};

    Object.entries(stemFrequencies).map(([key, value]) => {
      dividedFrequencies[key] = Math.ceil(value / 3);
    });

    // console.log(dividedFrequencies);

    fs.writeFile(
      `${folderPath}/${fileName}`,
      JSON.stringify(dividedFrequencies),
      (err) => {
        if (err) {
          reject(err);
        } else {
          console.log("The file has been saved!");
          resolve();
        }
      }
    );

    fs.appendFile(
      `${folderPathAll}/${fileNameAll}`,
      `${JSON.stringify(dividedFrequencies) + ","}`,
      (err) => {
        if (err) {
          reject(err);
        } else {
          console.log("The file has been saved!");
          resolve();
        }
      }
    );
  });
}

module.exports = countWord;
