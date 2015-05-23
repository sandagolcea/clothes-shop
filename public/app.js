var app = angular.module('clothesShop', ['ngRoute', 'angular.filter']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', 
    {
      templateUrl: '/public/views/products.html',
      controller: 'MainController'
    })
    .when('/cart', 
    {
      templateUrl: '/public/views/cart.html',
      controller: 'MainController'
    })
    .when('/products/:productId',
    {
      templateUrl: '/public/views/product.html',
      controller: 'ProductController'
    })
    .when('/categories', 
    {
      templateUrl: '/public/views/categories.html',
      controller: 'MainController'
    })
    .otherwise({ redirectTo: '/'});
});
