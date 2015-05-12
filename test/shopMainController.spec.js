describe('MainController', function() {
  beforeEach(module('clothesShop'));

  var scope, ctrl;

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('MainController', {
        $scope: scope
    });
  }));

  it('initialises with an empty search result and term', function() {
    expect(scope.searchResult).toBeUndefined();
    expect(scope.searchTerm).toBeUndefined();
  });

});
