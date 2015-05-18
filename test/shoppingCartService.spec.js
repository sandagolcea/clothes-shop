describe('Shopping Cart', function() {
  var PROD_ID = 1234, PROD_PRICE = 100, PROD_QTY = 1, PROD_NAME = 'Boots', PROD_CATEGORY = 'women shoes';
  var PROD_TWO_ID = 5678, PROD_TWO_PRICE = 89, PROD_TWO_QTY = 1, PROD_TWO_NAME = 'Converse Shoes', PROD_TWO_CATEGORY = 'men shoes';
  var PROD_NOT_IN_CART_ID = 4321;
  var cart;

  beforeEach(module('clothesShop', function($provide) {
    mockVoucherService = {
      vouchers: function () {
        return [];
      }
    };
   $provide.value('voucherService', mockVoucherService);
  }));

  beforeEach(inject(function(cartService) {
    cart = cartService;
  }));

  // tests for items
  it('has no items when it is empty', function () {
    expect(cart.items()).toEqual([]);
  });

  it('stores items correctly', function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY, PROD_CATEGORY);
    cart.addItem(PROD_TWO_ID, PROD_NAME, PROD_PRICE, PROD_QTY, PROD_TWO_CATEGORY);
    expect(cart.items()).toEqual([
      { _id: PROD_ID, name: PROD_NAME, price: PROD_PRICE, quantity: PROD_QTY, category: PROD_CATEGORY },
      { _id: PROD_TWO_ID, name: PROD_NAME, price: PROD_PRICE, quantity: PROD_QTY, category: PROD_TWO_CATEGORY }
      ]);
  });

  //  tests for adding items
  it('can have items added to it', function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY, PROD_CATEGORY);
    expect(cart.items().length).toEqual(1);
  });

  it('can increment an item\'s quantity', function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY, PROD_CATEGORY);
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY, PROD_CATEGORY);
    expect(cart.items()[0].quantity).toEqual(2);
  });

  // tests for removing items
  it('can have items removed from it', function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY, PROD_CATEGORY);
    cart.removeItem(PROD_ID);
    expect(cart.items().length).toEqual(0);
  }); 

  it('can not remove items if cart empty',function () {
    expect(cart.removeItem(PROD_NOT_IN_CART_ID)).toBe(false);
  });

  it('only removes specified amount of items', function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY, PROD_CATEGORY);
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY, PROD_CATEGORY);
    cart.removeItem(PROD_ID);
    expect(cart.items()[0].quantity).toEqual(1);
  });

  it('can not remove an item that does not exist from the cart', function(){
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY, PROD_CATEGORY);
    expect(cart.removeItem(PROD_NOT_IN_CART_ID)).toBe(false);
  });

  // testing for item total
  it('is empty by default', function () {
    expect(cart.totalItems()).toBe(0);
  });

  it('returns correct item total when adding more items', function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY, PROD_CATEGORY);
    cart.addItem(PROD_TWO_ID, PROD_NAME, PROD_PRICE, PROD_QTY, PROD_CATEGORY);
    expect(cart.totalItems()).toBe(2);
  });

  // tests for individual product quantity
  it('has qty 0 for a product that is not in cart', function () {
    expect(cart.productQuantity(PROD_ID)).toBe(0);
  });

  it('knows total for each item in cart - product in cart', function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY, PROD_CATEGORY);
    expect(cart.productQuantity(PROD_ID)).toBe(1);
  });
  
  // tests for total price
  it('has total price zero when it does not have any items in it', function () {
    expect(cart.totalPrice()).toEqual(0);
  });

  it('can calculate the total price of all items', function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY, PROD_CATEGORY);
    cart.addItem(PROD_TWO_ID, PROD_NAME, PROD_TWO_PRICE, PROD_TWO_QTY, PROD_TWO_CATEGORY);
    var totalPrice = (PROD_PRICE * PROD_QTY) + (PROD_TWO_PRICE * PROD_TWO_QTY);
    expect(cart.totalPrice()).toEqual(totalPrice);
  });
});

