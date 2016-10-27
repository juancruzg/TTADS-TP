var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('connection', function(c) {
  // 'connection' listener
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
});

server.on('request', function(req, res){

    fs.readFile(process.argv[2] + "\\" + req.url, function(err, data){
      if(err){
        res.writeHead(404, { 'Content-Type': 'text/html'});
      }
      else {
        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.write(data);
      }
      res.end();

    });

    });


server.on('error', function (err){
  throw err;
});

server.listen(8120);
