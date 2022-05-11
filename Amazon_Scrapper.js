import request from "request";
import fs from "fs";
import cheerio from "cheerio";

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
async function scrape(
  url,
  writeData = 1,
  productName = "#productTitle",
  productPrice = ".priceBlock .price",
  productImage = ".imgTagWrapper img",
  productDescription = "#feature-bullets:not(h1)"
) {
  await request(url, function (error, response, html) {
    if (!error) {
      let $ = cheerio.load(html, {
          normalizeWhitespace: true,
        }),
        name = $(productName).text(),
        price = $(productPrice).text(),
        image = $(productImage).attr("src"),
        description = $(productDescription).html(),
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
  linksList = [];
  linksList = fs.readFileSync(file, "utf8").split("\n");
  console.log(linksList);
}

// ------------------------
// Scraping Multi Responses
// ------------------------
function MultiScrapper(
  productName = "#productTitle",
  productPrice = ".priceBlock .price",
  productImage = ".imgTagWrapper img",
  productDescription = "#feature-bullets:not(h1)"
) {
  for (let i = 0; i < linksList.length; i++) {
    scrape(
      linksList[i],
      2,
      productName,
      productPrice,
      productImage,
      productDescription
    );
  }
}

export { scrape, getLinks, MultiScrapper };
