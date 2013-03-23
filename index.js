var express = require('express');
var app = express();

var port =  process.env.PORT || 5000;


app.use(express.static(__dirname + '/public'));

app.listen(port);

console.log("server running and listening on port "+port);