var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9000;

app.use('/api/users', require('./api/users'));
app.use('/api/tasks', require('./api/tasks'));

// Sirvo la web en /
app.use('/', express.static("./web"));

/*app.get('*', function (req, res) {
    res.sendFile(__dirname + "/web/index.html");
});*/

app.listen(port);
console.log('Magic happens on port ' + port);
