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
	if(sessionStorage.getItem('companyid') ==null || sessionStorage.getItem('username') ==null){
		window.location='login.html'
	}
	var connection = new WebSocket('ws://localhost:5005/');
	
	connection.onopen = function (message) {
		console.log("connected");
		var obj={
			companyid: sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype:"sendAll",data:obj});
		connection.send(json);
	};

	connection.onclose=function(){

	};

	connection.onmessage = function (message) {
	  	var json = JSON.parse(message.data);
	  	
	  	if(json.type == "customerInsert_callback") {
	  		if(json.data.msg== 'CustomerSuccess'){
	  			alert('Record saved successfully.');
	  		}
	  		if(json.data.msg == 'CustomerFail'){
	  			alert('Some Error Occured.');	
	  		}
	  	}
	  	else if(json.type == "TransporterInsert_callback") {
	  		if(json.data.msg== 'TransporterSuccess'){
	  			alert('Record saved successfully.');
	  		}
	  		if(json.data.msg == 'TransporterFail'){
	  			alert('Some Error Occured.');	
	  		}
	  	}
	  	else if(json.type == "ProductInsert_callback") {
	  		if(json.data.msg== 'ProductSuccess'){
	  			alert('Record saved successfully.');
	  		}
	  		if(json.data.msg == 'ProductFail'){
	  			alert('Some Error Occured.');	
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
	  			htmlString +='<td><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-trash" aria-hidden="true"></i></td>';
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
	  			htmlString +='<td><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-trash" aria-hidden="true"></i></td>';
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
	  			htmlString +='<td><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-trash" aria-hidden="true"></i></td>';
	  			htmlString +='</tr>';
	  		}
	  		$('#productsData').html(htmlString);
	  	}
	};

	//initial display div setting
	$('#div_dashboard').show();
	$('#div_customers').hide();
	$('#div_transporters').hide();
	$('#div_products').hide();

	/*$('.app-menu > li > a').click(function(){
		$(this).parent().sibling().find('[class="active"]').removeClass('active');
		$(this).addClass('active');
	});*/

	/*validation Customer*/
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

	function insertCustomer(){
		var cfname=$('#cfname').val();
		var clname=$('#clname').val();
		var ccontactno=$('#ccontactno').val();
		var cgstno=$('#cgstno').val();
		var caddress=$('#caddress').val();

		var obj={
			fname : cfname,
			lname : clname,
			contactno:ccontactno,
			gstno : cgstno,
			address: caddress,
			companyid: sessionStorage.getItem('companyid')
		};
		
		var json=JSON.stringify({usertype: "insertCustomer", data:obj});
		connection.send(json);
	}
	
	/*validation Transporter*/
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

		var obj={
			fname : tfname,
			lname : tlname,
			contactno:tcontactno,
			gstno :tgstno,
			address: taddress,
			companyid: sessionStorage.getItem('companyid')
		};
		
		var json=JSON.stringify({usertype: "insertTransporter", data:obj});
		connection.send(json);
	}

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

		var obj={
			name:name,
			length:length,
			width:width,
			thickness:thickness,
			companyid: sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype: "insertProduct", data:obj});
		connection.send(json);
	}

});