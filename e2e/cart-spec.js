describe('Shopping cart', function() {
  var prodList = [];
  var cartList = [];

  beforeEach(function(){
    browser.get('http://localhost:3000');
  });

  it('should have no item in cart to begin with', function () {
    element(by.linkText('Your Cart'))
    .click();
    cartList = element.all(by.repeater('item in items'));
    expect(cartList.count()).toEqual(0);
  });

  it('should add an item to cart when clicking on add to cart', function() {
    // add product to cart
    element.all(by.repeater('product in products'))
    .get(1)
    .element(by.buttonText('Add to cart'))
    .click();
    // goto cart
    element(by.linkText('Your Cart'))
    .click();
    // check one item in cart
    cartList = element.all(by.repeater('item in items'));
    expect(cartList.count()).toEqual(1);
  });

  it('should not add items Out of Stock', function() {
    // add product to cart
    element.all(by.repeater('product in products'))
    .get(8)
    .element(by.buttonText('Add to cart'))
    .click();
    // goto cart
    element(by.linkText('Your Cart'))
    .click();
    // check one item in cart
    cartList = element.all(by.repeater('item in items'));
    expect(cartList.count()).toEqual(0);
  });

  it('should remove items from cart ',function () {
    // add item to cart
    element.all(by.repeater('product in products'))
    .get(1)
    .element(by.buttonText('Add to cart'))
    .click();
    // goto cart
    element(by.linkText('Your Cart'))
    .click();
    // remove item
    element(by.buttonText('Remove from cart'))
    .click();
    // check zero items in cart
    cartList = element.all(by.repeater('item in items'));
    expect(cartList.count()).toEqual(0);
  });

  it('should display total price correctly', function () {
    // add elem to cart
    element.all(by.repeater('product in products'))
    .get(1)
    .element(by.buttonText('Add to cart'))
    .click();
    // goto cart
    element(by.linkText('Your Cart'))
    .click();
    expect(element(by.id('totalPrice')).getText()).toBe('Total: £30.00');
  });

  it('should be able to have a voucher applied to the total', function () {
    // add elem to cart
    element.all(by.repeater('product in products'))
    .get(1)
    .element(by.buttonText('Add to cart'))
    .click();
    // goto cart
    element(by.linkText('Your Cart'))
    .click();
    // apply voucher
    element(by.model('voucherCode')).sendKeys('SHOP5OFF');
    element(by.buttonText('Apply Voucher'))
    .click();
    expect(element(by.id('totalPrice')).getText()).toBe('Total: £25.00');
  });

  it('should confirm that a voucher has been applied', function () {
    // add elem to cart
    element.all(by.repeater('product in products'))
    .get(1)
    .element(by.buttonText('Add to cart'))
    .click();
    // goto cart
    element(by.linkText('Your Cart'))
    .click();
    // apply voucher
    element(by.model('voucherCode')).sendKeys('SHOP5OFF');
    element(by.buttonText('Apply Voucher'))
    .click();
    expect(element(by.id('voucherMessage')).getText()).toBe('Voucher applied.');
  });

  it('should warn if a voucher can not be applied', function () {
    // add elem to cart
    element.all(by.repeater('product in products'))
    .get(1)
    .element(by.buttonText('Add to cart'))
    .click();
    // goto cart
    element(by.linkText('Your Cart'))
    .click();
    // apply voucher
    element(by.model('voucherCode')).sendKeys('EXPIRED');
    element(by.buttonText('Apply Voucher'))
    .click();
    expect(element(by.id('voucherMessage')).getText()).toBe('Voucher not found or expired.');
  });

});