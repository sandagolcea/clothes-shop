var app = angular.module('clothesShop', ['ngRoute', 'angular.filter']);

app.factory('DataFactory', function () {
  var newCart = new ShoppingCart();
  return { cart: newCart };
});

app.controller('MainController', ['$scope', 'DataFactory', '$http', function ($scope, DataFactory, $http) {
  $scope.cart = DataFactory.cart;
  $http.get('products').success(function(data){
    $scope.products = data;
  });

  $scope.addToCart = function (product) {
    if ( product.quantity > $scope.cart.productQuantity(product._id) )
      $scope.cart.addItem(product._id, product.name, product.price, 1);
  }

  $scope.removeFromCart = function (product) {
    $scope.cart.removeItem(product._id)
  }
}]);

app.controller('ProductController', ['$scope', '$routeParams', '$http', function storeController($scope, $routeParams, $http) {
    if ($routeParams.productId != null) {  
      $http.get('products/'+$routeParams.productId)
      .success( function (data) {
        $scope.product = data;
      })
      .error( function (response) {
        $scope.productNotFound = true;
      });
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
    .when('/products/:productId',
    {
      templateUrl: '/views/product.html',
      controller: 'ProductController'
    })
    .when('/categories', 
    {
      templateUrl: '/views/categories.html',
      controller: 'MainController'
    })
    .otherwise({ redirectTo: '/'});
});
