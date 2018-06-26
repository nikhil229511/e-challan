"use strict";
var row_id = 1;
var productList=[];
var unitList=[];
var customers=[];
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
	  			clearCustomer();
	  		}
	  		else if(json.data.msg == 'CustomerInsertFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "customerUpdate_callback") {
	  		if(json.data.msg== 'CustomerUpdateSuccess'){
	  			notifyUpdate();
	  			clearCustomer();
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
	  			clearTransporter();
	  		}
	  		else if(json.data.msg == 'TransporterInsertFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "TransporterUpdate_callback") {
	  		if(json.data.msg== 'TransporterUpdateSuccess'){
	  			notifyUpdate();
	  			clearTransporter();
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
	  			clearProduct();
	  		}
	  		else if(json.data.msg == 'ProductInsertFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "ProductUpdate_callback") {
	  		if(json.data.msg== 'ProductUpdateSuccess'){
	  			notifyUpdate();
	  			clearProduct();
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
	  	else if(json.type == "insertUnit_callback") {
	  		if(json.data.msg== 'UnitInsertSuccess'){
	  			notifyInsert();
	  			clearUnit();
	  		}
	  		else if(json.data.msg == 'UnitInsertFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "UnitUpdate_callback") {
	  		if(json.data.msg== 'UnitUpdateSuccess'){
	  			notifyUpdate();
	  			clearUnit();
	  		}
	  		else if(json.data.msg == 'UnitUpdateFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "UnitDelete_callback") {
	  		if(json.data.msg== 'UnitDeleteSuccess'){
	  			notifyDelete();
	  		}
	  		else if(json.data.msg == 'UnitDeleteFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "insertSalesChallan_callback") {
	  		if(json.data.msg== 'ChallanInsertSuccess'){
	  			notifyInsert();
	  		}
	  		else if(json.data.msg == 'ChallanInsertFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "insertSalesReturnChallan_callback") {
	  		if(json.data.msg== 'ChallanReturnInsertSuccess'){
	  			notifyInsert();
	  		}
	  		else if(json.data.msg == 'ChallanReturnInsertFail'){
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
	  	else if(json.type == "getAllUnits_callback"){
	  		var htmlString="";
	  		for(var i=0;i<json.data.length;i++){
	  			htmlString +='<tr>';
	  			htmlString +='<td>'+json.data[i].unitname+'</td>';
	  			htmlString +='<td>'+json.data[i].offset+'</td>';	
	  			htmlString +="<td><a href='#' onclick=updateUnit("+json.data[i].unitid+",'"+encodeURIComponent(json.data[i].unitname)+"',"+json.data[i].offset+"); >";
	  			htmlString +='<i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	  			htmlString +='<a href="#" class="deleteU" id='+json.data[i].unitid+'><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
	  			htmlString +='</tr>';
	  		}
	  		$('#unitsData').html(htmlString);
	  	}
	  	else if(json.type == "getAllProductList_callback"){
	  		$('#loadProductsDropdown').empty();
	  		$('#loadProductsDropdownsr').empty();
	  		var htmlString="<option value='-1'>Select Item</option>";
	  		productList=[];
	  		for(var i=0;i<json.data.length;i++){
	  			var obj={
	  				productid:json.data[i].productid,
	  				productname:json.data[i].productname,
	  				length:json.data[i].length,
	  				width:json.data[i].width,
	  				thickness:json.data[i].thickness,
	  				totol_offset: (json.data[i].length * json.data[i].width)
	  			}
	  			productList.push(obj);
	  			htmlString +='<option data-value='+obj.totol_offset+' value='+json.data[i].productid+'>'+json.data[i].productname+' ( '+json.data[i].length+' * '+json.data[i].width+' * '+json.data[i].thickness+' ) </option>';
	  		}
	  		$('#loadProductsDropdown').append(htmlString);
	  		$('#loadProductsDropdownsr').append(htmlString);
	  	}
	  	else if(json.type == "getAllCustomerList_callback"){
	  		$('#scustomername').empty();
	  		$('#srcustomername').empty();
	  		var htmlString="<option value='-1'>Select Customer</option>";
	  		for(var i=0;i<json.data.length;i++){
	  			var obj={
	  				customerid 	: json.data[i].customerid,
	  				fname		: json.data[i].fname,
	  				lname		: json.data[i].lname,
	  				address 	: json.data[i].address,
	  				gstno 		: json.data[i].gstno,
	  				contactno 	: json.data[i].contactno
	  			}
	  			customers.push(obj);
	  			htmlString +='<option value='+json.data[i].customerid+'>'+json.data[i].fname+' '+json.data[i].lname+'</option>';
	  		}
	  		$('#scustomername').append(htmlString);
	  		$('#srcustomername').append(htmlString);
	  	}
	  	else if(json.type == "getSalesChallanNo_callback"){
	  		
	  		$('#schallanno').val(json.data.challanno+1);
	  	}
	  	else if(json.type == "getSalesReturnChallanNo_callback"){
	  		
	  		$('#srchallanno').val(json.data.challanno+1);
	  	}
	  	else if(json.type == "getAllUnitList_callback"){
	  		$('#loadUnitDropdown').empty();
	  		$('#loadUnitDropdownsr').empty();
	  		var htmlString="<option value='-1'>Select Unit</option>";
	  		unitList=[];
	  		for(var i=0;i<json.data.length;i++){
	  			var obj={
	  				unitid:json.data[i].unitid,
	  				unitname:json.data[i].unitname,
	  				offset:json.data[i].offset,	  				
	  			}
	  			unitList.push(obj); 
	  			htmlString +='<option data-offset='+json.data[i].offset+' value='+json.data[i].unitid+'>'+json.data[i].unitname+'</option>';
	  		}
	  		$('#loadUnitDropdown').append(htmlString);
	  		$('#loadUnitDropdownsr').append(htmlString);
	  	}
	  	else if(json.type == "insertSalesChallan_callback"){
	  		if(json.data.msg== 'insertSalesChallanSuccess'){
	  			notifyInsert();
	  		}
	  		else if(json.data.msg == 'insertSalesChallanFail'){
	  			notifyFail();
	  		}
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
		
		$('.deleteU').unbind().click(function(){
			deleteUnit($(this).attr("id"));
		});

		$('#salesChallanDiv').unbind().click(function(){
	    	$('#div_sales_challan').show("slow", function() {
	    		loadAllProductsandChallanNo();
	    	});	
	    });
	    $('#salesReturnChallanDiv').unbind().click(function(){
	    	$('#div_sales_return_challan').show("slow", function() {
	    		loadAllProductsandChallanNosr();
	    	});	
	    });
		$(document).unbind().on('click','.sadd',function(){
	      	addSalesRow();
	      	$('#loadUnitDropdown').val($('#loadUnitDropdown option:first').val());
	      	$('#loadProductsDropdown').val($('#loadProductsDropdown option:first').val());
	      	$('#srate').val("");
	      	$('#squantity').val("");
	      	$('#sprice').val("");   	
	    });
	    $(document).on('click','.sradd',function(){
	      	addSalesReturnRow();
	      	$('#loadUnitDropdownsr').val($('#loadUnitDropdownsr option:first').val());
	      	$('#loadProductsDropdownsr').val($('#loadProductsDropdownsr option:first').val());
	      	$('#srrate').val("");
	      	$('#srquantity').val("");
	      	$('#srprice').val("");
	    });
	    $(document).on('click','.scut',function(){
	      	
	      	$(this).parent().parent().remove();	    	
	    });
	};

	//initial display div setting
	$('#div_dashboard').show();
	$('#div_customers').hide();
	$('#div_transporters').hide();
	$('#div_products').hide();
	$('#div_sales_challan').hide();
	$('#div_sales_return_challan').hide();
	$('#div_units').hide();

	$('a[href="#"]').click(function (event) { // where href are blank
	   event.preventDefault();
	});

	// validation Customer
	$('#csubmit').click(validateCustomer);
	$('#clearCustomer').click(clearCustomer);	
	function clearCustomer(event){
		if(event)
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
		if(event)
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
		if(event)
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
			companyid:sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype: "LoadSalesChallan", data:obj});
		connection.send(json);
	}
	function loadAllProductsandChallanNosr(){
		var obj={
			companyid:sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype: "LoadSalesReturnChallan", data:obj});
		connection.send(json);
	}

	//validate Unit
	$('#clearUnit').click(clearUnit);
	$('#usubmit').click(validateUnit);
	function clearUnit(event){
		if(event)
			event.preventDefault();
		$('#uname').val("");
		$('#uoffset').val("");
		$('#unitid').val('-1');
	}
	function validateUnit(){
		event.preventDefault();
		var msg='';
		var flag=0;
		
		var name=$('#uname').val();
		var offset=$('#uoffset').val();
		var unitid=$('#unitid').val();

		if(name =='' || name == null){
			flag=1;
			msg="Enter Unit Name.";
		}
		else if(offset == '' || offset == null){
			flag=1;
			msg="Enter Offset Value.";
		}
		else if(!offset.match(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/)){
			flag=1;
			msg="Offset Should be Number.";
		}
		
		if(flag == 0)
			insertUnit();
		else{
			notifyValidateError(msg);
		}
	}
	function insertUnit(){
		var name=$('#uname').val();
		var offset=$('#uoffset').val();
		var unitid=$('#unitid').val();
		var obj={
			unitid:unitid,
			name:name,
			offset:offset,
			companyid: sessionStorage.getItem('companyid')
		}
		var json;
		if($('#unitid').val() == '-1')
			json=JSON.stringify({usertype: "insertUnit", data:obj});
		else
			json=JSON.stringify({usertype: "updateUnit", data:obj});
		connection.send(json);
	}
	function deleteUnit(unitid){
		var obj={
			unitid:unitid,
			companyid:sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype: "deleteUnit", data:obj});
		connection.send(json);
	}

	var ans,qty,measurement,offset,rate;
	$('.calculate').change(function(){
		if($('option:selected', this).attr('data-value'))
			measurement = $('option:selected', this).attr('data-value');
		if($('option:selected', this).attr('data-offset'))
			offset=$('option:selected', this).attr('data-offset');
		if($('#squantity').val())
			qty=$('#squantity').val();
		if($('#srate').val())
			rate=$('#srate').val();
		ans=(measurement/offset)*qty*rate;
		ans=ans.toFixed(2);
		$('#sprice').val(ans);
	});
	$('.calculatesr').change(function(){
		if($('option:selected', this).attr('data-value'))
			measurement = $('option:selected', this).attr('data-value');
		if($('option:selected', this).attr('data-offset'))
			offset=$('option:selected', this).attr('data-offset');
		if($('#srquantity').val())
			qty=$('#srquantity').val();
		if($('#srrate').val())
			rate=$('#srrate').val();
		ans=(measurement/offset)*qty*rate;
		ans=ans.toFixed(2);
		$('#srprice').val(ans);
	});

	$('#printsaleschallan').click(printsaleschallan);
	function printsaleschallan(){
		$('#salesChallanNo').text(" "+$('#schallanno').val());
		$('#salesDate').text($('#sDate').val());
		$('#salesCustomerName').text($('#scustomername option:selected').text());
		for(var index in customers){
			if(customers[index].customerid == $('#scustomername option:selected').val()){
				$('#salesCustomerAddress').text(customers[index].address);
				break;
			}
		}
		$('.hideforprint').css('display','none');
		//var tablehtml=$('#listSalesChallan').html()
		$('#salesPrintList').html($('#listSalesChallan').html());
		
		$('#salesgrandTotal').text($('#grandTotal').text());
		printDiv('sales_print_div');
	}
	$('#printsalesreturnchallan').click(printsalesreturnchallan);
	function printsalesreturnchallan(){
		$('#salesReturnChallanNo').text(" "+$('#srchallanno').val());
		$('#salesReturnDate').text($('#srDate').val());
		$('#salesReturnCustomerName').text($('#srcustomername option:selected').text());
		for(var index in customers){
			if(customers[index].customerid == $('#srcustomername option:selected').val()){
				$('#salesReturnCustomerAddress').text(customers[index].address);
				break;
			}
		}
		$('.hideforprint').css('display','none');
		$('#salesReturnPrintList').html($('#listSalesReturnChallan').html());
		
		$('#salesReturngrandTotal').text($('#srgrandTotal').text());
		printDiv('sales_return_print_div');
	}

	function printDiv(divID) {
		var divElements = document.getElementById(divID).innerHTML;
        var oldPage = document.body.innerHTML;
        document.body.innerHTML = 
          "<html><head><title></title></head><body><pre><br><br><br><br></pre>"+divElements+"</body>";
        window.print();
        document.body.innerHTML = oldPage;      
    }

	$('#ssubmit').click(insertSalesChallan);
	function insertSalesChallan(){
		var salesProductlist=[];
		var total=0;
		
		var companyid=sessionStorage.getItem('companyid');
		var customerid=$('#scustomername').val();
		var date=$('#sDate').val();
		var challanno=$('#schallanno').val();
		
		$('.itemRow').each(function(){
			var tds=$(this).find('td');
			var prodid,unit,qty,rate,price;
			tds.each(function(){
				if($(this).attr('data-Productid')){
					prodid=$(this).attr('data-Productid');
				}
				else if($(this).attr('data-unit')){
					unit=$(this).attr('data-unit');
				}
				else if($(this).attr('data-qty')){
					qty=$(this).attr('data-qty');
				}
				else if($(this).attr('data-rate')){
					rate=$(this).attr('data-rate');
				}
				else if($(this).attr('data-price')){
					price=$(this).attr('data-price');
				}	
			});
			var obj={
				productid : prodid,
				unit      : unit,
				qty       : qty,
				rate      : rate,
				price     : price
			}
			total += parseInt(obj.price);
			salesProductlist.push(obj);	
		});
		$('#grandTotal').text(total);
		var json=JSON.stringify({usertype: "insertSalesChallan",companyid:companyid,customerid:customerid,challanno:challanno,date:date,total:total,data:salesProductlist});
        connection.send(json);

        //print bill
	}
	$('#clearsaleschallan').click(clearsaleschallan);
	function clearsaleschallan(){
		//alert('hi');
		$('#div_sales_challan').hide();
		$('#div_dashboard').show();
	}
	$('#srsubmit').click(insertSalesReturnChallan);
	function insertSalesReturnChallan(){
		var salesReturnProductlist=[];
		var total=0;
		
		var companyid=sessionStorage.getItem('companyid');
		var customerid=$('#srcustomername').val();
		var date=$('#srDate').val();
		var challanno=$('#srchallanno').val();
		
		$('.itemRowsr').each(function(){
			var tds=$(this).find('td');
			var prodid,unit,qty,rate,price;
			tds.each(function(){
				if($(this).attr('data-Productid')){
					prodid=$(this).attr('data-Productid');
				}
				else if($(this).attr('data-unit')){
					unit=$(this).attr('data-unit');
				}
				else if($(this).attr('data-qty')){
					qty=$(this).attr('data-qty');
				}
				else if($(this).attr('data-rate')){
					rate=$(this).attr('data-rate');
				}
				else if($(this).attr('data-price')){
					price=$(this).attr('data-price');
				}	
			});
			var obj={
				productid : prodid,
				unit      : unit,
				qty       : qty,
				rate      : rate,
				price     : price
			}
			total += parseInt(obj.price);
			salesReturnProductlist.push(obj);	
		});
		$('#srgrandTotal').text(total);
		var json=JSON.stringify({usertype: "insertSalesReturnChallan",companyid:companyid,customerid:customerid,challanno:challanno,date:date,total:total,data:salesReturnProductlist});
        connection.send(json);
	}
	$('#clearsalesreturnchallan').click(clearsalesreturnchallan);
	function clearsalesreturnchallan(){
		//alert('hi');
		$('#div_sales_return_challan').hide();
		$('#div_dashboard').show();
	}

});
function addSalesRow(){
	var itemid    =$("#loadProductsDropdown option:selected").val();
	var itemName  =$("#loadProductsDropdown option:selected").text();
	var itemUnit  =$("#loadUnitDropdown option:selected").text();
	var itemQty   =$('#squantity').val();
	var itemRate  =$('#srate').val();
	var itemPrice =$('#sprice').val();

	var itemMeasurement = $('#loadProductsDropdown option:selected').attr('data-value');
	var itemOffset=$('#loadUnitDropdown option:selected').attr('data-offset');

	var html  = "<tr class='itemRow'>";
		html +=	"<td id='itemid' data-ProductId="+itemid+">"+itemName+"</td>";
    	html +=	"<td id='itemunit' data-unit="+itemUnit+">"+itemUnit+"</td>"
        html +=	"<td id='itemqty' data-qty="+itemQty+" style='text-align:right;'>"+itemQty+"</td>";                    
        html +=	"<td id='itemrate' data-rate="+itemRate+" style='text-align:right;'><span data-prefix>₹</span>"+itemRate+"</td>";
        html +=	"<td id='itemprice' data-price="+itemPrice+" style='text-align:right;'><span data-prefix>₹</span>"+itemPrice+"</td>";
        html +=	"<td style='align-items: center;' class='hideforprint'>";
        //html +=	"<i class='fa fa-pencil' aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        html +=	"<a class='scut'><i class='fa fa-trash' aria-hidden='true'></i></a>";
        html +=	"</td>";
        html += "</tr>";

    $('#listSalesChallan').append(html);
}
function addSalesReturnRow(){
	var itemid    =$("#loadProductsDropdownsr option:selected").val();
	var itemName  =$("#loadProductsDropdownsr option:selected").text();
	var itemUnit  =$("#loadUnitDropdownsr option:selected").text();
	var itemQty   =$('#srquantity').val();
	var itemRate  =$('#srrate').val();
	var itemPrice =$('#srprice').val();

	var itemMeasurement = $('#loadProductsDropdownsr option:selected').attr('data-value');
	var itemOffset=$('#loadUnitDropdownsr option:selected').attr('data-offset');

	var html  = "<tr class='itemRowsr'>";
		html +=	"<td id='itemidsr' data-ProductId="+itemid+">"+itemName+"</td>";
    	html +=	"<td id='itemunitsr' data-unit="+itemUnit+">"+itemUnit+"</td>"
        html +=	"<td id='itemqtysr' data-qty="+itemQty+" style='text-align:right;'>"+itemQty+"</td>";                    
        html +=	"<td id='itemratesr' data-rate="+itemRate+" style='text-align:right;'><span data-prefix>₹</span>"+itemRate+"</td>";
        html +=	"<td id='itempricesr' data-price="+itemPrice+" style='text-align:right;'><span data-prefix>₹</span>"+itemPrice+"</td>";
        html +=	"<td style='align-items: center;' class='hideforprint'>";
        //html +=	"<i class='fa fa-pencil' aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        html +=	"<a class='scut'><i class='fa fa-trash' aria-hidden='true'></i></a>";
        html +=	"</td>";
        html += "</tr>";

    $('#listSalesReturnChallan').append(html);
}
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
function updateUnit(unitid,unitname,offset){
	$('#unitid').val(unitid);
	$('#uname').val(decodeURIComponent(unitname));
	$('#uoffset').val(offset);
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