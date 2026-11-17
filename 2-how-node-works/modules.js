// console.log(arguments); //arguments is an array in javascript, and this array contain all the values that we are passing to the function, so if we log arguments to the console and see some values there, that means we are in functioon
// This proves to us that, all the codes that are in module are wrapped in a wrapper function that's why we have access to some values as shown on the console

// Lets log the wrapper function
// const wrapperFunction = require("module").wrapper;
// console.log(wrapperFunction);

// module.exports
const Calculator = require("./test-module-1");
const calc1 = new Calculator();
console.log(calc1.add(2, 3));
console.log(calc1.multiply(2, 3));
console.log(calc1.divide(4, 2));

// exports
// const calc2 = require("./test-module-2");
// console.log(calc2.add(2, 4));
// console.log(calc2.multiply(4, 2));
// console.log(calc2.divide(8, 2));

// We can also use object destructuring to automatically create variables
const { add, multiply, divide } = require("./test-module-2");
console.log(add(2, 4));
console.log(multiply(4, 2));
console.log(divide(8, 2));

// Caching
require("./test-module-3")(); //Here the result of require is to return the function  that is defined in the module, this is because in the module we only export the function, after the function is returned we call it immediately
require("./test-module-3")();
require("./test-module-3")();
// So due to caching in NodeJS, the module is only executed once and be cached... that's why after require the same module multiple time the top level code is only executed once, while the function will be printed multiple time because they will be retrieved from the cache
