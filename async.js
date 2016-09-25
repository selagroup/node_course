var eventEmitter = require('events').EventEmitter;

function AsyncObject(){
    var e=new eventEmitter();

    setImmediate(function(args){
         e.emit("init","init");
    });
    
    
    setTimeout(function(){
        e.emit("start","i am eventor...");
    }, 1000);

    setTimeout(function(){
        e.emit("message","this is a message from eventor" );
    },2000)

    return e;

};

var obj = new AsyncObject();

obj.on('init',function(data){
  console.log(data);
});
console.log('main');





    

