module.exports = function (templateHTML, product) {
  // console.log(templateHTML);
  let output = templateHTML.replace(/{%productName%}/g, product.productName); //TRICK: Use the regular expression to search the value to be replaced
  output = output.replace(/{%image%}/g, product.image);
  output = output.replace(/{%quantity%}/g, product.quantity);
  output = output.replace(/{%from%}/g, product.from);
  output = output.replace(/{%nutrients%}/g, product.nutrients);
  output = output.replace(/{%price%}/g, product.price);
  output = output.replace(/{%description%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%not__organic%}/g, "not-organic");
  }

  return output;
};
