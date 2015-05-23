var helper = {
  visitCart: function () {
    element(by.linkText('Your Cart')).click();
  },
  addItemToCart: function () {
    element.all(by.repeater('product in products'))
    .get(1)
    .element(by.buttonText('Add to cart'))
    .click();
  },
  applyVoucherWithCode: function (voucherCode) {
    element(by.model('voucherCode')).sendKeys(voucherCode);
    element(by.buttonText('Apply Voucher')).click();
  }
};

module.exports = helper;