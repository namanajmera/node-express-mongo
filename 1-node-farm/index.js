const fs = require("fs");
const http = require("http");
const url = require("url");

// # FILES
/* const textIn = fs.readFileSync('./txt/input.txt','utf-8');

console.log(textIn);

const testOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',testOut);

console.log("Write it on the output.txt");
 */
/* fs.readFile('./txt/start.txt','utf-8',(err2,data1) => {
    fs.readFile(`./txt/${data1}.txt`,'utf-8',(err2,data2) => {
        console.log(data2);

        fs.writeFile('./txt/final.txt',`${data2}\n${data1}`,err => {
            console.log('Your file has been written.')
        })
    })
})

console.log("Reading File .....") */

// SERVER
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(
    /{%ORGANIC%}/g,
    !product.organic ? "not-organic" : ""
  );
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  return output;
};

const filesData = fs.readFileSync("./dev-data/data.json", "utf8");
const dataObj = JSON.parse(filesData);
const templateOverview = fs.readFileSync(
  "./templates/template-overview.html",
  "utf8"
);
const templateCard = fs.readFileSync("./templates/template-card.html", "utf8");
const product = fs.readFileSync("./templates/product.html", "utf8");

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  const id = Number(query.id);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardHTML = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join("");

    const output = templateOverview.replace("{%PRODUCT_CARD%}", cardHTML);

    res.end(output);
  } else if (pathname === `/product`) {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const currentData = dataObj.filter((el) => el.id === id)[0];

    const output = replaceTemplate(product, currentData);

    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(filesData);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page NOT Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`The serve is running on 127.0.0.1:8000`);
  console.log("Listening to request on port 8000");
});
