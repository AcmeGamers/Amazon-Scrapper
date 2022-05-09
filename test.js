const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");

function WriteData(file, data) {
  fs.writeFile(file, JSON.stringify(data, null, 4), function (err) {
    console.log("File successfully written!");
  });
}

function scrape(url, file) {
  request(url, function (error, response, html) {
    if (!error) {
      let $ = cheerio.load(html, {
          normalizeWhitespace: true,
        }),
        name = $("#productTitle").text(),
        price = $(".priceBlock .price").text(),
        image = $(".imgTagWrapper img").attr("src"),
        description = $("#feature-bullets").html(),
        data = {
          name: name,
          price: price,
          image: image,
          description: description,
        };
      WriteData(file, data);
    }
  });
}

scrape(
  "https://www.amazon.com/Apple-iPhone-12-Pro-Graphite/dp/B09JF5ZHQS/ref=sr_1_1?keywords=iphone&qid=1650875037&sr=8-1",
  "amazon.json"
);

// Multiple Data Scrapping
function MultiScrape(url, file) {
  for (let i = 0; i < url.length; i++) {
    scrape();
  }
}
