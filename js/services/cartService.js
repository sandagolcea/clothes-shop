app.service('cartService', function () {
  var items = [];

  this.addItem = function(_id, name, price, quantity) {
    if ( item = this._contains(_id) )
      item.quantity += 1;
    else
      items.push({_id: _id, name: name, price: price, quantity: quantity});
  };

  this.removeItem = function(_id) {
    for ( var i = 0; i < items.length; i++ )
      if (items[i]._id === _id) {
        if (items[i].quantity > 1) {
          items[i].quantity -=1;
          return true;
        }
        else {
          items.splice(i,1);
          return true;
        }
      }
    return false;
  };

  this.totalItems = function() {
    var total = 0;
    var i;
    for ( i = 0; i < items.length; i++)
      total += items[i].quantity
    return total;
  };

  this.productQuantity = function(_id) {
    var i = 0;
    for (i = 0; i < items.length; i++) {
      if ( items[i]._id === _id ) {
        return items[i].quantity;
      }
    }
    return 0;
  };

  this.items = function () {
    return items;
  };

  this.totalPrice = function () {
    var total = 0;
    var i;
    for ( i = 0; i < items.length; i++)
      total += items[i].quantity * items[i].price
    return total;
  };

  this._contains = function(_id) {
    var i;
    for (i = 0; i < items.length; i++) {
      if ( items[i]._id === _id ) {
        return items[i];
      }
    }
    return false;
  };

});