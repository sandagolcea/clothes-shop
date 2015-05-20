require('./models.js');
var async = require('async');
var mongoose = require('mongoose');

var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var Voucher = mongoose.model('Voucher');

var products = require('../products.json');
var vouchers = require('../vouchers.json');

// 30 days later
var futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 30);
var expiredDate = new Date();
expiredDate.setDate(expiredDate.getDate() - 30);

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

function seedProduct (categoryName, productName, productColor, productPrice, productQty) {
  Category.findOne({ name: categoryName })
  .exec()
  .then(function (category) {
    Product.create({ 
      name: productName, 
      color: productColor,
      category: category._id,
      price: productPrice,
      quantity: productQty
    });
  });
}

function seedAllProducts (products) {
  products.forEach( function (product) {
    seedProduct(product.category, product.name, product.color, product.price, product.quantity);
  });
}

function seedVouchers (vouchers) {
  vouchers.forEach( function (voucher) {
    var date;
    if (voucher.code === "EXPIRED") {
      date = expiredDate;
    } else {
      date = futureDate;
    }
    if (voucher.category) { 
      Category.findOne({ name: voucher.category })
      .exec()
      .then(function (category) {
        Voucher.create({
          code: voucher.code,
          discount: voucher.discount,
          category: category._id,
          minimumSpent: voucher.minimumSpent,
          expirationDate: date
        });  
      });
    } else {
      Voucher.create({
        code: voucher.code,
        discount: voucher.discount,
        minimumSpent: voucher.minimumSpent,
        expirationDate: date
      });
    }
  });
}

createCategories(["Women’s Footwear", "Men’s Footwear", "Women’s Casualwear", "Men’s Casualwear", "Men’s Formalwear", "Women’s Formalwear"]);

