describe('angularjs shopping cart', function() {
  var prodList = [];
  var cartList = [];

  beforeEach(function(){
    browser.get('http://localhost:3000');
    // prodList = element.all(by.repeater('product in products'));
  });
  
  // TODO: DRY and separate to 2 test cases: 
  // initial cond & item in cart
  it('should have no item in cart to begin with', function () {
    element(by.linkText('Your Cart')).
    click();
    cartList = element.all(by.repeater('item in cart.items'));
    expect(cartList.count()).toEqual(0);
  });

  it('should add an item to cart when clicking on add to cart', function() {
    // add product to cart
    element.all(by.repeater('product in products'))
    .get(1)
    .element(by.buttonText('Add to cart'))
    .click();
    // goto cart
    element(by.linkText('Your Cart')).
    click();
    // check one item in cart
    cartList = element.all(by.repeater('item in cart.items'));
    expect(cartList.count()).toEqual(1);
  });

  it('should remove items from cart ',function () {
    // remove item from cart
    element.all(by.repeater('product in products'))
    .get(1)
    .element(by.buttonText('Add to cart'))
    .click();
    // goto cart
    element(by.linkText('Your Cart')).
    click();
    // remove item
    element(by.buttonText('Remove from cart')).
    click();
    // check zero items in cart
    cartList = element.all(by.repeater('item in cart.items'));
    expect(cartList.count()).toEqual(0);
  });
});