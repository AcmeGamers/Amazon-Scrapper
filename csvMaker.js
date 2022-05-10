const fs = require("fs");

function jsonToCsv(filename = "amazon.json") {
  let data = fs.readFileSync(filename, "utf8"),
    dataArray = JSON.parse(data),
    csv = "";
  for (let i = 0; i < dataArray.length; i++) {
    csv +=
      dataArray[i].name +
      "," +
      dataArray[i].price +
      "," +
      dataArray[i].image +
      "," +
      dataArray[i].description +
      "\n";
  }
  fs.writeFileSync("amazon.csv", csv);
}

jsonToCsv();
