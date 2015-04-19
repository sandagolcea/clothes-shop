var app = angular.module('clothesShop', []);

app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
  var shop = this;
  $http.get('products.json').success(function(data){
    shop.products = data;
  });
}]);
