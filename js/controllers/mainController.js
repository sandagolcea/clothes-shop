app.controller('MainController', ['$scope', 'cartService', '$http', function ($scope, cartService, $http) {
  var cart = cartService;
  $scope.items = cart.items();

  $http.get('products').success(function(data){
    $scope.products = data;
  });

  $scope.addToCart = function (product) {
    if ( product.quantity > cart.productQuantity(product._id) ) {
      cart.addItem(product._id, product.name, product.price, 1, product.category.name);
      $scope.items = cart.items();
    }
  };

  $scope.removeFromCart = function (product) {
    cart.removeItem(product._id)
    $scope.items = cart.items();
  };

  $scope.totalCartItems = function () {
    return cart.totalItems();
  };

  $scope.totalCartPrice = function () {
    return cart.totalPrice();
  };

  $scope.applyVoucher = function () {
    // cart.applyVoucher(...).then(function(result) { ...$scope.VoucherMessage = result; })
  }
}]);
