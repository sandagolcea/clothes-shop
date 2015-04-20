function ShoppingCart () {
  cart = this;
  cart.items = [];
}

ShoppingCart.prototype.addItem = function(pid, name, price, quantity) {
  if ( item = cart._contains(pid) )
    item.quantity += 1;
  else
    cart.items.push({pid: pid, name: name, price: price, quantity: quantity});
};

ShoppingCart.prototype._contains = function(pid) {
  var i;
  for (i = 0; i < cart.items.length; i++) {
    if ( cart.items[i].pid === pid ) {
      return cart.items[i];
    }
  }
  return false;
};