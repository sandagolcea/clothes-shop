var app = angular.module('clothesShop', ['ngRoute', 'angular.filter']);

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
