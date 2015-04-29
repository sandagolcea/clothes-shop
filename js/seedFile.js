require('./models.js');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var products = require('../products.json');

function createCategories(categoryNames) {
  var pendingCategoriesNr = categoryNames.length - 1;
  categoryNames.forEach(function (categ) {
    Category.create ( { name: categ },  function (err) {
      if (err) { 
        return handleError(err); 
      } else { 
        pendingCategoriesNr--;
      }
      if (pendingCategoriesNr == 0) {
        seedAllProducts(products);
      };
    });
  });
}

function createProduct (productName, productPrice, productQty, category) {
  Product.create({ 
    name: productName, 
    categoryId: category._id,
    price: productPrice,
    quantity: productQty
    });
}

function seedProduct (categoryName, productName, productPrice, productQty) {
  Category.findOne({ name: categoryName })
  .exec()
    .then(function (category) {
        return createProduct(productName, productPrice, productQty, category);
    });
}

function seedAllProducts (products) {
  products.forEach(function(product){
    console.log("***** "+product.category+" name: "+product.name+" price: "+product.price+" qty:"+product.quantity+" *****")
    seedProduct(product.category, product.name, product.price, product.quantity);
  });
}

createCategories(['men shoes','women shoes']);
