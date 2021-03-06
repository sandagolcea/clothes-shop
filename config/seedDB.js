require('../app/models/models.js');
var async = require('async');
var mongoose = require('mongoose');

var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var Voucher = mongoose.model('Voucher');

var products = require('./products.json');
var categories = require('./categories.json');
var vouchers = require('./vouchers.json');

// expiry of voucher set to 30 days after adding it to the DB
var futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 30);
var expiredDate = new Date();
expiredDate.setDate(expiredDate.getDate() - 30);

function seedCategories(categoryNames) {
  async.each(categoryNames, function (category, callback) {
      Category.create ( { name: category },  function (err, cat) {
        callback(err, cat);
      });
    }, 
    function (err) { 
      if (!err) {
        seedProducts(products);
        seedVouchers(vouchers);
      }
  });
}

function seedProduct (categoryName, productName, productColor, productImages, productPrice, productQty) {
  Category
    .findOne({ name: categoryName })
    .exec()
    .then(function (category) {
      Product.create({ 
        name: productName, 
        color: productColor,
        images: productImages,
        category: category._id,
        price: productPrice,
        quantity: productQty
      });
    });
}

function seedProducts (products) {
  products.forEach( function (product) {
    seedProduct(product.category, product.name, product.color, product.images, product.price, product.quantity);
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
      Category
        .findOne({ name: voucher.category })
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

seedCategories(categories);
