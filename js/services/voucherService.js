app.service('voucherService', ['$http', '$q', function ($http, $q) {
  var vouchersUsed = [];
  var service = this;

  this.addVoucherAsync = function (code, items, total) {
    var deferred = $q.defer();
    // retrieve voucher
    $http.get('vouchers/'+code)
    .success( function (data) {
      var voucher = data;
      if ( service._validateVoucher(voucher, items, total) ) {
        vouchersUsed.push( voucher );
        deferred.resolve("Voucher applied.");
      } else {
        deferred.reject('Voucher not valid.');
      }
    })
    .error (function (response) {
      deferred.reject("Voucher not found or expired.");
    });

    return deferred.promise;
  };

  this._validateVoucher = function (voucher, items, total) {
    var minSpentOK = true, categoryOK = true;
    // voucher has minimum spending requirement
    ( total >= voucher.minimumSpent ) ? minSpentOK = true : minSpentOK = false;
    // voucher category requirement
    if ( voucher.category ) {
      categoryOK = items.some(function (item) {
        return item.category.name == voucher.category;
      });
    };
    return (minSpentOK && categoryOK);
  };

  this.vouchers = function () {
    return vouchersUsed;
  };
}]);

// inject voucher service in cart service;
// textbox + button in cart view (action in cartService = applyVoucher()) =>
// calls voucherService =>

// vouchersUsed = [];
// this.addVoucher(code, items)
// req to the server to see if voucher is valid;
// return error if voucher not valid

// this._validateVoucher
// -> if minimumSpent > 0, check min spend etc..
// -> if category required, check at least one has category
// -> if checksOut => return code and discount && store it in vouchersUsed.

// this.getAppliedVouchers => [{code: "EHSI", discount: 10}, {..}..]
