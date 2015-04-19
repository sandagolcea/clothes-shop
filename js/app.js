var app = angular.module('clothesShop', []);

app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
  var shop = this;
  var cart = new ShoppingCart();
  shop.items = []; 

  $http.get('products.json').success(function(data){
    shop.products = data;
  });

  $scope.addToCart = function (product) {
    if (product.quantity > 0) {
      product.quantity -= 1;
      shop.items.push(product);
      console.log('item '+ product.name+' added to cart.');
      cart.test();
    }
  }
}]);
