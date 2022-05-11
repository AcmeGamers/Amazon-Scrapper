import { getLinks, MultiScrapper } from "./Amazon_Scrapper.js";
import JSONFixer from "./jsonFixer.js";

// For Amazon
// getLinks("links.txt");
// MultiScrapper();

// For victoriamart
getLinks("links.txt");

MultiScrapper();

setTimeout(() => {
  JSONFixer();
}, 5000);
