require('./models.js');
var async = require('async');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var products = require('../products.json');

function createCategories(categoryNames) {
  var tasks = [];
  categoryNames.forEach(function (categ) {
    tasks.push( function(callback) {
      Category.create ( { name: categ },  function (err, cat) {
        callback(err, cat);
      });
    });
  });

  async.parallel(tasks, function (err, results){
    results.forEach(function(result) {
      console.log('result is : '+result);
    });
    seedAllProducts(products)
  });
}

function seedProduct (categoryName, productName, productPrice, productQty) {
  Category.findOne({ name: categoryName })
  .exec()
  .then(function (category) {
    Product.create({ 
      name: productName, 
      categoryId: category._id,
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
