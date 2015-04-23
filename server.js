var express = require('express');
var app = express();
var mongoose = require('mongoose');
require('./models.js');

var Product = mongoose.model('Product');

app.use("/", express.static(__dirname));

app.get('/products', function (request, response) {
  var productTest = new Product({
    name: "Tango shoes", 
    category: "Womens shoes",
    price: 100,
    quantity: 57
  });
  console.log(productTest.name);
  response.sendFile(__dirname+'/products.json');
});

app.get('/shoppingCart/:userId', function (request, response) {
  response.sendFile(__dirname+'/shoppingCart'+request.params.userId+'.json');
});

app.put('/shoppingCart/:userId/:productId', function (request, response) {
  response.send('put request here');
});

app.listen(3000, function () {
  console.log('Node listening at port 3000.')
});
