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
							getAllCustomers(c.data.companyid);
						break;

						case "updateCustomer":
							updateCustomer(c.data.customerid,c.data.fname,c.data.lname,c.data.contactno,c.data.gstno,c.data.address,c.data.companyid,connection);
							getAllCustomers(c.data.companyid);
						break;

						case "deleteCustomer":
							deleteCustomer(c.data.customerid,c.data.companyid,connection);
							getAllCustomers(c.data.companyid);
						break;

						case "insertTransporter":
							insertTransporter(c.data.fname,c.data.lname,c.data.contactno,c.data.gstno,c.data.address,c.data.companyid,connection);
							getAllTransporters(c.data.companyid);
						break;

						case "updateTransporter":
							updateTransporter(c.data.transportid,c.data.fname,c.data.lname,c.data.contactno,c.data.gstno,c.data.address,c.data.companyid,connection);
							getAllTransporters(c.data.companyid);
						break;

						case "deleteTransporter":
							deleteTransporter(c.data.transportid,c.data.companyid,connection);
							getAllTransporters(c.data.companyid);
						break;

						case "insertProduct":
							insertProduct(c.data.name,c.data.length,c.data.width,c.data.thickness,c.data.companyid,connection);
							getAllProducts(c.data.companyid);
						break;

						case "updateProduct":
							updateProduct(c.data.productid,c.data.name,c.data.length,c.data.width,c.data.thickness,c.data.companyid,connection);
							getAllProducts(c.data.companyid);
						break;

						case "deleteProduct":
							deleteProduct(c.data.productid,c.data.companyid,connection);
							getAllProducts(c.data.companyid);
						break;

						case "insertUnit":
							insertUnit(c.data.name,c.data.offset,c.data.companyid,connection);
							getAllUnits(c.data.companyid);
						break;

						case "updateUnit":
							updateUnit(c.data.unitid,c.data.name,c.data.offset,c.data.companyid,connection);
							getAllUnits(c.data.companyid);
						break;

						case "deleteUnit":
							deleteUnit(c.data.unitid,c.data.companyid,connection);
							getAllUnits(c.data.companyid);
						break;

						case "LoadSalesChallan":
							getAllProductList(c.data.companyid);
							getSalesChallanNo(c.data.companyid);
							getAllCustomerList(c.data.companyid);
							getAllUnitsList(c.data.companyid);
						break;

						case "insertSalesChallan":
							insertSalesChallan(c.companyid,c.customerid,c.challanno,c.date,c.total,c.data,connection);
						break;

						case "sendAll":
							getAllCustomers(c.data.companyid);
							getAllTransporters(c.data.companyid);
							getAllProducts(c.data.companyid);
							getAllUnits(c.data.companyid);
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
				if(result.length==1){
					obj={
						msg:"success",
						companyid:result[0].companyid,
						username:result[0].username
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
				if(result.affectedRows){
					obj={
						msg:'CustomerInsertSuccess'
					}								
				}
				else{
					obj={
						msg:'CustomerInsertFail'
					}
				}
				var json=JSON.stringify({type:"customerInsert_callback",data:obj});
				sendResponse(json,connection);
			});
		}

		function updateCustomer(customerid,fname,lname,contactno,gstno,address,companyid,connection){
			var obj;
			var sql="UPDATE customers set fname='"+fname+"',lname='"+lname+"',contactno='"+contactno+"',address='"+address+"',gstno='"+gstno+"' WHERE customerid="+customerid+" AND companyid="+companyid+";";
			con.query(sql, function (err, result, fields) {
				if(result.affectedRows){
					obj={
						msg:'CustomerUpdateSuccess'
					}								
				}
				else{
					obj={
						msg:'CustomerUpdateFail'
					}
				}
				var json=JSON.stringify({type:"customerUpdate_callback",data:obj});
				sendResponse(json,connection);
			});	
		}

		function deleteCustomer(customerid,companyid,connection){
			var obj;
			var sql="DELETE FROM customers WHERE customerid="+customerid+" AND companyid="+companyid+";";
			con.query(sql, function (err, result, fields) {
				if(result.affectedRows){
					obj={
						msg:'CustomerDeleteSuccess'
					}								
				}
				else{
					obj={
						msg:'CustomerDeleteFail'
					}
				}
				var json=JSON.stringify({type:"customerDelete_callback",data:obj});
				sendResponse(json,connection);
			});		
		}

		function insertTransporter(fname,lname,contactno,gstno,address,companyid,connection){
			var obj;
			var sql="INSERT INTO transporters (companyid,fname,lname,contactno,address,gstno) values("+companyid+",'"+fname+"','"+lname+"','"+contactno+"','"+address+"','"+gstno+"');";
			con.query(sql, function (err, result, fields) {
				if(result.affectedRows){
					obj={
						msg:'TransporterInsertSuccess'
					}								
				}
				else{
					obj={
						msg:'TransporterInsertFail'
					}
				}
				var json=JSON.stringify({type:"TransporterInsert_callback",data:obj});
				sendResponse(json,connection);
			});
		}

		function updateTransporter(transportid,fname,lname,contactno,gstno,address,companyid,connection){
			var obj;
			var sql="UPDATE transporters set fname='"+fname+"',lname='"+lname+"',contactno='"+contactno+"',address='"+address+"',gstno='"+gstno+"' WHERE transportid="+transportid+" AND companyid="+companyid+";";
			con.query(sql, function (err, result, fields) {
				if(result.affectedRows){
					obj={
						msg:'TransporterUpdateSuccess'
					}								
				}
				else{
					obj={
						msg:'TransporterUpdateFail'
					}
				}
				var json=JSON.stringify({type:"TransporterUpdate_callback",data:obj});
				sendResponse(json,connection);
			});
		}
		
		function deleteTransporter(transportid,companyid,connection){
			var obj;
			var sql="DELETE FROM transporters WHERE transportid="+transportid+" AND companyid="+companyid+";";
			con.query(sql, function (err, result, fields) {
				if(result.affectedRows){
					obj={
						msg:'TransporterDeleteSuccess'
					}								
				}
				else{
					obj={
						msg:'TransporterDeleteFail'
					}
				}
				var json=JSON.stringify({type:"TransporterDelete_callback",data:obj});
				sendResponse(json,connection);
			});
		}

		function insertProduct(name,length,width,thickness,companyid,connection){
			var obj;
			var sql="INSERT INTO products (productname,length,width,thickness,companyid) values('"+name+"',"+length+","+width+","+thickness+","+companyid+");";
			con.query(sql, function (err, result, fields) {
				// if(err)
				// 	throw err;
				if(result.affectedRows){
					obj={
						msg:'ProductInsertSuccess'
					}								
				}
				else{
					obj={
						msg:'ProductInsertFail'
					}
				}
				var json=JSON.stringify({type:"ProductInsert_callback",data:obj});
				sendResponse(json,connection);
			});
		}

		function updateProduct(productid,name,length,width,thickness,companyid,connection){
			var obj;
			var sql="UPDATE products set productname='"+name+"',length='"+length+"',width='"+width+"',thickness='"+thickness+"' WHERE productid="+productid+" AND companyid="+companyid+";";
			console.log(sql);
			con.query(sql, function (err, result, fields) {
				if(result.affectedRows){
					obj={
						msg:'ProductUpdateSuccess'
					}								
				}
				else{
					obj={
						msg:'ProductUpdateFail'
					}
				}
				var json=JSON.stringify({type:"ProductUpdate_callback",data:obj});
				sendResponse(json,connection);
			});
		}

		function deleteProduct(productid,companyid,connection){
			var obj;
			var sql="DELETE FROM products WHERE productid="+productid+" AND companyid="+companyid+";";
			con.query(sql, function (err, result, fields) {
				if(result.affectedRows){
					obj={
						msg:'ProductDeleteSuccess'
					}								
				}
				else{
					obj={
						msg:'ProductDeleteFail'
					}
				}
				var json=JSON.stringify({type:"ProductDelete_callback",data:obj});
				sendResponse(json,connection);
			});
		}

		function insertUnit(name,offset,companyid,connection){
			var obj;
			var sql="INSERT INTO unitmaster (unitname,offset,companyid) values('"+name+"',"+offset+","+companyid+");";
			//console.log(sql);
			con.query(sql, function (err, result, fields) {
				if(result.affectedRows){
					obj={
						msg:'UnitInsertSuccess'
					}								
				}
				else{
					obj={
						msg:'UnitInsertFail'
					}
				}
				var json=JSON.stringify({type:"insertUnit_callback",data:obj});
				sendResponse(json,connection);
			});
		}

		function updateUnit(unitid,name,offset,companyid,connection){
			var obj;
			var sql="UPDATE unitmaster set unitname='"+name+"',offset="+offset+" WHERE unitid="+unitid+" AND companyid="+companyid+";";
			console.log(sql);
			con.query(sql, function (err, result, fields) {
				if(result.affectedRows){
					obj={
						msg:'UnitUpdateSuccess'
					}								
				}
				else{
					obj={
						msg:'UnitUpdateFail'
					}
				}
				var json=JSON.stringify({type:"UnitUpdate_callback",data:obj});
				sendResponse(json,connection);
			});
		}

		function deleteUnit(unitid,companyid,connection){
			var obj;
			var sql="DELETE FROM unitmaster WHERE unitid="+unitid+" AND companyid="+companyid+";";
			con.query(sql, function (err, result, fields) {
				if(result.affectedRows){
					obj={
						msg:'UnitDeleteSuccess'
					}								
				}
				else{
					obj={
						msg:'UnitDeleteFail'
					}
				}
				var json=JSON.stringify({type:"UnitDelete_callback",data:obj});
				sendResponse(json,connection);
			});
		}

		function getAllCustomers(companyid){
			var arr=[];
			var sql="SELECT * from customers where companyid="+companyid+";";
			con.query(sql, function (err, result, fields) {
				for(var index in result){
					var obj={
						customerid:result[index].customerid,
						companyid:result[index].companyid,
						fname:result[index].fname,
						lname:result[index].lname,
						contactno:result[index].contactno,
						address:result[index].address,
						gstno:result[index].gstno,
					}
					arr.push(obj); 
				}
				var json=JSON.stringify({type:"getAllCustomer_callback",data:arr});
				sendResponse(json,connection);				
			});
		}

		function getAllTransporters(companyid){
			var arr=[];
			var sql="SELECT * from transporters where companyid="+companyid+";";
			con.query(sql, function (err, result, fields) {
				for(var index in result){
					var obj={
						transportid:result[index].transportid,
						companyid:result[index].companyid,
						fname:result[index].fname,
						lname:result[index].lname,
						contactno:result[index].contactno,
						address:result[index].address,
						gstno:result[index].gstno,
					}
					arr.push(obj); 
				}
				var json=JSON.stringify({type:"getAllTransporter_callback",data:arr});
				sendResponse(json,connection);				
			});
		}

		function getAllProducts(companyid){
			var arr=[];
			var sql="SELECT * from products where companyid="+companyid+";";
			con.query(sql, function (err, result, fields) {
				for(var index in result){
					var obj={
						productid:result[index].productid,
						productname:result[index].productname,
						length:result[index].length,
						width:result[index].width,
						thickness:result[index].thickness						
					}
					arr.push(obj); 
				}
				var json=JSON.stringify({type:"getAllProducts_callback",data:arr});
				sendResponse(json,connection);				
			});
		}

		function getAllProductList(companyid){
			var arr=[];
			var sql="SELECT * from products where companyid="+companyid+";";
			con.query(sql, function (err, result, fields) {
				for(var index in result){
					var obj={
						productid:result[index].productid,
						productname:result[index].productname,
						length:result[index].length,
						width:result[index].width,
						thickness:result[index].thickness						
					}
					arr.push(obj); 
				}
				var json=JSON.stringify({type:"getAllProductList_callback",data:arr});
				sendResponse(json,connection);				
			});
		}

		function getSalesChallanNo(companyid){
			var sql="SELECT companyid as 'companyid', MAX(challanno) AS 'LastChallan' FROM   challanmaster where companyid="+companyid+" GROUP BY companyid";
			con.query(sql, function (err, result, fields) {
				var obj={
					companyid:result[0].companyid,
					challanno:result[0].LastChallan
				}
				var json=JSON.stringify({type:"getSalesChallanNo_callback",data:obj});
				sendResponse(json,connection);
			});
		}

		function getAllCustomerList(companyid){
			var arr=[];
			var sql="SELECT fname,lname,customerid from customers where companyid="+companyid+";";
			con.query(sql, function (err, result, fields) {
				for(var index in result){
					var obj={
						customerid 		: 	result[index].customerid,
						fname 			: 	result[index].fname,
						lname 			: 	result[index].lname,						
					}
					arr.push(obj); 
				}
				var json=JSON.stringify({type:"getAllCustomerList_callback",data:arr});
				sendResponse(json,connection);				
			});
		}

		function getAllUnitsList(companyid){
			var arr=[];
			var sql="SELECT Unitid,unitname,offset from unitmaster where companyid="+companyid+";";
			con.query(sql, function (err, result, fields) {
				for(var index in result){
					var obj={
						unitid 			: 	result[index].unitid,
						unitname 		: 	result[index].unitname,
						offset 			: 	result[index].offset,						
					}
					arr.push(obj); 
				}
				var json=JSON.stringify({type:"getAllUnitList_callback",data:arr});
				sendResponse(json,connection);				
			});
		}

		function insertSalesChallan(companyid,customerid,challanno,date,total,product_arr,connection){
			var obj,challanid=0;
			var sql="INSERT INTO challandetail (challanid,productid,unit,quantity,rate,price) values";
			for(var i=0;i<product_arr.length;i++){
				if(i==product_arr.length-1)
					sql += "("+challanid+","+product_arr[i].productid+",'"+product_arr[i].unit+"',"+product_arr[i].qty+","+product_arr[i].rate+","+product_arr[i].price+")";
				else
					sql += "("+challanid+","+product_arr[i].productid+",'"+product_arr[i].unit+"',"+product_arr[i].qty+","+product_arr[i].rate+","+product_arr[i].price+"),";
			}
			console.log(sql);
			con.query(sql, function (err, result, fields) {
				console.log('====================');
				console.log(result);
				console.log('====================');
				if(result.affectedRows){
					obj={
						msg:'insertSalesChallanSuccess'
					}								
				}
				else{
					obj={
						msg:'insertSalesChallanFail'
					}
				}
				var json=JSON.stringify({type:"insertSalesChallan_callback",data:obj});
				sendResponse(json,connection);
			});
		}
		function getAllUnits(companyid){
			var arr=[];
			var sql="SELECT * from unitmaster where companyid="+companyid+";";
			con.query(sql, function (err, result, fields) {
				for(var index in result){
					var obj={
						unitid:result[index].unitid,
						unitname:result[index].unitname,
						offset:result[index].offset,						
					}
					arr.push(obj); 
				}
				var json=JSON.stringify({type:"getAllUnits_callback",data:arr});
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