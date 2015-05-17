require('./models.js');
var async = require('async');
var mongoose = require('mongoose');

var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var Voucher = mongoose.model('Voucher');

var products = require('../products.json');
var vouchers = require('../vouchers.json');

function createCategories(categoryNames) {
  async.each(categoryNames, function (category, callback) {
      Category.create ( { name: category },  function (err, cat) {
        callback(err, cat);
      });
    }, 
    function (err) { 
      if ( !err ) {
        seedAllProducts(products);
        seedVouchers(vouchers);
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
  products.forEach( function (product) {
    seedProduct(product.category, product.name, product.price, product.quantity);
  });
}

function seedVouchers (vouchers) {
  vouchers.forEach( function (voucher) {
    if (voucher.category) { 
      Category.findOne({ name: voucher.category })
      .exec()
      .then(function (category) {
        Voucher.create({
          code: voucher.code,
          discount: voucher.discount,
          category: category._id,
          minimumSpent: voucher.minimumSpent
        });  
      });
    } else {
      Voucher.create({
        code: voucher.code,
        discount: voucher.discount,
        minimumSpent: voucher.minimumSpent
      });
    }
  });
}

createCategories(['men shoes','women shoes']);

