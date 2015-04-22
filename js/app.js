var app = angular.module('clothesShop', ['ngRoute', 'angular.filter']);

app.factory('DataFactory', ['$http', function ($http) {
  var newCart = new ShoppingCart();
  var newShop = new Shop();
  $http.get('products.json').success(function(data){
    newShop.products = data;
  });
  return { cart: newCart, shop: newShop };
}]);

app.controller('MainController', ['$scope', 'DataFactory', function ($scope, DataFactory) {
  $scope.cart = DataFactory.cart;
  $scope.shop = DataFactory.shop;


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

  $scope.cartRemoval = function (item) {
    var i;
    if ( $scope.cart.removeItem(item.pid) )
    {
      for (i = 0; i < $scope.shop.products.length; i++) {
        if ( $scope.shop.products[i].pid === item.pid ) {
          $scope.shop.products[i].quantity += 1 ;
        }
      }
    }
  }
}]);

app.controller('ProductRetriever', function storeController($scope, $routeParams, DataFactory) {

    $scope.shop = DataFactory.shop;
    $scope.cart = DataFactory.cart;

    $scope.getProduct = function (pid) {
        for (var i = 0; i < $scope.shop.products.length; i++) {
            if ($scope.shop.products[i].pid == pid)
                return $scope.shop.products[i];
        }
        return null;
    }

    if ($routeParams.pid != null) {
        $scope.product = $scope.getProduct($routeParams.pid);
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
    .when('/products/:pid',
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
