const EventEmitter = require("events"); //This is like a class in which we can create some new object/instance from it

// const myEmitter = new EventEmitter(); //EventEmitter can emit named event and we can subscribe to this event(listen and react to those event)

// NOTE: The best practice is to create a class which will extends the EventEmitter class
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

// Creating instance from a Sales class
const myEmitter = new Sales();

// Listen for the "newSale" event, it is like clicking the button on the DOM element so as we can listen for a click event
// use .on() to listen for event, these are observer
myEmitter.on("newSale", () => {
  console.log("There is a new sale!");
});
// We can also listen for the same event multiple times
myEmitter.on("newSale", () => {
  console.log("Customer name: Purcell");
});
// Listener which accept the argument parsed in the emiter object
myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in a stock`);
});

// use .emit(), to emit the event, we can also parsing argument on the emiter so as it can be used by other listener
myEmitter.emit("newSale", 10);

// NOTE: Use this approach when you want to manually emit custom event

// ---------------More Examples------------------
const http = require("http");

const server = http.createServer();

//Registering listen that will listen for multiple events
server.on("request", (req, res) => {
  console.log("Request received");
  res.end("Request Received!");
});

server.on("request", (req, res) => {
  console.log("Another Request 😃");
});

// Listen for the close event/ when the server is close
server.on("close", () => {
  console.log("The server is down");
});

// Starting the server
server.listen(8000, "127.0.0.1", () => {
  console.log("The server has been started....");
});

// NOTE: Most of built-in Node module emit event automatically since some of them they inherit from EventEmitter class
