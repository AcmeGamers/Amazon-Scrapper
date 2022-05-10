const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");

function WriteData(data, file = "amazon.json") {
  fs.writeFile(file, JSON.stringify(data, null, 4), function (err) {
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
      writeData == 1 && WriteData(obtainedData);
      return obtainedData;
    }
  });
}

// scrape(
//   "https://www.amazon.com/Apple-iPhone-12-Pro-Graphite/dp/B09JF5ZHQS/ref=sr_1_1?keywords=iphone&qid=1650875037&sr=8-1"
// );

// Multiple Data Scrapping
async function MultiScrape(links, filename = "amazon.json") {
  const data = await Promise.all(
    links.map(async (link) => {
      fs.appendFileSync(filename, (await scrape(link)) + "\n", { flag: "a" });
    })
  );

  // WriteData(data, filename);
}

var linksList = [];

function getLinks(file) {
  linksList = fs.readFileSync(file, "utf8").split("\n");
  console.log(linksList);
}

getLinks("links.txt");

MultiScrape(linksList);
