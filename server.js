
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

require('./app/models/models.js');

var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var Voucher = mongoose.model('Voucher');

app.use("/", express.static(__dirname));
app.use(bodyParser.json()); 

app.get('/products', function (request,response) {
  Product
  .find()
  .populate({path: 'category', select: 'name -_id'})
  .exec( function (err, products) {
    if (err) return handleError(err);
    response.json(products); 
  });
});

app.get('/products/:id', function (request, response) {
  Product
  .findOne({_id: request.params.id})
  .populate({path: 'category', select: 'name -_id'})
  .exec( function (err, product) {
    if (err) return handleError(err);
    response.json(product); 
  });
});

app.get('/vouchers/:voucherCode', function (request, response) {
  var now = new Date();
  Voucher
  .findOne({code: request.params.voucherCode})
  .populate({path: 'category', select: 'name -_id'})
  .exec( function (err, voucher) {
    if (err) return handleError(err);
    if (!voucher || now > voucher.expirationDate) {
      response.status(404);
      response.send('You shall not pass!');
    } else {
      // TODO: don't show expiration date;
      response.json(voucher)
    }
  });
});

app.listen(port, function () {
  console.log('Node listening at port ' + port + '.');
});
