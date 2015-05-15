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
