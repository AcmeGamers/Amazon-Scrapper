const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");

// Author: Acme Gamers
// URL: https://github.com/AcmeGamers/Amazon-Scrapper

// -----------------
// Table of Contents
// -----------------
// - Writing Data
// - Scraping Single Response
// - Obtaining Links from a File
// - Scraping Multi Responses
// -----------------

//
//
//

// ------------
// Writing Data
// ------------

function WriteData(data, writeLevel = 1, file = "amazon.json") {
  writeLevel == 1 &&
    fs.writeFile(file, JSON.stringify(data, null, 4), function (err) {
      console.log("File successfully written!");
    });

  writeLevel == 2 &&
    fs.appendFile(file, JSON.stringify(data, null, 4), function (err) {
      console.log("Data is appended!");
    });
}

// ------------------------
// Scraping Single Response
// ------------------------
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

// ---------------------------
// Obtaining Links from a File
// ---------------------------

var linksList = [];

function getLinks(file) {
  linksList = fs.readFileSync(file, "utf8").split("\n");
  console.log(linksList);
}

getLinks("links.txt");

// ------------------------
// Scraping Multi Responses
// ------------------------
function MultiScrapper() {
  for (let i = 0; i < linksList.length; i++) {
    scrape(linksList[i], 2);
  }
}
MultiScrapper();
