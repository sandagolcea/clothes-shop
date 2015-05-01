describe('angularjs homepage shop', function() {
  it('should list all products', function() {
    browser.get('http://localhost:3000');

    var prodList = element.all(by.repeater('product in products'));
    expect(prodList.count()).toEqual(5);
  });
});