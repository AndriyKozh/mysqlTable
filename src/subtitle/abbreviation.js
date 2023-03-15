const natural = require("natural");

const fs = require("fs");
const arrHistory = require("./arrHistory/arrTest");

const abbreviationText = (arrHistory) => {
  return new Promise((resolve, reject) => {
    const arr = require(`./json_subtitle/${arrHistory}/${arrHistory}.json`);
    const resKey = arr.join(" ");

    //filters only words from subtitles

    // const arrText = resKey.split(" ");
    const input = resKey;

    const regex = /[a-zA-Zа-яА-Я]+/g;

    const words = input.match(regex);

    const stemmer = natural.PorterStemmerRu;

    const stems = words.map((word) => stemmer.stem(word));
    console.log(stems); // Output: ['AeBo4K', ' ABO4K', 'ABO4K', AeBO4K

    fs.writeFile(
      `./src/subtitle/json_subtitle/${arrHistory}/next_${arrHistory}.json`,
      JSON.stringify(stems),
      (err) => {
        if (err) {
          console.error("Error:", err);
          reject(err);
        } else {
          console.log("The file has been saved!");
          resolve();
        }
      }
    );
  });
};

module.exports = abbreviationText;

//////////////////////////////////////////////////////////////////////

//витягує всі кириличні символи
// const cyrillicRegex = /[\u0400-\u04FF]/g;
// const filteredArr = resKey.replace(cyrillicRegex, "");
// console.log(filteredArr);

// залишає все крім кирилиці

// const nonCyrillicRegex = /[^\u0400-\u04FF]/gi;
// const filteredArr = resKey.replace(nonCyrillicRegex, "");
// console.log(filteredArr);
