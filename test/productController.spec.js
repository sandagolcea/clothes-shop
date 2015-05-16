describe('ProductController', function() {
  var PROD_ID = 1234, PROD_PRICE = 100, PROD_QTY = 1, PROD_NAME = 'Skirt';
  var data = {"_id": PROD_ID,"name": PROD_NAME,"category":{"name":"men shoes"},"price":50,"quantity":5,"__v":0};

  beforeEach(module('clothesShop'));

  var scope, ctrl, $httpBackend;

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $routeParams) {
    scope = $rootScope.$new();
    ctrl = $controller('ProductController', {
        $scope: scope,
        $routeParams: {productId: PROD_ID}
    });
    $httpBackend = _$httpBackend_;
    $httpBackend
      .expectGET('products/'+PROD_ID)
      .respond(data); 
    $httpBackend.flush();
  }));

  it('returns the correct data for an existing product', function() {
    expect(scope.product).toEqual(data);
  });

});

