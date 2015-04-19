var express = require('express');
var app = express();

app.use("/", express.static(__dirname));

app.get('/', function(req,res){
  res.sendFile(__dirname+'/home.html');
});

app.listen(3000,function(){
  console.log('Node listening at port 3000')
});
