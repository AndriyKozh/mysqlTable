const arrTest = require("./arrHistory/arrTest");

const {
  abbreviationText,
  addSubtitle,
  countWord,
  textInJson,
} = require("./index");

setTimeout(() => {
  addSubtitle(arrTest);
  console.log("Function 1");
});

setTimeout(() => {
  textInJson(arrTest);
  console.log("Function 2");
}, 6000);

setTimeout(() => {
  abbreviationText(arrTest);
  console.log("Function 3");
}, 8000);

setTimeout(() => {
  countWord(arrTest);
  console.log("Function 4");
}, 10000);
