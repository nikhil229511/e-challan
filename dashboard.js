"use strict";
$(function(){

	window.WebSocket = window.WebSocket || window.MozWebSocket ;
	if(!window.WebSocket){
		alert("Sorry! Your browser doesn't support WebSocket.");
		return;
	}

	setInterval(function(){
		if(connection.readyState!==1){
			console.log("Unable to connect to server. Please try again.");
		}
	},3000);
	if(sessionStorage.getItem('companyid') ==null && sessionStorage.getItem('username') ==null){
		window.location='login.html'
	}
	var connection = new WebSocket('ws://localhost:5005/');
	var htmlString="<strong><em>"+sessionStorage.getItem('username')+"</em></strong>";
	$('#titleUsername').html(htmlString);
	
	connection.onopen = function (message) {
		console.log("connected");
		var obj={
			companyid: sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype:"sendAll",data:obj});
		connection.send(json);
	};

	connection.onmessage = function (message) {
	  	var json = JSON.parse(message.data);
	  	
	  	if(json.type == "customerInsert_callback") {
	  		if(json.data.msg== 'CustomerInsertSuccess'){
	  			notifyInsert();
	  		}
	  		else if(json.data.msg == 'CustomerInsertFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "customerUpdate_callback") {
	  		if(json.data.msg== 'CustomerUpdateSuccess'){
	  			notifyUpdate();
	  		}
	  		else if(json.data.msg == 'CustomerUpdateFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "customerDelete_callback") {
	  		if(json.data.msg== 'CustomerDeleteSuccess'){
	  			notifyDelete();
	  		}
	  		else if(json.data.msg == 'CustomerDeleteFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "TransporterInsert_callback") {
	  		if(json.data.msg== 'TransporterInsertSuccess'){
	  			notifyInsert();
	  		}
	  		else if(json.data.msg == 'TransporterInsertFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "TransporterUpdate_callback") {
	  		if(json.data.msg== 'TransporterUpdateSuccess'){
	  			notifyUpdate();
	  		}
	  		else if(json.data.msg == 'TransporterUpdateFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "TransporterDelete_callback") {
	  		if(json.data.msg== 'TransporterDeleteSuccess'){
	  			notifyDelete();
	  		}
	  		else if(json.data.msg == 'TransporterDeleteFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "ProductInsert_callback") {
	  		if(json.data.msg== 'ProductInsertSuccess'){
	  			notifyInsert();
	  		}
	  		else if(json.data.msg == 'ProductInsertFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "ProductUpdate_callback") {
	  		if(json.data.msg== 'ProductUpdateSuccess'){
	  			notifyUpdate();
	  		}
	  		else if(json.data.msg == 'ProductUpdateFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "ProductDelete_callback") {
	  		if(json.data.msg== 'ProductDeleteSuccess'){
	  			notifyDelete();
	  		}
	  		else if(json.data.msg == 'ProductDeleteFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "getAllCustomer_callback"){
	  		var htmlString="";
	  		for(var i=0;i<json.data.length;i++){
	  			htmlString +='<tr>';
	  			htmlString +='<td>'+json.data[i].fname+'</td>';
	  			htmlString +='<td>'+json.data[i].lname+'</td>';	
	  			htmlString +='<td>'+json.data[i].gstno+'</td>';
	  			htmlString +='<td>'+json.data[i].contactno+'</td>';
	  			htmlString +='<td>'+json.data[i].address+'</td>';
	  			htmlString +="<td><a href='#' onclick=updateCustomer("+json.data[i].customerid+","+json.data[i].companyid+",'"+json.data[i].fname+"','"+json.data[i].lname+"','"+json.data[i].contactno+"','"+json.data[i].gstno+"','"+encodeURIComponent(json.data[i].address) +"'); >";
	  			htmlString +='<i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	  			htmlString +='<a href="#" class="deleteC" id='+json.data[i].customerid+'><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
	  			htmlString +='</tr>';
	  		}
	  		$('#CustomersData').html(htmlString);
	  	}
	  	else if(json.type == "getAllTransporter_callback"){
	  		var htmlString="";
	  		for(var i=0;i<json.data.length;i++){
	  			htmlString +='<tr>';
	  			htmlString +='<td>'+json.data[i].fname+'</td>';
	  			htmlString +='<td>'+json.data[i].lname+'</td>';	
	  			htmlString +='<td>'+json.data[i].gstno+'</td>';
	  			htmlString +='<td>'+json.data[i].contactno+'</td>';
	  			htmlString +='<td>'+json.data[i].address+'</td>';
	  			htmlString +="<td><a href='#' onclick=updateTransporter("+json.data[i].transportid+","+json.data[i].companyid+",'"+json.data[i].fname+"','"+json.data[i].lname+"','"+json.data[i].contactno+"','"+json.data[i].gstno+"','"+encodeURIComponent(json.data[i].address) +"'); >";
	  			htmlString +='<i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	  			htmlString +='<a href="#" class="deleteT" id='+json.data[i].transportid+'><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
	  			htmlString +='</tr>';
	  		}
	  		$('#TransportersData').html(htmlString);
	  	}
	  	else if(json.type == "getAllProducts_callback"){
	  		var htmlString="";
	  		for(var i=0;i<json.data.length;i++){
	  			htmlString +='<tr>';
	  			htmlString +='<td>'+json.data[i].productname+'</td>';
	  			htmlString +='<td>'+json.data[i].length+'</td>';	
	  			htmlString +='<td>'+json.data[i].width+'</td>';
	  			htmlString +='<td>'+json.data[i].thickness+'</td>';
	  			htmlString +="<td><a href='#' onclick=updateProduct("+json.data[i].productid+",'"+encodeURIComponent(json.data[i].productname)+"',"+json.data[i].length+","+json.data[i].width+","+json.data[i].thickness+"); >";
	  			htmlString +='<i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	  			htmlString +='<a href="#" class="deleteP" id='+json.data[i].productid+'><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
	  			htmlString +='</tr>';
	  		}
	  		$('#productsData').html(htmlString);
	  	}
	  	else if(json.type == "getAllProductList_callback"){
	  		console.log('getAllProductList_callback');
	  		var htmlString="";
	  		for(var i=0;i<json.data.length;i++){
	  			htmlString +='<option value='+json.data[i].productid+'>'+json.data[i].productname+' ( '+json.data[i].length+' * '+json.data[i].width+' * '+json.data[i].thickness+' ) </option>';
	  		}
	  		$('#loadProductsDropdown').append(htmlString);
	  	}
	  	//

	  	$('.deleteC').unbind().click(function(){
			deleteCustomer($(this).attr("id"));
		});

		$('.deleteT').unbind().click(function(){
			deleteTransporter($(this).attr("id"));
		});

		$('.deleteP').unbind().click(function(){
			deleteProduct($(this).attr("id"));
		});

		$('#loadProducts').unbind().click(function(){
			loadAllProducts();
		});

	};

	//initial display div setting
	$('#div_dashboard').show();
	$('#div_customers').hide();
	$('#div_transporters').hide();
	$('#div_products').hide();
	$('#div_sales_challan').hide();
	$('#div_sales_return_challan').hide();

	// $('#div_sales_challan').on('show',function(){
	// 	alert('hi');
	// });

	/*$('.app-menu > li > a').click(function(){
		$(this).parent().sibling().find('[class="active"]').removeClass('active');
		$(this).addClass('active');
	});*/
	$('a[href="#"]').click(function (event) { // where href are blank
	   event.preventDefault();
	});
	
	// validation Customer
	$('#customerForm').validate({
		rules:{
			cfname:{
				required: true
			},
			clname:{
				required:true
			},
			ccontactno: {
				required: true,
				maxlength: 10,
				minlength: 10
			},
			cgstno:{
				minlength:15,
				maxlength:15
			},
			caddress:"required"
		},
		messages:{
			cfname: "Enter First Name.",
			clname: "Enter Last Name.",
			ccontactno:{
				required:"Enter Contact Number.",
				maxlength:"Please Enter Valid Number of 10 Digit.",
				minlength:"Please Enter Valid Number of 10 Digit."
			},
			cgstno:{
				maxlength:"Please Enter Valid GST Number of 15 Digit.",
				minlength:"Please Enter Valid GST Number of 15 Digit."	
			},
			caddress:"Enter Address."
		},
		submitHandler:function(){
			insertCustomer();
		}
	});



	function showProducts(){
		alert('show products');
	}
	function insertCustomer(){
		var cfname=$('#cfname').val();
		var clname=$('#clname').val();
		var ccontactno=$('#ccontactno').val();
		var cgstno=$('#cgstno').val();
		var caddress=$('#caddress').val();
		var ccustomerid=$('#ccustomerid').val();
		var obj={
			customerid:ccustomerid,
			fname : cfname,
			lname : clname,
			contactno:ccontactno,
			gstno : cgstno,
			address: caddress,
			companyid: sessionStorage.getItem('companyid')
		};
		var json;
		if($('#ccustomerid').val()=='-1'){
			json=JSON.stringify({usertype: "insertCustomer", data:obj});	
		}
		else{
			json=JSON.stringify({usertype: "updateCustomer", data:obj});
		}
		connection.send(json);
	}

	function deleteCustomer(customerid){
		var obj={
			customerid:customerid,
			companyid:sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype: "deleteCustomer", data:obj});
		connection.send(json);
	}
	
	// validation Transporter
	$('#transporterForm').validate({
		rules:{
			tfname:{
				required: true
			},
			tlname:{
				required:true
			},
			tcontactno: {
				required: true,
				maxlength: 10,
				minlength: 10
			},
			tgstno:{
				minlength:15,
				maxlength:15
			},
			taddress:"required"
		},
		messages:{
			tfname: "Enter First Name.",
			tlname: "Enter Last Name.",
			tcontactno:{
				required:"Enter Contact Number.",
				maxlength:"Please Enter Valid Contact Number of 10 Digit.",
				minlength:"Please Enter Valid Contact Number of 10 Digit."
			},
			tgstno:{
				maxlength:"Please Enter Valid GST Number of 15 Digit.",
				minlength:"Please Enter Valid GST Number of 15 Digit."	
			},
			taddress:"Enter Address."
		},
		submitHandler:function(){
			insertTransporter();
		}
	});

	function insertTransporter(){
		var tfname=$('#tfname').val();
		var tlname=$('#tlname').val();
		var tcontactno=$('#tcontactno').val();
		var tgstno=$('#tgstno').val();
		var taddress=$('#taddress').val();
		var ttransportid=$('#ttransportid').val();

		var obj={
			transportid:ttransportid,
			fname : tfname,
			lname : tlname,
			contactno:tcontactno,
			gstno :tgstno,
			address: taddress,
			companyid: sessionStorage.getItem('companyid')
		};
		
		var json;
		if($('#ttransportid').val()=='-1')
			json=JSON.stringify({usertype: "insertTransporter", data:obj});
		else
			json=JSON.stringify({usertype: "updateTransporter", data:obj});
		connection.send(json);
	}

	function deleteTransporter(transportid){
		var obj={
			transportid:transportid,
			companyid:sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype: "deleteTransporter", data:obj});
		connection.send(json);
	}

	// validation Transporter
	$('#productsForm').validate({
		rules:{
			pname:{
				required: true
			},
			length:{
				required:true,
				number : true
			},
			width: {
				required: true,
				number : true
			},
			thickness:{
				required:true,
				number : true
			}
		},
		messages:{
			pname: "Enter Product Name.",
			length:{
				required: "Enter Length.",	
				number : "Length Should Only be a Number."
			},
			width:{
				required: "Enter Width.",	
				number : "Width Should Only be a Number."
			},
			thickness:{
				required: "Enter Thickness.",	
				number : "Thickness Should Only be a Number."
			}
		},
		submitHandler:function(){
			insertProduct();
		}
	});

	function insertProduct(){
		var name=$('#pname').val();
		var length=$('#length').val();
		var width=$('#width').val();
		var thickness=$('#thickness').val();
		var productid=$('#productid').val();
		
		var obj={
			productid:productid,
			name:name,
			length:length,
			width:width,
			thickness:thickness,
			companyid: sessionStorage.getItem('companyid')
		}
		var json;
		if($('#productid').val() == '-1')
			json=JSON.stringify({usertype: "insertProduct", data:obj});
		else
			json=JSON.stringify({usertype: "updateProduct", data:obj});
		connection.send(json);
	}

	function deleteProduct(productid){
		var obj={
			productid:productid,
			companyid:sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype: "deleteProduct", data:obj});
		connection.send(json);
	}

	function loadAllProducts(){
		var obj={
			productid:productid,
			companyid:sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype: "LoadProduct", data:obj});
		connection.send(json);
	}

});

function updateCustomer(customerid,companyid,fname,lname,contactno,gstno,address){
	$('#ccustomerid').val(customerid);
	$('#cfname').val(fname);
	$('#clname').val(lname);
	$('#ccontactno').val(contactno);
	$('#cgstno').val(gstno);
	$('#caddress').val(decodeURIComponent(address));
}

function updateTransporter(transportid,companyid,fname,lname,contactno,gstno,address){
	$('#ttransportid').val(transportid);
	$('#tfname').val(fname);
	$('#tlname').val(lname);
	$('#tcontactno').val(contactno);
	$('#tgstno').val(gstno);
	$('#taddress').val(decodeURIComponent(address));
}

function updateProduct(productid,productname,length,width,thickness){
	$('#productid').val(productid);
	$('#pname').val(decodeURIComponent(productname));
	$('#length').val(length);
	$('#width').val(width);
	$('#thickness').val(thickness);
}

function notifyUpdate(){
    $.notify({
      	title: "Update Complete : ",
      	message: "Something cool is just updated!",
      	icon: 'fa fa-check' 
    },{
      	type: "success"
    });
};
function notifyInsert(){
    $.notify({
      	title: "Insert Complete : ",
      	message: "Something cool is just Inserted!",
      	icon: 'fa fa-check' 
    },{
      	type: "success"
    });
};
function notifyDelete(){
    $.notify({
      	title: "Delete Complete : ",
      	message: "Something cool is just Deleted!",
      	icon: 'fa fa-check' 
    },{
      	type: "success"
    });
};
function notifyFail(){
    $.notify({
      	title: "Error : ",
      	message: "Something went Wrong!",
      	icon: 'fa fa-check' 
    },{
      	type: "danger"
    });
};