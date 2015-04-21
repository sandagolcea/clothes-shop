var app = angular.module('clothesShop', ['ui.bootstrap']);

app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
  var shop = this;
  $scope.cart = new ShoppingCart();

  $http.get('products.json').success(function(data){
    shop.products = data;
  });

  $scope.addToCart = function (product) {
    if (product.quantity > 0) {
      product.quantity -= 1;
      $scope.cart.addItem(product.pid, product.name, product.price, 1);
    }
  }

  $scope.removeFromCart = function (product) {
    if ( $scope.cart.removeItem(product.pid) )
      product.quantity += 1;
  }
}]);
