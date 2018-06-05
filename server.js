var WebSocketServer = require('websocket').server;
var http=require('http');

var serverportnumber=5005;

//http server created to bind it with websocket server
var server=http.createServer(function(request,response){
});

server.listen(serverportnumber,function(){
	console.log((new Date())+" server listening on port: "+ serverportnumber);
});

var wsServer=new WebSocketServer({
	httpServer:server
});

wsServer.on('request',function(request){

	var connection=request.accept(null,request.origin);
	console.log((new Date()) + ' Connection accepted.');

	connection.on('message',function(message){
		try{
			console.log(message);
			if(message.type == 'utf8'){
				console.log("(R) => "+new date()+" ----"+message);
				var c=JSON.parse(message.utf8Data);
				console.log(c);
			}
			else{
				console.log('Invalid Message Format.');
			}
		}catch(ex){
			console.log('This is not a valid json');
		}
	});

	connection.on('close',function(){
		console.log((new Date()) + ' Peer disconnected.');
	});
});