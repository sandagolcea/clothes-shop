var express = require('express');
var app = express();

app.use("/", express.static(__dirname));

app.get('/products', function (request, response) {
  response.sendFile(__dirname+'/products.json');
});

app.get('/shoppingCart/:userId', function (request, response) {
  response.sendFile(__dirname+'/shoppingCart'+request.params.userId+'.json');
});

app.put('/shoppingCart/:userId/:productId', function (request, response) {
  response.send('put request here');
});

app.listen(3000, function () {
  console.log('Node listening at port 3000')
});
