const fs = require("fs");

function jsonToCsv(filename = "amazon.json") {
  let data = fs.readFileSync(filename, "utf8"),
    dataArray = JSON.parse(data),
    csv = "",
    headers = Object.keys(dataArray[0]),
    headersString = headers.join(","),
    rows = dataArray.map(function (row) {
      return Object.values(row).join(",");
    });
  csv = headersString + "\n" + rows.join("\n");
  fs.writeFileSync("amazon.csv", csv);
}

jsonToCsv();
