describe('MainController', function() {
  var mockCartService;

  beforeEach(module('clothesShop', function ($provide) {
    mockCartService = {
        data: [],
        addItemInvoked: false,
        removeItemInvoked: false,
        items: function () {
          return this.data;
        },
        addItem: function (_id, name, price, quantity) {
          this.addItemInvoked = true;
        },
        removeItem: function (_id) {
          this.removeItemInvoked = true;
        },
        totalItems: function () {
          return 0;
        },
        totalPrice: function () {
          return 0;
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

  beforeEach(inject(function(_$httpBackend_,$rootScope, $controller) {
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
    $httpBackend.expectGET('products').
      respond(products); 
    $httpBackend.flush();

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
    scope.addToCart(product)
    expect(mockCartService.addItemInvoked).toBe(true);
    expect(scope.items).toEqual([product]);
  });

  it('only adds items if enough items in stock', function () {
    product_unavailable = {"_id": "55414cd2f53656f71c119de2","name": "Sandals","price":78,"quantity":0};
    scope.addToCart(product_unavailable)
    expect(mockCartService.addItemInvoked).toBe(false);
    expect(scope.items).toEqual(cartItems);
  });

  it('can remove items from cart', function () {
    product = {"_id": "55414cd2f53656f71c119de2","name": "Sandals","price":78,"quantity":5};
    mockCartService.setItems([]);
    scope.removeFromCart(product);
    expect(mockCartService.removeItemInvoked).toBe(true);
    expect(scope.items).toEqual([]);
  });
  
  it('returns the total cart items', function () {
    expect(scope.totalCartItems()).toEqual(0);
  });

  it('returns the total cart price', function () {
    expect(scope.totalCartPrice()).toEqual(0);
  });

});
