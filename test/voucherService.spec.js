describe('Voucher Service', function() {
  var CODE = 'SHOP5OFF';
  var data = {"code": "SHOP5OFF", "discount": 5, "category": "", "minimumSpent": 0 };
  
  beforeEach(module('clothesShop'));

  var service, $httpBackend;

  beforeEach(inject(function(voucherService, _$httpBackend_) {
    service = voucherService;
    $httpBackend = _$httpBackend_;
  }));

  it('validates a voucher with - no req category or min spent', function() {
    voucher = {
      "code": "SHOP5OFF",
      "discount": 5,
      "category": "",
      "minimumSpent": 0
    };
    items = [];
    total = 0;
    expect(service._validateVoucher(voucher, items, total)).toBe(true);
  });

  it('validates a voucher - that has items from requested category', function () {
    voucher = {
      "code": "15OVER75SHOES",
      "discount": 10,
      "category": "men shoes",
      "minimumSpent": 0
    };
    items = [{ "_id": "55414cd2f53656f71c119de0", "name": "Adidas", "price":50, "quantity": 1, "category":{"name":"men shoes"} }];
    total = 50;
    expect(service._validateVoucher(voucher, items, total)).toBe(true);
  });

  it('invalidates a voucher - items not from requested category', function () {
    voucher = {
      "code": "15OVER50SHOES",
      "discount": 10,
      "category": "women shoes",
      "minimumSpent": 50
    };
    total = 50;
    items = [{ "_id": "55414cd2f53656f71c119de0", "name": "Adidas", "price":50, "quantity": 1, "category":{"name":"men shoes"} }];
    expect(service._validateVoucher(voucher, items, total)).toBe(false);
  });

  it('validates a voucher - that has items from requested category and correct minimum spent', function () {
    voucher = {
      "code": "15OVER75SHOES",
      "discount": 10,
      "category": "men shoes",
      "minimumSpent": 75
    };
    total = 100;
    items = [{ "_id": "55414cd2f53656f71c119de0", "name": "Adidas", "price":50, "quantity": 2, "category":{"name":"men shoes"} }];
    expect(service._validateVoucher(voucher, items, total)).toBe(true);
  });

  it('invalidates a voucher - that does not have minimum total spent', function () {
    voucher = {
      "code": "15OVER75SHOES",
      "discount": 10,
      "category": "men shoes",
      "minimumSpent": 75
    };
    total = 50;
    items = [{ "_id": "55414cd2f53656f71c119de0", "name": "Adidas", "price":50, "quantity": 1, "category":{"name":"men shoes"} }];
    expect(service._validateVoucher(voucher, items, total)).toBe(false);
  });

  it('should get the voucher requested', function() {
    $httpBackend
      .expectGET('vouchers/'+CODE)
      .respond(data);

    var items = [{ "_id": "55414cd2f53656f71c119de0", "name": "Adidas", "price":50, "quantity": 2, "category":{"name":"men shoes"} }];
    var total = 100;
    service.addVoucherAsync(CODE, items, total);
    $httpBackend.flush();
    expect(service.vouchers().length).not.toBe(0);
  });

  it('should give error when voucher invalid', function() {
    var WRONG_CODE = 'ABCD';

    $httpBackend
      .expectGET('vouchers/'+WRONG_CODE)
      .respond(404, "Voucher not found");

    var items = [{ "_id": "55414cd2f53656f71c119de0", "name": "Adidas", "price":50, "quantity": 2, "category":{"name":"men shoes"} }];
    var total = 100;
    service.addVoucherAsync(WRONG_CODE, items, total);
    $httpBackend.flush();
    expect(service.vouchers().length).toBe(0);
  });

});

