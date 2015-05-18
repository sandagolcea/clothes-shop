app.controller('MainController', ['$scope', 'cartService', '$http', function ($scope, cartService, $http) {
  var cart = cartService;
  $scope.items = cart.items();
  $scope.vouchers = cart.vouchers();

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

  $scope.applyVoucher = function (code) {
    cart.applyVoucher(code)
      .then(function (success) {
       $scope.voucherMessage = success; 
       $scope.vouchers = cart.vouchers();
      },
      function (error) {
        $scope.voucherMessage = error; 
      });
  }
}]);
