var http = require('http');
var options = {
    host: 'api.icndb.com',
    path: '/jokes/random',
    method: 'GET'
};

// handling incoming HTTP requests
var handleRequests = function(req,res){

    // creating an outgoing HTTP request
    req = http.request(options, function(response) {

        var str = "";
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function(){
            res.writeHead(200, {
                'content-type': 'application/json',
                'connection':'close'

            })
            res.end(str);
        });

    });
    req.end();
};

var server = http.createServer();
var connectionHandler=function(socket){
    console.log('new connection...');
}

server.on('connection',connectionHandler);
server.on('request',handleRequests);
server.on('listening',function(){
    console.log('started listening on 3030');
})
server.listen(3030)
