(function(){

	var rootUrl = [document.location.protocol,"//",document.location.host,"/"].join('');
	var panel;
	var button;
	var nickModal;

	$(function(){

		panel=$("#chatPanel");

        var chatCom = io(rootUrl+'chatCom');
        var chatAdmin =  io(rootUrl+'chatAdmin');


        chatAdmin.on('adminMessage',function(data){
            displayMessage(data);
        });

        chatCom.on('newMessage',function(data){
            displayMessage(data);
        });

        chatCom.on('name_set',function(data){
            nickModal.modal('hide');
            displayMessage(data);
        });
        chatCom.on('user_joined',function(data){
            displayMessage(data);
        });
        nickModal=$(".modal").modal();
        nickModal.find("button").click(function(){
            var nick=nickModal.find('input').val();
            chatCom.emit('set_name',{nickname:nick});
        });

        $("#sendBtn").click(function(){
            var txt=$("#msgInput").val();
            chatCom.emit('newMessage',{
                type:'userMessage',
                message:txt
            });
        });

        var displayMessage=function(msg){
                var style = "text-primary";
                var html=[];
        
                if(msg.type==="serverMessage"){
                    style="text-info"
                }
                else if(msg.type==="myMessage")
                {
                    style="text-muted";
                }
                else if(msg.type==="adminMessage"){
                    style="text-warning";
                }
        
                html.push("<p class='" + style + "' >")
                if(msg.nickname){
                    html.push(msg.nickname+ ": ");
                }
                html.push(msg.message);
                html.push("</p>");
        
                panel.append(html.join(''));
        }

	});

	
}());