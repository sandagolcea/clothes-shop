
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

require('./js/models.js');

var Product = mongoose.model('Product');
var Category = mongoose.model('Category');

app.use("/", express.static(__dirname));
app.use(bodyParser.json()); 

app.get('/products', function (request, response) {
  response.sendFile(__dirname+'/products.json');
});

app.get('/test', function (req,response) {
  Product
  .find()
  .populate({path: 'category', select: 'name -_id'})
  .exec( function (err, products) {
    if (err) return handleError(err);
    response.json(products); 
  });
});

app.get('/shoppingCart/:userId', function (request, response) {
  response.sendFile(__dirname+'/shoppingCart'+request.params.userId+'.json');
});

app.put('/shoppingCart/:userId/:productId', function (request, response) {
  response.send('put request here');
});

app.listen(port, function () {
  console.log('Node listening at port ' + port + '.');
});
