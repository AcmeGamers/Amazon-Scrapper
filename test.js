const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");

function WriteData(data, writeLevel, file = "amazon.json") {
  // normal writing
  fs.writeFile(file, JSON.stringify(data, null, 4), function (err) {
    console.log("File successfully written!");
  });

  // writing to a file with append
  writeLevel == 2 &&
    fs.appendFile(file, JSON.stringify(data, null, 4), function (err) {
      console.log("File successfully written!");
    });
}

async function scrape(url, writeData = 1) {
  await request(url, function (error, response, html) {
    if (!error) {
      let $ = cheerio.load(html, {
          normalizeWhitespace: true,
        }),
        name = $("#productTitle").text(),
        price = $(".priceBlock .price").text(),
        image = $(".imgTagWrapper img").attr("src"),
        description = $("#feature-bullets").html(),
        obtainedData = {
          name: name,
          price: price,
          image: image,
          description: description,
        };
      writeData != 0 && WriteData(obtainedData, writeData);

      return obtainedData;
    }
  });
}

// scrape(
//   "https://www.amazon.com/Apple-iPhone-12-Pro-Graphite/dp/B09JF5ZHQS/ref=sr_1_1?keywords=iphone&qid=1650875037&sr=8-1"
// );

// Multiple Data Scrapping

async function MultiScrape(links, filename = "amazon.json") {
  let data = [];
  await Promise.allSettled(
    await links.map((link) => {
      data.push(scrape(link));
    })
  ).then(() => {
    console.log(data);
    WriteData(data, filename);
  });
}

var linksList = [];

function getLinks(file) {
  linksList = fs.readFileSync(file, "utf8").split("\n");
  console.log(linksList);
}

getLinks("links.txt");

// MultiScrape(linksList);
for (let i = 0; i < linksList.length; i++) {
  scrape(linksList[i], 2);
}
