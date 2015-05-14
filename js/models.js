var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var categorySchema = new Schema({
  name: String
});

var productSchema = new Schema({
  name: String,
  category: { type: ObjectId, ref: 'Category', index: true },
  price: Number,
  quantity: Number
});

mongoose.model('Category', categorySchema);
mongoose.model('Product', productSchema);

// for local development:
// mongoose.connect('mongodb://localhost/test');
// for heroku deployment
mongoose.connect('mongodb://heroku_app36855850:54kp66d48gdleqso48fcmssfsa@ds031802.mongolab.com:31802/heroku_app36855850');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Successfully connected to mongodb..');
});
