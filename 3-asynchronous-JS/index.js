const fs = require('fs');
const superagent = require('superagent');
const { reject } = require('superagent/lib/request-base');

// NOTE: callback hell
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   // Making an http request by using superagent which is the third part npm module
//   // To get the data  we should chain get() with .end() since it accept two argument which is err and res
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);

//       // Add another callback function that will use fs to save the response message from the body to the dog-img.txt
//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image is saved to file!');
//       });
//     });
// });

// NOTE: Escaping callback hell by using promise
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   // Making an http request by using superagent which is the third part npm module
//   // Since we are going to use promise so to get the data  we should chain get() which return promise with .then() so as to consume the promise
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       // Add another callback function that will use fs to save the response message from the body to the dog-img.txt
//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image is saved to file!');
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

// NOTE: Builing Promise
// Lets build a function that will return a promise after reading a file
const readFilePromise = function (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('Opps 💩! I could not find a file!');
      resolve(data);
    });
  });
};

const writeFilePromise = function (file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write into a file! 💩💩');
      resolve('Random dog image is saved to file!');
    });
  });
};

// Utilize/consuming the built promise
// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePromise('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image is saved to file!');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// NOTE: We can consume promise using async/await
const getDogPic = async function () {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );
    console.log(res.body.message);

    const result = await writeFilePromise('dog-img.txt', res.body.message);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
getDogPic();
