const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");

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
      fs.writeFile(file, JSON.stringify(data, null, 4), function (err) {
        console.log("File successfully written!");
      });
    }
  });
}

scrape(
  "https://www.amazon.com/Apple-iPhone-12-Pro-Graphite/dp/B09JF5ZHQS/ref=sr_1_1?keywords=iphone&qid=1650875037&sr=8-1",
  "amazon.json"
);
