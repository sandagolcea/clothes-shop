var app = angular.module('clothesShop', []);

app.controller('MainController', ['$http', function ($http) {
  var shop = this;
  shop.products = [{
      "name": "Timberland boots",
      "cathegory": "women footwear",
      "price": 99,
      "quantity": 3
    },
    {
      "name": "Blue swede shoes",
      "cathegory": "women footwear",
      "price": 78,
      "quantity": 5
    }
  ];
}]);