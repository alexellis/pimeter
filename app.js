var express = require('express');
var bodyParser = require("body-parser");
var vash=require('vash');
var path = require('path');

var routes = require('./routes/web');
var apiRoutes = require('./routes/api');

var port = 80;

var app = express();

app.set('view engine', 'vash');
app.disable('etag');
app.disable('x-powered-by');

app.set('views',  __dirname+ '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', process.env.PORT || port);

app.get('/stats/', routes.stats);
app.get('/history/:days/', routes.overview);
app.get('/graph/:days/', routes.graph);
app.get('/api/stats', apiRoutes.stats);
app.get('/api/day/:days/', apiRoutes.overview);
app.use('/bower_components', express.static(path.join(__dirname,'/bower_components')));
app.use('/style', express.static(path.join(__dirname,'/style')));
app.use('/script', express.static(path.join(__dirname,'/script')));

app.get('/', routes.overview);

app.listen(app.get('port'), function() {
	console.log("Starting PIMeter web interface.");
	console.log("Listening on port " +app.get('port')) ;
});
