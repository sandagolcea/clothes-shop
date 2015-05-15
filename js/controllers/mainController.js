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

  $scope.totalCartPrice = function () {
    return cart.totalPrice();
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