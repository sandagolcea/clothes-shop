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
    // TODO: remove duplicate vouchers
    var minSpentOK = true, categoryOK = true, duplicatedVoucher = false;

    // searching for duplicated voucher
    duplicatedVoucher = this.vouchers().some( function (duplicate) {
      return duplicate.code === voucher.code; 
    });

    // voucher has minimum spending requirement
    ( total >= voucher.minimumSpent ) ? minSpentOK = true : minSpentOK = false;

    // voucher category requirement
    if ( voucher.category ) {
      categoryOK = items.some(function (item) {
        return item.category.name === voucher.category;
      });
    };
    return (minSpentOK && categoryOK && !duplicatedVoucher);
  };

  this.vouchers = function () {
    return vouchersUsed;
  };
}]);
