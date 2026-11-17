const fs = require("fs");
const http = require("http");

const server = http.createServer();

// Suppose we want to read a huge file

server.on("request", (req, res) => {
  // Solution 1: Simplest solution (readFile())
  // NOTE: The main problem with this solution is that, node will try to read the entire file into the variable, and then the variable is stored  into the memory so that it can send back the data to the cient as response
  // fs.readFile("./test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // Solution 2: streams
  // NOTE: here we are streaming the file in such a way that we read one piece of the file, and as soon as the data will be available by that time will be send back to client using the write() of the response stream and when the next piece of data is available it will be send back to the client all the way untill the entire file is finished

  // NOTE: The main problem with this solution is that, our readable stream is much much faster actually  than sending the result with the response writebale stream over the network , this will overwhelm the response stream which can not handle all the incoming data so fast and that problem is called back pressure
  // Back pressure happen when the response can not send data nearly as fast as receiving it from the file
  // const readableStream = fs.createReadStream("./test-file.txt"); //Creating a readble stream
  // Since the readable stream has `data` event which is Emitted whenever a new piece (chunk) of data is available to consume.
  // Then we can listen to that event
  // readableStream.on("data", (chunk) => {
  //   res.write(chunk);
  // });

  // // Handling event when all data is read (when the stream is finished reading all data from the file)
  // // Since the readable stream has `end` event which is Emitted when there is no more data left to read from the stream.
  // // Then we can listen to that event
  // readableStream.on("end", () => {
  //   res.end(); //here the response is also a stream (writable stream) , so the end() method signal that no more data will be written to this writtable stream
  // });

  // // We can also written for the error event and handle the error whenever it happen
  // readableStream.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found!");
  // });

  // Solution 3: The solution here is to use the pipe operator, this is available on all readable stream and it allow us to pipe the output of the readable stream into the input of writable stream
  const readableStream = fs.createReadStream("./test-file.txt");
  readableStream.pipe(res); //here the res is the writable stream
  // readableSource.pipe(writeableDestination)
});

// Starting the server
server.listen(8000, "127.0.0.1", () => {
  console.log("The server has been started....");
});

// Use module.exports to export one single variable eg one class or one function
// Use exports to export multiple named variables
