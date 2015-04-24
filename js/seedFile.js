var exports = module.exports = {};
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');

function seedProduct (categoryName, productName, productPrice, productQty) {
  var category = new Category({name: categoryName});
  category.save();

  var product = new Product({
    name: productName,
    categoryId: category._id,
    price: productPrice,
    quantity: productQty
  });
  product.save();
}

seedProduct('women shoes','Heels',110,4);
seedProduct('women shoes','Sandals',88,3);
seedProduct('men shoes','Timberland',94,1);
seedProduct('men shoes','Tom\'s',120,10);