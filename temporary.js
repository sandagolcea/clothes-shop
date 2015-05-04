
  var categoryTest = new Category({name: "womens shoes"});
  categoryTest.save();

  var productTest = new Product({
    name: "Sandals", 
    categoryId: categoryTest._id,
    price: 100,
    quantity: 57
  });
  productTest.save();
  
  Product
  .findOne({name: "Sandals"})
  .populate('categoryId')
  .exec( function (err, product) {
    if (err) return handleError(err);
  });
  