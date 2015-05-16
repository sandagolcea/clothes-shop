describe('MainController', function() {
  beforeEach(module('clothesShop', function ($provide) {
    mockCartService = {
        items: function () {
          return [];
        },
        addItem: function (_id, name, price, quantity) {
          return 0;
        },
        totalItems: function () {
          return 0;
        },
        totalPrice: function () {
          return 0;
        }
    };
    $provide.value('cartService', mockCartService);
  }));

  var scope, ctrl, $httpBackend;

  beforeEach(inject(function(_$httpBackend_,$rootScope, $controller) {
    scope = $rootScope.$new();

    ctrl = $controller('MainController', {
        $scope: scope
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
    expect(scope.items).toEqual([]);
  });

  xit('adds items to cart properly', function(){});
  xit('only adds items if enough items in stock', function(){});
  xit('can remove items from cart', function(){});
  
  it('returns the total cart items', function(){
    expect(scope.totalCartItems()).toEqual(0);
  });

  it('returns the total cart price', function () {
    expect(scope.totalCartPrice()).toEqual(0);
  });

});
