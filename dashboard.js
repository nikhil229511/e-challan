"use strict";


$(document).ready(function() {

});

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
	  		$('#loadProductsDropdown').empty();
	  		var htmlString="";
	  		for(var i=0;i<json.data.length;i++){
	  			htmlString +='<option value='+json.data[i].productid+'>'+json.data[i].productname+' ( '+json.data[i].length+' * '+json.data[i].width+' * '+json.data[i].thickness+' ) </option>';
	  		}
	  		$('#loadProductsDropdown').append(htmlString);
	  	}
	  	else if(json.type == "getAllCustomerList_callback"){
	  		$('#scustomername').empty();
	  		var htmlString="";
	  		for(var i=0;i<json.data.length;i++){
	  			htmlString +='<option value='+json.data[i].customerid+'>'+json.data[i].fname+' '+json.data[i].lname+'</option>';
	  		}
	  		$('#scustomername').append(htmlString);
	  	}
	  	else if(json.type == "getSalesChallanNo_callback"){
	  		$('#schallanno').val(json.data.challanno+1);
	  	}
	  	
	  	$('.deleteC').unbind().click(function(){
			deleteCustomer($(this).attr("id"));
		});

		$('.deleteT').unbind().click(function(){
			deleteTransporter($(this).attr("id"));
		});

		$('.deleteP').unbind().click(function(){
			deleteProduct($(this).attr("id"));
		});

		$('#salesChallanDiv').click(function(){
	    	$('#div_sales_challan').show("slow", function() {
	    		loadAllProductsandChallanNo();
	    	});	
	    });

	    // $('#loadProductsDropdown').on('change',function(){
	    // 	alert(this.value);
	    // })

	};

	//initial display div setting
	$('#div_dashboard').show();
	$('#div_customers').hide();
	$('#div_transporters').hide();
	$('#div_products').hide();
	$('#div_sales_challan').hide();
	$('#div_sales_return_challan').hide();

	/*$('.app-menu > li > a').click(function(){
		$(this).parent().sibling().find('[class="active"]').removeClass('active');
		$(this).addClass('active');
	});*/
	$('a[href="#"]').click(function (event) { // where href are blank
	   event.preventDefault();
	});

	// validation Customer
	$('#csubmit').click(validateCustomer);
	$('#clearCustomer').click(clearCustomer);	
	function clearCustomer(event){
		event.preventDefault();
		$('#cfname').val("");
		$('#clname').val("");
		$('#ccontactno').val("");
		$('#cgstno').val("");
		$('#caddress').val("");
		$('#ccustomerid').val('-1');	
	}
	function validateCustomer(event){
		event.preventDefault();
		var msg='';
		var flag=0;
		var cfname=$('#cfname').val();
		var clname=$('#clname').val();
		var ccontactno=$('#ccontactno').val();
		var cgstno=$('#cgstno').val();
		var caddress=$('#caddress').val();
		var ccustomerid=$('#ccustomerid').val();
		
		if(cfname =='' || cfname == null){
			flag=1;
			msg="Enter First Name.";
		}
		else if(clname == '' || clname== null){
			flag=1;
			msg="Enter Last Name.";
		}
		else if(ccontactno == '' || ccontactno== null){
			flag=1;
			msg="Enter Contact Number."
		}
		else if(ccontactno.length!=10 || !ccontactno.match(/^\d+$/)){
			flag=1;
			msg="Contact Number should be exactly 10 numbers.."	
		}
		else if(caddress == '' || caddress== null){
			flag=1;
			msg="Enter Address."			
		}
		else if(cgstno.length !=0){
			if(cgstno.length!=15){
				flag=1;
				msg="GST number should be exactly 15 characters.."		
			}
		}
		if(flag == 0)
			insertCustomer();
		else{
			notifyValidateError(msg);
		}
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
	$('#tsubmit').click(validateTransporter);
	$('#clearTransporter').click(clearTransporter);
	function clearTransporter(event){
		event.preventDefault();
		$('#tfname').val("");
		$('#tlname').val("");
		$('#tcontactno').val("");
		$('#tgstno').val("");
		$('#taddress').val("");
		$('#ttransportid').val('-1');
	}
	function validateTransporter(event){
		event.preventDefault();
		var msg='';
		var flag=0;
		
		var tfname=$('#tfname').val();
		var tlname=$('#tlname').val();
		var tcontactno=$('#tcontactno').val();
		var tgstno=$('#tgstno').val();
		var taddress=$('#taddress').val();
		var ttransportid=$('#ttransportid').val();

		if(tfname =='' || tfname == null){
			flag=1;
			msg="Enter First Name.";
		}
		else if(tlname == '' || tlname== null){
			flag=1;
			msg="Enter Last Name.";
		}
		else if(tcontactno == '' || tcontactno== null){
			flag=1;
			msg="Enter Contact Number."
		}
		else if(tcontactno.length!=10 || !tcontactno.match(/^\d+$/)){
			flag=1;
			msg="Contact Number should be exactly 10 Numbers.."	
		}
		else if(taddress == '' || taddress== null){
			flag=1;
			msg="Enter Address."			
		}
		else if(tgstno.length !=0){
			if(tgstno.length!=15){
				flag=1;
				msg="GST number should be exactly 15 characters.."		
			}
		}

		if(flag == 0)
			insertTransporter();
		else{
			notifyValidateError(msg);
		}
	}
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

	// validation Product
	$('#psubmit').click(validateProduct);
	$('#clearProduct').click(clearProduct);
	function clearProduct(even){
		event.preventDefault();
		$('#pname').val("");
		$('#length').val("");
		$('#width').val("");
		$('#thickness').val("");
		$('#productid').val('-1');
	}
	function validateProduct(){
		event.preventDefault();
		var msg='';
		var flag=0;
		
		var name=$('#pname').val();
		var len=$('#length').val();
		var width=$('#width').val();
		var thickness=$('#thickness').val();
		var productid=$('#productid').val();

		if(name =='' || name == null){
			flag=1;
			msg="Enter Product Name.";
		}
		else if(len == '' || len == null){
			flag=1;
			msg="Enter Length.";
		}
		else if(!len.match(/^\d+$/)){
			flag=1;
			msg="Length Should be Number.";
		}
		else if(width == '' || width== null){
			flag=1;
			msg="Enter Width.";
		}
		else if(!width.match(/^\d+$/)){
			flag=1;
			msg="width Should be Number.";
		}else if(thickness == '' || thickness== null){
			flag=1;
			msg="Enter Thickness.";			
		}
		else if(!thickness.match(/^\d+$/)){
			flag=1;
			msg="Thickness Should be Number.";
		}
		if(flag == 0)
			insertProduct();
		else{
			notifyValidateError(msg);
		}
	}
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
	function loadAllProductsandChallanNo(){
		var obj={
			productid:productid,
			companyid:sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype: "LoadSalesChallan", data:obj});
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
function notifyValidateError(msg){
    $.notify({
      	title: "Error : ",
      	message: msg,
      	icon: 'fa fa-check' 
    },{
      	type: "danger"
    });
};