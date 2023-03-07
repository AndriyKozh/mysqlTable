const arrTest = require("./arrHistory/arrTest");

const { addSubtitle } = require("./addSubtitle");
const { abbreviationText } = require("./abbreviation");
const { textInJson } = require("./textInJson");
const { countWord } = require("./countWord");

setTimeout(() => {
  addSubtitle(arrTest);
  console.log("1111111111111111111111111111111111111111111111111");
});

setTimeout(() => {
  textInJson(arrTest);
  console.log("2222222222222222222222222222222222222222222222222");
}, 6000);

setTimeout(() => {
  abbreviationText(arrTest);
  console.log("333333333333333333333333333333");
}, 8000);

setTimeout(() => {
  countWord(arrTest);
  console.log("444444444444444444444444444444444444444444");
}, 10000);
