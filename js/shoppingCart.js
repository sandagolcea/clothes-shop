function ShoppingCart () {
  this.items = [];
}

ShoppingCart.prototype.addItem = function(_id, name, price, quantity) {
  if ( item = this._contains(_id) )
    item.quantity += 1;
  else
    this.items.push({_id: _id, name: name, price: price, quantity: quantity});
};

ShoppingCart.prototype.removeItem = function(_id) {
  for ( var i = 0; i < this.items.length; i++ )
    if (this.items[i]._id === _id) {
      if (this.items[i].quantity > 1) {
        this.items[i].quantity -=1;
        return true;
      }
      else {
        this.items.splice(i,1);
        return true;
      }
    }
  return false;
};

ShoppingCart.prototype.totalItems = function() {
  var total = 0;
  var i;
  for ( i = 0; i < this.items.length; i++)
    total += this.items[i].quantity
  return total;
};

ShoppingCart.prototype._contains = function(_id) {
  var i;
  for (i = 0; i < this.items.length; i++) {
    if ( this.items[i]._id === _id ) {
      return this.items[i];
    }
  }
  return false;
};

ShoppingCart.prototype.productQuantity = function(_id) {
  var i = 0;
  for (i = 0; i < this.items.length; i++) {
    if ( this.items[i]._id === _id ) {
      return this.items[i].quantity;
    }
  }
  return 0;
};
