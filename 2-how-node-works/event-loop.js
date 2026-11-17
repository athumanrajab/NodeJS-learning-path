const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();

// NOTE: Configuring the size of the threadpool
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => console.log("Timer 1 finished!"), 0);

setImmediate(() => console.log("Immediate 1 finished !"));

fs.readFile("./test-file.txt", "utf-8", () => {
  console.log("I/O finished!");

  console.log(
    "-------------Calls that are orchestrated by event loop------------------",
  );

  setTimeout(() => console.log("Timer 2 finished!"), 0);
  setTimeout(() => console.log("Timer 3 finished!"), 3000);

  setImmediate(() => console.log("Immediate 2 finished !"));
  process.nextTick(() => {
    console.log("process.nextTick");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted!");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted!");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted!");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted!");
  });
});

console.log("Hello from top level code!");
