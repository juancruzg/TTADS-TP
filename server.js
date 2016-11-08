var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9000;

app.use('/api/users', require('./api/users'));
app.use('/api/tasks', require('./api/tasks'));
app.use('/', express.static("./web"));

app.listen(port);
console.log('Magic happens on port ' + port);
