require('./models.js');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');

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
    seedProduct(product.category, product.name, product.price, product.quantity);
  });
}

createCategories(['men shoes','women shoes']);

var products = [{
    'category': 'women shoes',
    'name': 'Heels',
    'price': 110,
    'quantity': 4
  },
  {
    'category': 'women shoes',
    'name': 'Sandals',
    'price': 88,
    'quantity': 3
  },
  {
    'category': 'men shoes',
    'name': 'Timberland',
    'price': 94,
    'quantity': 1
  },
  {
    'category': 'men shoes',
    'name': 'Tom\'s',
    'price': 120,
    'quantity': 10
  }
]
