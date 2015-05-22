app.controller('ProductController', ['$scope', '$routeParams', '$http', 'cartService', function storeController($scope, $routeParams, $http, cartService) {
    if ($routeParams.productId !== null) {  
      $http.get('products/'+$routeParams.productId)
      .success( function (data) {
        $scope.product = data;
      })
      .error( function (response) {
        $scope.productNotFound = true;
      });
    }

    $scope.addToCart = function (product) {
      if ( product.quantity > cartService.productQuantity(product._id) ) {
        cartService.addItem(product._id, product.name, product.price, 1, product.category.name);
      }
    };
}]);
