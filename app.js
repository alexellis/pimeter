var express = require('express');
var vash=require('vash');
var routes = require('./routes/api');
var bodyParser = require("body-parser");
var path = require('path');

var app = express();


app.set('view engine','vash');
app.disable('etag');

app.set('views',  __dirname+ '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 8000);

app.get('/', routes.overview);
app.use('/bower_components', express.static(path.join(__dirname,'/bower_components')));
app.use('/style', express.static(path.join(__dirname,'/style')));

app.listen(app.get('port'), function() {
	console.log("Listening on port " +app.get('port')) ;
});
