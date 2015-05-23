describe('Voucher Service', function() {
  var CODE = 'SHOP5OFF';
  var data = {"code": "SHOP5OFF", "discount": 5, "category": "", "minimumSpent": 0 };
  var VALID_VOUCHER = {
    "code": "SHOP5OFF",
    "discount": 5,
    "category": "",
    "minimumSpent": 0
  };
  var CATEGORY_VOUCHER = {
    "code": "15OVER75SHOES",
    "discount": 10,
    "category": {"name": "men shoes"},
    "minimumSpent": 0
  };
  var MIN_SPENT_VOUCHER = {
    "code": "15OVER75SHOES",
    "discount": 10,
    "category": {"name": "women shoes"},
    "minimumSpent": 75
  };
  var EXPIRED_VOUCHER = {
    "code": "EXPIRED",
    "discount": 20,
    "category": "",
    "minimumSpent": 75
  };
  var ITEM_ONE = { "_id": "55414cd2f53656f71c119de0", "name": "Adidas", "price":50, "quantity": 1, "category":"men shoes" };
  var ITEM_TWO = { "_id": "55414cd2f53656f71c119de0", "name": "Boots", "price":150, "quantity": 2, "category": "women shoes" };

  beforeEach(module('clothesShop'));

  var service, $httpBackend;

  beforeEach(inject(function(voucherService, _$httpBackend_) {
    service = voucherService;
    $httpBackend = _$httpBackend_;
  }));

  it('validates a voucher with - no req category or min spent', function() {
    items = [];
    total = 0;
    expect(service._validateVoucher(VALID_VOUCHER, items, total)).toBe(true);
  });

  it('validates a voucher - that has items from requested category', function () {
    voucher = CATEGORY_VOUCHER;
    items = [ITEM_ONE];
    total = 50;
    expect(service._validateVoucher(voucher, items, total)).toBe(true);
  });

  it('invalidates a voucher - items not from requested category', function () {
    voucher = CATEGORY_VOUCHER;
    total = 150;
    items = [ITEM_TWO];
    expect(service._validateVoucher(voucher, items, total)).toBe(false);
  });

  it('validates a voucher - that has items from requested category and correct minimum spent', function () {
    voucher = MIN_SPENT_VOUCHER;
    total = 150;
    items = [ITEM_TWO];
    expect(service._validateVoucher(voucher, items, total)).toBe(true);
  });

  it('invalidates a voucher - that does not have minimum total spent', function () {
    voucher = MIN_SPENT_VOUCHER;
    total = 50;
    items = [ITEM_ONE];
    expect(service._validateVoucher(voucher, items, total)).toBe(false);
  });

  it('should get the voucher requested', function() {
    $httpBackend
      .expectGET('vouchers/'+CODE)
      .respond(data);

    var items = [ITEM_ONE];
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

    var items = [ITEM_TWO];
    var total = 100;
    service.addVoucherAsync(WRONG_CODE, items, total);
    $httpBackend.flush();
    expect(service.vouchers().length).toBe(0);
  });

  it('should give a message to say voucher applied', inject(function ($rootScope) {
    var items = [ITEM_ONE];
    var total = 100;

    $httpBackend
      .expectGET('vouchers/'+CODE)
      .respond(data);

    var resolvedValue;
    var myPromise = service.addVoucherAsync(CODE, items, total);
    myPromise.then(function(value) { resolvedValue = value; });

    $httpBackend.flush();
    $rootScope.$apply();

    expect(resolvedValue).toEqual("Voucher applied.");
  }));

  it('should warn if the voucher is not valid', inject(function ($q, $rootScope) {
    var EXPIRED_CODE = 'EXPIRED';
    var items = [ITEM_ONE];
    var total = 50;

    $httpBackend
      .expectGET('vouchers/'+EXPIRED_CODE)
      .respond(EXPIRED_VOUCHER);

    var resolvedValue;

    var myPromise = service.addVoucherAsync(EXPIRED_CODE, items, total);
    myPromise.then(
      function (success) {},
      function (value) { resolvedValue = value; }
    );

    $httpBackend.flush();
    $rootScope.$apply();

    expect(resolvedValue).toEqual("Voucher not valid.");
  }));

  it('should warn if the voucher has not been found', inject(function ($rootScope) {
    var CODE_NOT_FOUND = 'ABDC';
    var items = [ITEM_ONE];
    var total = 50;

    $httpBackend
      .expectGET('vouchers/'+CODE_NOT_FOUND)
      .respond(404,"Voucher not found.");

    var resolvedValue;

    var myPromise = service.addVoucherAsync(CODE_NOT_FOUND, items, total);
    myPromise.then(
      function (success) {},
      function (value) { resolvedValue = value; }
    );

    $httpBackend.flush();
    $rootScope.$apply();

    expect(resolvedValue).toEqual("Voucher not found or expired.");
  }));

  it('should not let you add a duplicate voucher', function () {
    var items = [ITEM_ONE];
    var total = 100;
    
    $httpBackend
      .expectGET('vouchers/'+CODE)
      .respond(VALID_VOUCHER);
    service.addVoucherAsync(CODE, items, total);

    items = [ITEM_TWO];
    $httpBackend
      .expectGET('vouchers/'+CODE)
      .respond(VALID_VOUCHER);
    service.addVoucherAsync(CODE, items, total);

    $httpBackend.flush();
    expect(service.vouchers().length).toBe(1);
  });

  it('should let you remove an invalid voucher', function () {
    voucher = MIN_SPENT_VOUCHER;
    total = 150;
    items = [ITEM_TWO];
    
    $httpBackend
      .expectGET('vouchers/'+MIN_SPENT_VOUCHER.code)
      .respond(MIN_SPENT_VOUCHER);
    service.addVoucherAsync(MIN_SPENT_VOUCHER.code, items, total);
    $httpBackend.flush();

    total = 50;
    items = [ITEM_TWO];
    service.removeInvalidVouchers(items, total);

    expect(service.vouchers().length).toBe(0);
  });

  it('should not let you remove an valid voucher', function () {
    var voucher = MIN_SPENT_VOUCHER;
    var total = 150;
    var items = [ITEM_TWO];
    
    $httpBackend
      .expectGET('vouchers/'+MIN_SPENT_VOUCHER.code)
      .respond(MIN_SPENT_VOUCHER);
    service.addVoucherAsync(MIN_SPENT_VOUCHER.code, items, total);
    $httpBackend.flush();

    total = 150;
    items = [ITEM_TWO];
    service.removeInvalidVouchers(items, total);

    expect(service.vouchers().length).toBe(1);
  });
});

