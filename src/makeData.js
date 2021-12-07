const catNames = require("cat-names");
const fs = require("fs");

const cats = [];
let j = 1;
let k = 1;
for (let i = 0; i < catNames.all.length; i++) {
  if (j > 25) {
    j = 1;
  }
  if (k > 5) {
    k = 1;
  }
  const cat = {
    id: i + 1,
    name: catNames.all[i],
    age: k.toString(),
    level: j.toString(),
  };
  cats.push(cat);
  j++;
  k++;
}

console.log(cats);

fs.writeFileSync("./data.json", JSON.stringify(cats, null, "\t"));
