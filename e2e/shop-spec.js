describe('angularjs homepage shop', function() {
  var prodList = [];

  beforeEach(function(){
    browser.get('http://localhost:3000');
    prodList = element.all(by.repeater('product in products'));
  });

  it('should list all products', function() {
    expect(prodList.count()).toEqual(13);
  });

  it('should get to a product\'s information when clicking on it', function() {
    myElem = element.all(by.repeater('product in products'))
    .get(0)
    .element(by.partialLinkText('Suede Shoes'))
    .click();
    expect(element(by.id('productHeader')).getText()).toEqual('Suede Shoes');
  });
});