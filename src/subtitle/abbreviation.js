const natural = require("natural");

const fs = require("fs");
const arrHistory = require("./arrHistory/arrTest");

function abbreviationText(arrHistory) {
  for (let i = 0; i < arrHistory.length; i++) {
    const arrRes = arrHistory[i];
    const arrId = arrRes.titleUrl.slice(32, 47);
    console.log(arrId);

    const arr = require(`./json_subtitle/${arrId}/${arrId}.json`);
    const resKey = arr.join(" ");
    console.log("ok");

    //filters only words from subtitles

    // const arrText = resKey.split(" ");
    const input = resKey;

    const regex = /[a-zA-Zа-яА-Я]+/g;

    const words = input.match(regex);

    const stemmer = natural.PorterStemmerRu;

    const stems = words.map((word) => stemmer.stem(word));
    console.log(stems); // Output: ['AeBo4K', ' ABO4K', 'ABO4K', AeBO4K

    fs.writeFile(
      `./src/subtitle/json_subtitle/${arrId}/next_${arrId}.json`,
      JSON.stringify(stems),
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );
  }
}

// abbreviationText(arrHistory);

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
