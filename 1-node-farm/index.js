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

const filesData = fs.readFileSync("./dev-data/data.json", "utf8");

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("Hello From Overview Page");
  } else if (pathName === "/product") {
    res.end("Hello from Product Page");
  } else if (pathName === "/api") {
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
  console.log("Listening to request on port 8000");
});
