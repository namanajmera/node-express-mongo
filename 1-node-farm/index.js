const fs = require('fs');

/* const textIn = fs.readFileSync('./txt/input.txt','utf-8');

console.log(textIn);

const testOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',testOut);

console.log("Write it on the output.txt");
 */
fs.readFile('./txt/start.txt','utf-8',(err2,data1) => {
    fs.readFile(`./txt/${data1}.txt`,'utf-8',(err2,data2) => {
        console.log(data2);
    })
})

console.log("Reading File .....")