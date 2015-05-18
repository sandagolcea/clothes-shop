app.service('cartService', ['voucherService', function (voucherService) {
  // TODO: store cart in local storage service for cookieees retrieval;
  var items = {};

  this.addItem = function(_id, name, price, quantity, category) {
    if ( !this._contains(_id) )
      items[_id] = {_id: _id, name: name, price: price, quantity: quantity, category: category};
    else
      items[_id].quantity += 1;
  };

  this.removeItem = function(_id) {
    if ( this._contains(_id) ) {
      items[_id].quantity > 1 ? items[_id].quantity-- : delete items[_id];
      return true;
    }
    return false;
  };

  this.totalItems = function() {
    var total = 0;
    for (var index in items) {
      total += items[index].quantity;
    }
    return total;
  };

  this.productQuantity = function(_id) {
    if ( this._contains(_id) ) {
      return items[_id].quantity;
    }
    return 0;
  };

  this.items = function () {
    var itemsArray = [];
    for (var index in items) {
      itemsArray.push(items[index])
    }
    return itemsArray;
  };

  this.totalPrice = function () {
    var total = 0;
    for ( var index in items)
      total += items[index].quantity * items[index].price
    // before checkout see if any vouchers with discounts apply
    // calling method getVouchers
    return total;
  };

  this.applyVoucher = function (code) {
    return voucherService.addVoucherAsync(code, items, this.totalPrice());
  }

  
  this.vouchers = function () {
    // var vouchers = vouchers.getVouchers..  from voucher service
  }

  this._contains = function(_id) {
    return _id in items;
  };

}]);

// items structure now looks like:
// items = {
//  123: {id: 123, name:'skirt',..} , 
//  456: {id: 456, name:'jeans',..} 
// }
