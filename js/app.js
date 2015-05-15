var app = angular.module('clothesShop', ['ngRoute', 'angular.filter']);

// TODO: split services and controllers into separate files
app.service('cartService', function () {
  var items = [];

  this.addItem = function(_id, name, price, quantity) {
    if ( item = this._contains(_id) )
      item.quantity += 1;
    else
      items.push({_id: _id, name: name, price: price, quantity: quantity});
  };

  this.removeItem = function(_id) {
    for ( var i = 0; i < items.length; i++ )
      if (items[i]._id === _id) {
        if (items[i].quantity > 1) {
          items[i].quantity -=1;
          return true;
        }
        else {
          items.splice(i,1);
          return true;
        }
      }
    return false;
  };

  this.totalItems = function() {
    var total = 0;
    var i;
    for ( i = 0; i < items.length; i++)
      total += items[i].quantity
    return total;
  };

  this.productQuantity = function(_id) {
    var i = 0;
    for (i = 0; i < items.length; i++) {
      if ( items[i]._id === _id ) {
        return items[i].quantity;
      }
    }
    return 0;
  };

  this.items = function () {
    return items;
  };

  this.totalPrice = function () {
    var total = 0;
    var i;
    for ( i = 0; i < items.length; i++)
      total += items[i].quantity * items[i].price
    return total;
  };

  this._contains = function(_id) {
    var i;
    for (i = 0; i < items.length; i++) {
      if ( items[i]._id === _id ) {
        return items[i];
      }
    }
    return false;
  };

});

app.controller('MainController', ['$scope', 'cartService', '$http', function ($scope, cartService, $http) {
  var cart = cartService;
  $scope.items = cart.items();

  $http.get('products').success(function(data){
    $scope.products = data;
  });

  $scope.addToCart = function (product) {
    if ( product.quantity > cart.productQuantity(product._id) )
      cart.addItem(product._id, product.name, product.price, 1);
  }

  $scope.removeFromCart = function (product) {
    cart.removeItem(product._id)
  }

  $scope.totalCartItems = function () {
    return cart.totalItems();
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
