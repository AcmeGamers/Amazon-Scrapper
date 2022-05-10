const fs = require("fs");
function JSONFixer(filename = "amazon.json") {
  let data = fs.readFileSync(filename, "utf8"),
    dataArray = data.split("}").join("},") + "}",
    dataArray2 = dataArray.split("},}").join("}"),
    dataArray3 = ["[" + dataArray2 + "]"];
  fs.writeFileSync(filename, dataArray3.toString());
}

JSONFixer();
