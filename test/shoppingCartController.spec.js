describe('Shopping Cart', function() {
  var PROD_ID = 1234, PROD_PRICE = 100, PROD_QTY = 1, PROD_NAME = 'Skirt';
  var PROD_TWO_ID = 5678, PROD_TWO_PRICE = 280;
  var PROD_NOT_IN_CART_ID = 4321;

  beforeEach(module('clothesShop'));

  beforeEach(inject(function(cartService) {
    cart = cartService;
  }));

  //  tests for adding items
  it('can have items added to it', function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY);
    expect(cart.totalItems()).toBe(1);
  });

  it('can increment quantity', function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY);
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY);
    expect(cart.totalItems()).toBe(2);
  });

  // tests for removing items
  it('can have items removed from cart', function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY);
    cart.removeItem(PROD_ID);
    expect(cart.totalItems()).toBe(0);
  }); 

  it('can not remove items if cart empty',function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY);
    cart.removeItem(PROD_ID);
    cart.removeItem(PROD_ID);
    expect(cart.totalItems()).toBe(0);
  });

  it('can not remove an item that does not exist from the cart', function(){
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY);
    cart.removeItem(PROD_NOT_IN_CART_ID);
    expect(cart.totalItems()).toBe(1);
  });
  
  // testing for item total
  it('is empty by default', function () {
    expect(cart.totalItems()).toBe(0);
  });

  it('returns correct item total when adding more items', function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY);
    cart.addItem(PROD_TWO_ID, PROD_NAME, PROD_PRICE, PROD_QTY);
    expect(cart.totalItems()).toBe(2);
  });

  // tests for individual product quantity
  it('has qty 0 for a product that is not in cart', function () {
    expect(cart.productQuantity(PROD_ID)).toBe(0);
  });

  it('knows total for each item in cart - product in cart', function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY);
    expect(cart.productQuantity(PROD_ID)).toBe(1);
  });

  // TODO: test this by seeing that array of items = []
  it('has no items when it is empty', function () {
    expect(cart.items()).toEqual([]);
  });

  it('knows the items in basket are correct', function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY);
    cart.addItem(PROD_TWO_ID, PROD_NAME, PROD_PRICE, PROD_QTY);
    expect(cart.items()).toEqual([
      { _id: PROD_ID, name: PROD_NAME, price: PROD_PRICE, quantity: PROD_QTY },
      { _id: PROD_TWO_ID, name: PROD_NAME, price: PROD_PRICE, quantity: PROD_QTY }
      ]);
  });

  it('can calculate the total price of all items', function () {
    cart.addItem(PROD_ID, PROD_NAME, PROD_PRICE, PROD_QTY);
    cart.addItem(PROD_TWO_ID, PROD_NAME, PROD_TWO_PRICE, PROD_QTY);
    var totalPrice = (PROD_PRICE * PROD_QTY) + (PROD_TWO_PRICE * PROD_QTY);
    expect(cart.totalPrice()).toEqual(totalPrice);
  });
});

