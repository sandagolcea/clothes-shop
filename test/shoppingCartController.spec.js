describe('Shopping Cart', function() {
  var PROD_ID = 1234;
  var PROD_PRICE = 100;
  var PROD_QTY = 1;

  beforeEach(module('clothesShop'));

  var scope, ctrl;

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('MainController', {
        $scope: scope
    });
  }));

  it('is empty by default', function() {
    expect(scope.cart.totalItems()).toBe(0);
  });

  it('can have items added to it', function() {
    scope.cart.addItem(PROD_ID, 'Skirt', PROD_PRICE, PROD_QTY);
    expect(scope.cart.totalItems()).toBe(1);
  });

  it('can have items removed from cart', function() {
    scope.cart.addItem(PROD_ID, 'Skirt', PROD_PRICE, PROD_QTY);
    scope.cart.removeItem(PROD_ID);
    expect(scope.cart.totalItems()).toBe(0);
  }); 
   
});

