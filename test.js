const request = require("request");
const fs = require("fs");

// 


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
