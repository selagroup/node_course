var http = require('http');


var server=http.createServer(function(req, res){
	
	res.writeHead(200,{"content-type":"text/plain"});
	res.end('Hello Node Js');

});

server.listen(8080);
console.log('Listening');

