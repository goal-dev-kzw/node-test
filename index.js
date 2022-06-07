const http = require("http");
const url = require("url");
const fs = require("fs");

const replaceTemplate = (temp, fruit) => {
  let output = temp.replace(/{%FRUIT%}/g, fruit.fruit);
  output = output.replace(/{%NUTRITOUS%}/g, fruit.nutritous);
  output = output.replace(/{%PRICE%}/g, fruit.price);
  output = output.replace(/{%DESCRIPTION%}/g, fruit.description);
  output = output.replace(/{%ID%}/g, fruit.id);
  if (!fruit.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const tempFruit = fs.readFileSync(
  `${__dirname}/templates/fruit-detail.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/fruit-card.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const app = http.createServer((req, res) => {
  // const pathName = req.url;
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace(/{%FRUIT_CARDS%}/g, cardHtml);
    // console.log(cardHtml);
    res.end(output);
  } else if (pathname === "/fruit") {
    const fruit = dataObj[query.id];
    const output = replaceTemplate(tempFruit, fruit);
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(output);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>404 Error</h1>");
  }
});

app.listen(8000, () => {
  console.log("Server is running");
});
