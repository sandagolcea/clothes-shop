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

  this.removeInvalidVouchers = function (items, total) {
    var invalidVouchers = [];
    this.vouchers().forEach( function(voucher) {
      if ( !service._reValidateVoucher(voucher, items, total) ) {
        invalidVouchers.push(voucher);
      }
    });
    invalidVouchers.forEach ( function (voucher) {
      for (var i = service.vouchers().length - 1; i >= 0; i--) {
        if ( service.vouchers()[i].code == voucher.code ) {
          service.vouchers().splice(i,1);
          break;
        }
      };
    });
    
  };

  this._validateVoucher = function (voucher, items, total) {
    if (this._isDuplicated(voucher)) { return false; }
    if (!this._isValid(voucher.category, items)) { return false; }
    if (!this._hasMinimumSpent(voucher, total)) { return false; }
    return true;
  };

  this._reValidateVoucher = function (voucher, items, total) {
    if (!this._isValid(voucher.category, items)) { return false; }
    if (!this._hasMinimumSpent(voucher, total)) { return false; }
    return true;
  };

  this.vouchers = function () {
    return vouchersUsed;
  };

  this._isDuplicated = function (voucher) {
    return this.vouchers().some( function (duplicate) {
      return duplicate.code === voucher.code; 
    });
  };

  this._isValid = function (category, items) {
    if (category) {
      return items.some(function (item) {
        return item.category === category.name;
      });
    }
    return true;
  };

  this._hasMinimumSpent = function (voucher, total) {
    return total >= voucher.minimumSpent;
  }
}]);
