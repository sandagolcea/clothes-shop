describe('MainController', function() {
  var mockCartService;
  var TOTAL_PRICE = 100, TOTAL_CART_ITEMS = 2;

  beforeEach(module('clothesShop', function ($provide) {
    mockCartService = {
        data: [],
        items: function () {
          return this.data;
        },
        addItem: function (_id, name, price, quantity) {
        },
        removeItem: function (_id) {
        },
        totalItems: function () {
          return TOTAL_CART_ITEMS;
        },
        totalPrice: function () {
          return TOTAL_PRICE;
        },
        productQuantity: function () {
          return 0;
        },
        setItems: function (itemsArray) {
          this.data = itemsArray;          
        },
    };
    $provide.value('cartService', mockCartService);
  }));

  var scope, ctrl, $httpBackend, products, cartItems;

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    scope = $rootScope.$new();
    cartItems = [
      { "_id": "55414cd2f53656f71c119de0", "name": "Adidas", "price":50, "quantity": 1 },
      { "_id": "55414cd2f53656f71c119de3", "name": "Tom tom shoes", "price": 80, "quantity": 1 }
    ];
    mockCartService.setItems(cartItems);

    ctrl = $controller('MainController', {
        $scope: scope,
    });
  
    products = [
        {"_id":"55414cd2f53656f71c119ddf","name":"Athletic wear shoes","category":{"name":"men shoes"},"price":50,"quantity":5},
        {"_id":"55414cd2f53656f71c119de0","name":"Adidas","category":{"name":"men shoes"},"price":24,"quantity":4},
        {"_id":"55414cd2f53656f71c119de1","name":"Timberland boots","category":{"name":"women shoes"},"price":99,"quantity":3},
        {"_id":"55414cd2f53656f71c119de2","name":"Sandals","category":{"name":"women shoes"},"price":78,"quantity":5},
        {"_id":"55414cd2f53656f71c119de3","name":"Tom tom shoes","category":{"name":"men shoes"},"price":80,"quantity":2}
    ];    
    $httpBackend = _$httpBackend_;
    $httpBackend
      .expectGET('products')
      .respond(products); 
    
    $httpBackend
      .flush();

  }));

  it('returns the correct products from backend', function () {
    expect(scope.products).toEqual(products);
  });

  it('loads products from backend', function () {
    expect(scope.products.length).toEqual(5);
  });

  it('retrieves the correct cart items', function () {
    expect(scope.items).toEqual(cartItems);
  });

  it('adds items to cart properly', function () {
    product = {"_id": "55414cd2f53656f71c119de2","name": "Sandals","price":78,"quantity":5};
    mockCartService.setItems([product]);
    spyOn(mockCartService,'addItem');
    scope.addToCart(product)
    expect(mockCartService.addItem).toHaveBeenCalled();
    expect(scope.items).toEqual([product]);
  });

  it('only adds items if enough items in stock', function () {
    product_unavailable = {"_id": "55414cd2f53656f71c119de2","name": "Sandals","price":78,"quantity":0};
    spyOn(mockCartService,'addItem');
    scope.addToCart(product_unavailable)
    expect(mockCartService.addItem).not.toHaveBeenCalled();
    expect(scope.items).toEqual(cartItems);
  });

  it('can remove items from cart', function () {
    product = {"_id": "55414cd2f53656f71c119de2","name": "Sandals","price":78,"quantity":5};
    spyOn(mockCartService,'removeItem');
    mockCartService.setItems([]);
    scope.removeFromCart(product);
    expect(mockCartService.removeItem).toHaveBeenCalled();
    expect(scope.items).toEqual([]);
  });
  
  it('returns the total cart items', function () {
    expect(scope.totalCartItems()).toEqual(TOTAL_CART_ITEMS);
  });

  it('returns the total cart price', function () {
    expect(scope.totalCartPrice()).toEqual(TOTAL_PRICE);
  });

});
