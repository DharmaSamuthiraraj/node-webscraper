var express = require('express');
var path = require('path');
var ejs = require('ejs');
var routeIndex = require('./routes/index');

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'server/views'));

app.use('/', routeIndex);

app.listen(port, function() {	
  	console.log('Web Scraper app listening at ', port);
})

module.exports = app;