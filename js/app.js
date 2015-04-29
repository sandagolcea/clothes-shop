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

app.controller('ProductRetriever', function storeController($scope, $routeParams, DataFactory) {
    $scope.getProduct = function (_id) {
        for (var i = 0; i < $scope.products.length; i++) {
            if ($scope.products[i]._id == _id)
                return $scope.products[i];
        }
        return null;
    }

    if ($routeParams._id != null) {
        $scope.product = $scope.getProduct($routeParams._id);
    }

});

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
    .when('/products/:_id',
    {
      templateUrl: '/views/product.html',
      controller: 'ProductRetriever'
    })
    .when('/categories', 
    {
      templateUrl: '/views/categories.html',
      controller: 'MainController'
    })
    .otherwise({ redirectTo: '/'});
});
