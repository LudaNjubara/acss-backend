import { createJsonFile } from "../utils/create-json-file.js";
import { catGen } from "./categories.js";
import { cityGen } from "./cities.js";
import { cardGen } from "./creditCards.js";
import { custGen } from "./customers.js";
import { prodGen } from "./products.js";
import { itemGen } from "./receiptItems.js";
import { rcptGen } from "./receipts.js";
import { sellGen } from "./sellers.js";
import { subCatGen } from "./subCategories.js";

const cityCount = 100;
const custCount = 1000;
const rcptCount = 5000;
const catCount = 20;
const subCatMinCount = 2;
const subCatMaxCount = 5;
const prodMinCount = 10;
const prodMaxCount = 50;
const itemMinCount = 1;
const itemMaxCount = 10;
const qtyMinCount = 1;
const qtyMaxCount = 3;
const sellCount = 4;
const cardCount = 3000;

createJsonFile(cityGen(cityCount), "City");
createJsonFile(custGen(custCount, cityCount), "Customer");

createJsonFile(catGen(catCount), "Category");
const subCats = subCatGen(catCount, subCatMinCount, subCatMaxCount);
createJsonFile(subCats, "SubCategory");
const prods = prodGen(subCats.length, prodMinCount, prodMaxCount);
createJsonFile(prods, "Product");

createJsonFile(sellGen(sellCount), "Seller");

const cards = cardGen(cardCount);
createJsonFile(cards, "CreditCard");

createJsonFile(rcptGen(rcptCount, custCount, sellCount, cards.length), "Bill");
createJsonFile(
  itemGen(rcptCount, prods.length, itemMinCount, itemMaxCount, qtyMinCount, qtyMaxCount),
  "Item"
);
