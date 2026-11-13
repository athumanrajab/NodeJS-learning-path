const fs = require('fs');
const http = require('http'); //It gives us networking capabilities such as building http server
// const url = require("url"); //Depricated package
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

// INFO: ------------------------------FILES---------------------------------
// // NOTE: Blocking, synchronous way of reading and writing data into a file
// // const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// // console.log(textIn);

// // const textOut = `This is what we know about the avocado: ${textIn}`;
// // fs.writeFileSync("./txt/output.txt", textOut);
// // console.log("File has been written!");

// // NOTE: Non-blocking, asynchronous way of reading and writing data into a file
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   console.log(data1);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, (err) => {
//         console.log("File has been written!");
//       });
//     });
//   });
// });

// console.log("Reading file.....");

// INFO: ------------------------------SERVER---------------------------------

// TRICK: using readFileSync() to read data.json file once
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8',
);
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8',
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8',
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data); //convert the json string into javascript object

// NOTE:Using slugify
const slugs = dataObj.map((entry) =>
  slugify(entry.productName, { lower: true }),
);
console.log(slugs);

// Inorder to build a server we need two things, first we create the server and second we start the server so that we can actually listen to incoming request

// TODO: Creating server
const server = http.createServer((req, res) => {
  // NOTE: Old way of routing in NodeJS
  // const { query, pathname } = url.parse(req.url, true);
  // const pathname = req.url;

  // TRICK: Modern WHATWG URL API (replaces deprecated url.parse)
  const baseURL = `http://${req.headers.host}`; //http://localhost:8000/
  const requestURL = new URL(req.url, baseURL);
  const pathname = requestURL.pathname;
  const query = Object.fromEntries(requestURL.searchParams);

  // console.log(req.headers.host); //http://localhost:8000/

  // TODO: Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHTML = dataObj
      .map((entry) => replaceTemplate(templateCard, entry))
      .join('');

    const output = templateOverview.replace('{%productCards%}', cardsHTML);
    res.end(output);
  }
  // TODO: Product page
  else if (pathname === '/product') {
    const product = dataObj[query.id];

    res.writeHead(200, { 'Content-type': 'text/html' });
    const output = replaceTemplate(templateProduct, product);

    res.end(output);
  }
  // TODO: API page
  else if (pathname === '/api') {
    // NOTE: This fs.readFile(), create a problem since each time when a person hit /api, the file is read again and again, so the solution to that is to use readFileSync which asynchronous operation and place the code on the global level so as the file could be read once when the program start
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   // console.log(data); //The type of this data is string
    //   // console.log(typeof data); //string
    //   // console.log(typeof productData); //object
    //   const productData = JSON.parse(data); //convert the json string into javascript object
    //   // console.log(productData);
    //   // Inorder to send the response back (data) to the browser, we need to tell the browser that we are sending back json data
    //   res.writeHead(200, { "Content-type": "application/json" });
    //   // Since res.end() accept the string and not object hence we have to pass in data and not productData
    //   // res.end(productData);
    //   res.end(data);
    // });

    // NOTE: Using data variable to send back the response
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  }
  // TODO: NOT found page
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'Hello world!',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

// TODO: Starting server(Listening for the incoming request)
server.listen(8000, '127.0.0.1', () => {
  console.log('The server has been started!');
});
