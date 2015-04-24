var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
require('./models.js');
var getData = require('./js/seedFile.js')

var Product = mongoose.model('Product');
var Category = mongoose.model('Category');

app.use("/", express.static(__dirname));

app.get('/products', function (request, response) {
  // TODO: remove categoryTest and productTest - begin
  var categoryTest = new Category({name: "womens shoes"});
  categoryTest.save();

  var productTest = new Product({
    name: "Sandals", 
    categoryId: categoryTest._id,
    price: 100,
    quantity: 57
  });
  productTest.save();
  // TODO: remove categoryTest and productTest - end
  response.sendFile(__dirname+'/products.json');
});

app.get('/shoppingCart/:userId', function (request, response) {
  Product
  .findOne({name: "Sandals"})
  .populate('categoryId')
  .exec( function (err, product) {
    if (err) return handleError(err);
    // TODO: remove verification outputs
    // console.log('The product is: %s', product.name );
    // console.log('The product category is: %s', product.categoryId.name);
  });
  response.sendFile(__dirname+'/shoppingCart'+request.params.userId+'.json');
});

app.put('/shoppingCart/:userId/:productId', function (request, response) {
  response.send('put request here');
});

app.listen(port, function () {
  console.log('Node listening at port ' + port + '.');
});
