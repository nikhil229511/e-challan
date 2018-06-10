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
					console.log('(R) => ' + message.utf8Data);
					var c=JSON.parse(message.utf8Data);
					switch(c.usertype){
						case "login":
						verifyUser(c.data.username,c.data.password,connection);
						break;

						case "insertCustomer":
							insertCustomer(c.data.fname,c.data.lname,c.data.contactno,c.data.gstno,c.data.address,c.data.companyid,connection);
						break;

						case "insertTransporter":
							insertTransporter(c.data.fname,c.data.lname,c.data.contactno,c.data.gstno,c.data.address,c.data.companyid,connection);
						break;

						case "insertProduct":
							insertProduct(c.data.name,c.data.length,c.data.width,c.data.thickness,c.data.companyid,connection);
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
			var sql="SELECT companyid,username,password FROM loginmaster where username='"+username+"' and password='"+password+"';"
			con.query(sql, function (err, result, fields) {
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
					sendResponse(json,connection);
			});				
		}

		function insertCustomer(fname,lname,contactno,gstno,address,companyid,connection){
			var obj;
			var sql="INSERT INTO customers (companyid,fname,lname,contactno,address,gstno) values("+companyid+",'"+fname+"','"+lname+"','"+contactno+"','"+address+"','"+gstno+"');";
			con.query(sql, function (err, result, fields) {
				if(err)
					throw err;
				if(result.affectedRows){
					obj={
						msg:'CustomerSuccess'
					}								
				}
				else{
					obj={
						msg:'CustomerFail'
					}
				}
				var json=JSON.stringify({type:"customerInsert_callback",data:obj});
				sendResponse(json,connection);
			});
		}

		function insertTransporter(fname,lname,contactno,gstno,address,companyid,connection){
			var obj;
			var sql="INSERT INTO transporters (companyid,fname,lname,contactno,address,gstno) values("+companyid+",'"+fname+"','"+lname+"','"+contactno+"','"+address+"','"+gstno+"');";
			con.query(sql, function (err, result, fields) {
				if(err)
					throw err;
				if(result.affectedRows){
					obj={
						msg:'TransporterSuccess'
					}								
				}
				else{
					obj={
						msg:'TransporterFail'
					}
				}
				var json=JSON.stringify({type:"TransporterInsert_callback",data:obj});
				sendResponse(json,connection);
			});
		}

		function insertProduct(name,length,width,thickness,companyid,connection){
			var obj;
			var sql="INSERT INTO products (productname,length,width,thickness,companyid) values('"+name+"',"+length+","+width+","+thickness+","+companyid+");";
			con.query(sql, function (err, result, fields) {
				if(err)
					throw err;
				if(result.affectedRows){
					obj={
						msg:'ProductSuccess'
					}								
				}
				else{
					obj={
						msg:'ProductFail'
					}
				}
				var json=JSON.stringify({type:"ProductInsert_callback",data:obj});
				sendResponse(json,connection);
			});
		}

		function sendResponse(json,connection){
			connection.send(json);
			console.log('(S) => ' + json);
		}
	//}
	//main_function();

});