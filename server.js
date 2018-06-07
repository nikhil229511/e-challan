"use strict";

var mysql=require('mysql');
var WebSocketServer = require('websocket').server;
var http=require('http');
var serverportnumber=5005;

//database connection
var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "echallan"
        });
con.connect(function(){
	console.log("connected to database.");
});
//database connection end

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
	//async function main_function(){
		connection.on('message',function(message){
			try{
				if(message.type === 'utf8'){
					console.log((new Date()) + '(R) => ' + message.utf8Data);
					var c=JSON.parse(message.utf8Data);
					switch(c.usertype){
						case "login":
						verifyUser(c.data.username,c.data.password,connection);
						break;

					}
				}
				else{
					console.log('Invalid Message Format.');
				}
			}catch(ex){
				console.log('This is not a valid json' + ex);
			}
		});

		connection.on('close',function(){
			console.log((new Date()) + ' Peer disconnected.');
		});	

		function verifyUser(username,password,connection){
			var obj;
			con.query("SELECT companyid,username,password FROM loginmaster where username='"+username+"' and password='"+password+"';", function (err, result, fields) {
				if (err) 
					throw err;
				if(result.length==1){
					obj={
						msg:"success",
						companyid:result[0].companyid,
						username:result[0].username,
						password:result[0].password
					}	
				}
				else{
					obj={
						msg:"fail"
					}
				}

				var json=JSON.stringify({type:"login_callback",data:obj});
				connection.send(json);
				});				
		}
	//}
	//main_function();

});