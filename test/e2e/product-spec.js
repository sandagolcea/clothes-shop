describe('Product page', function() {
  var prodList = [];

  beforeEach(function(){
    browser.get('http://localhost:3000');
    prodList = element.all(by.repeater('product in products'));
  });

  it('should add an item to cart when clicking on Add to Cart button', function() {
    element.all(by.repeater('product in products'))
    .get(0)
    .element(by.partialLinkText('Court Shoes'))
    .click();
    element(by.buttonText('Add to Cart')).click();
    expect(element(by.id('cartDisplay')).getText()).toContain('£99.00');
  });

});