app.service('voucherService', function () {

  this.addVoucherAsync = function (code, items) {

  };

  this._validateVoucher = function (voucher, items) {
    if ( voucher.minimumSpent ) {
      // if minimSpent < items total price, return false
    };

    if ( voucher.category ) {
      return items.some(function (item) {
        return item.category.name == voucher.category;
      });
    };
    return true;
  };
});

// do TDD

// inject voucher service in cart service;
// textbox + button in cart view (action in cartService = applyVoucher()) =>
// calls voucherService =>

// vouchersUsed = [];
// this.addVoucher(code, items)
// req to the server to see if voucher is valid;
// return error if voucher not valid

// this._validateVoucher
// -> if category required, check at least one has category
// -> if minimumSpent > 0, check min spend etc..
// -> if checksOut => return code and discount && store it in vouchersUsed.

// this.getAppliedVouchers => [{code: "EHSI", discount: 10}, {..}..]
