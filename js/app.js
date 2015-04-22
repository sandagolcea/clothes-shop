var app = angular.module('clothesShop', ['ngRoute', 'angular.filter']);

app.factory('ShoppingCart', function () {
  var newCart = new ShoppingCart();
  return { cart: newCart };
});

app.controller('MainController', ['$scope', '$http', 'ShoppingCart', function ($scope, $http, ShoppingCart) {
  var shop = this;
  $scope.cart = ShoppingCart.cart;

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


app.config(function ($routeProvider) {
  $routeProvider
    .when('/', 
    {
      templateUrl: '/views/products.html',
      controller: 'MainController'
    })
    .when('/cart', 
    {
      templateUrl: '/views/cart.html',
      controller: 'MainController'
    })
    .when('/categories', 
    {
      templateUrl: '/views/categories.html',
      controller: 'MainController'
    })
    .otherwise({ redirectTo: '/'});
});
