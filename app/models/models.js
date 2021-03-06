var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var categorySchema = new Schema({
  name: String
});

var productSchema = new Schema({
  name: String,
  color: String,
  images: [String],
  category: { type: ObjectId, ref: 'Category', index: true },
  price: Number,
  quantity: Number
});

var voucherSchema = new Schema({
  code: String,
  discount: Number,
  category: { type: ObjectId, ref: 'Category', index: true },
  minimumSpent: Number,
  expirationDate: Date
});

mongoose.model('Category', categorySchema);
mongoose.model('Product', productSchema);
mongoose.model('Voucher', voucherSchema);

// TODO #2: dynamically change path to db
// for local development:
mongoose.connect('mongodb://localhost/test');
// for heroku deployment - please change this every time before deployment!
// mongoose.connect('mongodb://heroku_app36855850:54kp66d48gdleqso48fcmssfsa@ds031802.mongolab.com:31802/heroku_app36855850');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Successfully connected to mongodb..');
});
