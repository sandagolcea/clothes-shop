function ShoppingCart () {
  this.items = [];
}

ShoppingCart.prototype.addItem = function(pid, name, price, quantity) {
  if ( item = this._contains(pid) )
    item.quantity += 1;
  else
    this.items.push({pid: pid, name: name, price: price, quantity: quantity});
};

ShoppingCart.prototype.removeItem = function(pid) {
  for ( var i = 0; i < this.items.length; i++ )
    if (this.items[i].pid === pid) {
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

ShoppingCart.prototype._contains = function(pid) {
  var i;
  for (i = 0; i < this.items.length; i++) {
    if ( this.items[i].pid === pid ) {
      return this.items[i];
    }
  }
  return false;
};
