require('./models.js');
var async = require('async');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var products = require('../products.json');

function createCategories(categoryNames) {
  async.each(categoryNames, function (category, callback) {
      Category.create ( { name: category },  function (err, cat) {
        callback(err, cat);
      });
    }, 
    function (err) { 
      if ( !err ) {
        seedAllProducts(products)
      }
  });
}

function seedProduct (categoryName, productName, productPrice, productQty) {
  Category.findOne({ name: categoryName })
  .exec()
  .then(function (category) {
    Product.create({ 
      name: productName, 
      category: category._id,
      price: productPrice,
      quantity: productQty
    });
  });
}

function seedAllProducts (products) {
  products.forEach(function(product){
    seedProduct(product.category, product.name, product.price, product.quantity);
  });
}

createCategories(['men shoes','women shoes']);
