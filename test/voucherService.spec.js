describe('Voucher Service', function() {

  beforeEach(module('clothesShop'));

  var service;

  beforeEach(inject(function(voucherService) {
    service = voucherService;
  }));

  it('validates a voucher with - no req category or min spent', function() {
    voucher = {
      "code": "SHOP5OFF",
      "discount": 5,
      "category": "",
      "minimumSpent": 0
    };
    items = [];
    expect(service._validateVoucher(voucher, items)).toBe(true);
  });

  it('validates a voucher - that has items from requested category', function () {
    voucher = {
      "code": "15OVER75SHOES",
      "discount": 10,
      "category": "men shoes",
      "minimumSpent": 0
    };
    items = [{ "_id": "55414cd2f53656f71c119de0", "name": "Adidas", "price":50, "quantity": 1, "category":{"name":"men shoes"} }];
    expect(service._validateVoucher(voucher, items)).toBe(true);
  });

  it('invalidates a voucher - items not from requested category', function () {
    voucher = {
      "code": "15OVER75SHOES",
      "discount": 10,
      "category": "women shoes",
      "minimumSpent": 75
    };
    items = [{ "_id": "55414cd2f53656f71c119de0", "name": "Adidas", "price":50, "quantity": 1, "category":{"name":"men shoes"} }];
    expect(service._validateVoucher(voucher, items)).toBe(false);
  });

  it('validates a voucher - that has items from requested category and correct minimum spent', function () {
    voucher = {
      "code": "15OVER75SHOES",
      "discount": 10,
      "category": "men shoes",
      "minimumSpent": 75
    };
    items = [{ "_id": "55414cd2f53656f71c119de0", "name": "Adidas", "price":50, "quantity": 2, "category":{"name":"men shoes"} }];
    expect(service._validateVoucher(voucher, items)).toBe(true);
  });

  it('invalidates a voucher - that does not have minimum total spent', function () {
    voucher = {
      "code": "15OVER75SHOES",
      "discount": 10,
      "category": "men shoes",
      "minimumSpent": 75
    };
    items = [{ "_id": "55414cd2f53656f71c119de0", "name": "Adidas", "price":50, "quantity": 1, "category":{"name":"men shoes"} }];
    expect(service._validateVoucher(voucher, items)).toBe(false);
  });

  xit('', function() {
  });

});

