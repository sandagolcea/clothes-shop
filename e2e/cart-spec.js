var helper = require('./helper.js');

describe('Shopping cart', function() {
  var prodList = [];
  var cartList = element.all(by.repeater('item in items'));
  var VOUCHER_CODE = 'SHOP5OFF';
  var EXPIRED_VOUCHER_CODE = 'EXPIRED'

  beforeEach(function(){
    browser.get('http://localhost:3000');
  });

  it('should have no item in cart to begin with', function () {
    helper.visitCart();
    expect(cartList.count()).toEqual(0);
  });

  it('should add an item to cart when clicking on add to cart', function() {
    helper.addItemToCart();
    helper.visitCart();
    expect(cartList.count()).toEqual(1);
  });

  it('should not be able to add items Out of Stock', function() {
    var button = element(by.css('.outOfStock'))
    .element(by.buttonText('Add to cart'));
    expect(button.isEnabled()).toBe(false);
  });

  it('should remove items from cart ',function () {
    helper.addItemToCart();
    helper.visitCart();
    element(by.buttonText('Remove from cart')).click();
    expect(cartList.count()).toEqual(0);
  });

  it('should display total price correctly', function () {
    helper.addItemToCart();
    helper.visitCart();
    expect(element(by.id('totalPrice')).getText()).toBe('Total: £30.00');
  });

  it('should be able to have a voucher applied to the total', function () {
    helper.addItemToCart();
    helper.visitCart();
    helper.applyVoucherWithCode(VOUCHER_CODE);
    expect(element(by.id('totalPrice')).getText()).toBe('Total: £25.00');
  });

  it('should confirm that a voucher has been applied', function () {
    helper.addItemToCart();
    helper.visitCart();
    helper.applyVoucherWithCode(VOUCHER_CODE);
    expect(element(by.id('voucherMessage')).getText()).toBe('Voucher applied.');
  });

  it('should warn if a voucher can not be applied', function () {
    helper.addItemToCart();
    helper.visitCart();
    helper.applyVoucherWithCode(EXPIRED_VOUCHER_CODE);
    expect(element(by.id('voucherMessage')).getText()).toBe('Voucher not found or expired.');
  });

});