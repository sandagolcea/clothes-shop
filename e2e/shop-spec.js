describe('angularjs homepage shop', function() {
  var prodList = [];

  beforeEach(function(){
    browser.get('http://localhost:3000');
    prodList = element.all(by.repeater('product in products'));
  });

  it('should list all products', function() {
    expect(prodList.count()).toEqual(5);
  });

  it('should get to a product\'s information when clicking on it', function() {
    myElem = element.all(by.repeater('product in products'))
    .get(1)
    .element(by.linkText('Adidas'))
    .click();
    expect(element(by.id('productHeader')).getText()).toEqual('Adidas');
  });
});