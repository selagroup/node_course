var http = require('http');

var options = {
    host: 'api.icndb.com',
    path: '/jokes/random',
    method: 'GET'
};


// handling incoming HTTP requests
var handleRequests = function(req,res){

    var request=http.request(options,function(response){
        var str='';
        response.on('data',function(chunk){
            str+=chunk;
        });

        response.on('end',function(){
            res.writeHead(200,{'content-type':'application/json',
                'connection':'close'});
            res.end(str);
        });

    });
    request.end();
};
var server=http.createServer().listen(8080);

server.on('connection',function(){
    console.log('new connection');
})
server.on('request',handleRequests);
server.on('listening',function(){
    console.log('listening...');
})




