describe('Shopping Cart', function() {
  var PROD_ID = 1234;
  var PROD_PRICE = 100;
  var PROD_QTY = 1;
  var PROD_NAME = 'Skirt';

  beforeEach(module('clothesShop'));

  var scope, ctrl;

  beforeEach(inject(function($rootScope, $controller, cartService) {
    scope = $rootScope.$new();
    ctrl = $controller('MainController', {
        $scope: scope
    });
    cart = cartService;
  }));

  it('is empty by default', function() {
    expect(cart.totalItems()).toBe(0);
  });

  it('can have items added to it', function() {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY);
    expect(cart.totalItems()).toBe(1);
  });

  it('can have items removed from cart', function() {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY);
    cart.removeItem(PROD_ID);
    expect(cart.totalItems()).toBe(0);
  }); 
   
});

