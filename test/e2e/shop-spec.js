describe('Shop homepage', function() {
  var prodList = [];

  beforeEach(function(){
    browser.get('http://localhost:3000');
    prodList = element.all(by.repeater('product in products'));
  });

  it('should list all products', function() {
    expect(prodList.count()).toEqual(13);
  });

  it('should get to a product\'s information when clicking on it', function() {
    element.all(by.repeater('product in products'))
    .get(0)
    .element(by.partialLinkText('Court Shoes'))
    .click();
    expect(element(by.id('productHeader')).getText()).toEqual('Almond Toe Court Shoes');
  });

  it('should filter the products list when you type into the search box', function() {

    var query = element(by.model('searchText'));

    expect(prodList.count()).toBe(13);

    query.sendKeys('dress');
    expect(prodList.count()).toBe(2);
    query.clear();

    query.sendKeys('short');
    expect(prodList.count()).toBe(3);
    query.clear();
  });

});