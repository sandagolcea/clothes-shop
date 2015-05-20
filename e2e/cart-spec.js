describe('Shopping cart', function() {
  var prodList = [];
  var cartList = element.all(by.repeater('item in items'));

  beforeEach(function(){
    browser.get('http://localhost:3000');
  });

  function visitCart () {
    element(by.linkText('Your Cart')).click();
  };

  function addItemToCart () {
    element.all(by.repeater('product in products'))
    .get(1)
    .element(by.buttonText('Add to cart'))
    .click();
  };

  function applyVoucherWithCode(voucherCode) {
    element(by.model('voucherCode')).sendKeys(voucherCode);
    element(by.buttonText('Apply Voucher')).click();
  };

  it('should have no item in cart to begin with', function () {
    visitCart();
    expect(cartList.count()).toEqual(0);
  });

  it('should add an item to cart when clicking on add to cart', function() {
    addItemToCart();
    visitCart();
    expect(cartList.count()).toEqual(1);
  });

  it('should not add items Out of Stock', function() {
    element.all(by.repeater('product in products'))
    .get(8)
    .element(by.buttonText('Add to cart'))
    .click();
    visitCart();
    expect(cartList.count()).toEqual(0);
  });

  it('should remove items from cart ',function () {
    addItemToCart();
    visitCart();
    element(by.buttonText('Remove from cart')).click();
    expect(cartList.count()).toEqual(0);
  });

  it('should display total price correctly', function () {
    addItemToCart();
    visitCart();
    expect(element(by.id('totalPrice')).getText()).toBe('Total: £30.00');
  });

  it('should be able to have a voucher applied to the total', function () {
    // add elem to cart
    addItemToCart();
    visitCart();
    applyVoucherWithCode('SHOP5OFF');
    expect(element(by.id('totalPrice')).getText()).toBe('Total: £25.00');
  });

  it('should confirm that a voucher has been applied', function () {
    addItemToCart();
    visitCart();
    applyVoucherWithCode('SHOP5OFF');
    expect(element(by.id('voucherMessage')).getText()).toBe('Voucher applied.');
  });

  it('should warn if a voucher can not be applied', function () {
    addItemToCart();
    visitCart();
    applyVoucherWithCode('EXPIRED');
    expect(element(by.id('voucherMessage')).getText()).toBe('Voucher not found or expired.');
  });

});