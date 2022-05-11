import { getLinks, MultiScrapper } from "./Amazon_Scrapper.js";
import JSONFixer from "./jsonFixer.js";

// For Amazon
// getLinks("links.txt");
// MultiScrapper();

// For victoriamart
getLinks("links.txt");

MultiScrapper(
  ".product_title.entry-title.show-product-nav",
  ".price span bdi",
  "img.woocommerce-main-image",
  "#tab-description"
);

setTimeout(() => {
  JSONFixer();
}, 5000);
