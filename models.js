var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  // TODO: replace category to categoryID from category Schema
  category: String,
  price: Number,
  quantity: Number
});

mongoose.model('Product', productSchema);

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Successfully connected to mongodb..');
});