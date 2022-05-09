const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");

// Scrap things like name, price, and image from amazon, and save it to a file
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

// request(
//   "https://www.amazon.com/s?k=iphone&ref=nb_sb_noss_2",
//   function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       fs.writeFileSync("amazon.html", body);
//     }
//   }
// );

// function getData(url, callback) {
//   request(url, function (err, response, body) {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, body);
//       // Save response in a file
//       fs.writeFile("index.html", body, function (err) {
//         if (err) {
//           return console.log(err);
//         }
//         console.log("The file was saved!");
//       });
//     }
//   });
// }

// getData("https://www.google.com", function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });
