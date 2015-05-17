require('./js/models.js');
var async = require('async');
var mongoose = require('mongoose');

var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var Voucher = mongoose.model('Voucher');

function deleteAll () {
  Category.find().remove().exec();
  Product.find().remove().exec();
  Voucher.find().remove().exec();
}

deleteAll();