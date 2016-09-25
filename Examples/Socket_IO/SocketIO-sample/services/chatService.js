var io  = require("socket.io");

module.exports.init=function(server){

	var Message = function(_type,_message,nick){
		this.type=_type;
		this.message = _message;
        this.nickname = nick;
	}
    io = io(server);
    var chatCom = io.of('/chatCom');
    var chatSys = io.of('/chatAdmin');
    chatSys.on("connection",function(socket){
        setTimeout(function(){
            chatSys.emit("adminMessage",{type:"adminMessage", message:"This a message From the chat admin"});
        }, 5000);

    });




    chatCom.on('connection',function(socket){

        socket.on('set_name',function(data){
            socket.nickname=data.nickname;
            socket.emit('name_set',new Message('serverMessage','Hi '+data.nickname));
            socket.broadcast.emit('user_joined',new Message('serverMessage',data.nickname+' has joined'));
        });
        socket.emit('newMessage',new Message('serverMessage','Welcome to incrediable Chat...'));
        
        socket.on('newMessage',function(msg){
            msg.nickname = socket.nickname;
            socket.broadcast.emit('newMessage',msg);
            msg.type='myMessage';
            socket.emit('newMessage',msg);
        });
    });
	



	
}