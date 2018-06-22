"use strict";
var row_id = 1;
var productList=[];
var unitList=[];
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
	  	else if(json.type == "insertUnit_callback") {
	  		if(json.data.msg== 'UnitInsertSuccess'){
	  			notifyInsert();
	  		}
	  		else if(json.data.msg == 'UnitInsertFail'){
	  			notifyFail();
	  		}
	  	}
	  	else if(json.type == "UnitUpdate_callback") {
	  		if(json.data.msg== 'UnitUpdateSuccess'){
	  			notifyUpdate();
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
	  		var htmlString="<option value='-1'>Select Item</option>";
	  		productList=[];
	  		for(var i=0;i<json.data.length;i++){
	  			var obj={
	  				productid:json.data[i].productid,
	  				productname:json.data[i].productname,
	  				length:json.data[i].length,
	  				width:json.data[i].width,
	  				thickness:json.data[i].thickness
	  			}
	  			productList.push(obj);
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
	  	else if(json.type == "getAllUnitList_callback"){
	  		$('#loadUnitDropdown').empty();
	  		var htmlString="<option value='-1'>Select Item</option>";
	  		unitList=[];
	  		for(var i=0;i<json.data.length;i++){
	  			var obj={
	  				unitid:json.data[i].unitid,
	  				unitname:json.data[i].unitname,
	  				offset:json.data[i].offset,	  				
	  			}
	  			unitList.push(obj);
	  			htmlString +='<option value='+json.data[i].unitid+'>'+json.data[i].unitname+'</option>';
	  		}
	  		$('#loadUnitDropdown').append(htmlString);
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

		$('#salesChallanDiv').click(function(){
	    	$('#div_sales_challan').show("slow", function() {
	    		loadAllProductsandChallanNo();
	    	});	
	    });

		$(document).unbind().on('click','.sadd',function(){
	      	addSalesRow();
	    });

	    $(document).on('click','.scut',function(){
	      	$(this).parent().parent().remove();
	    	//alert('sd');
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

	//validate Unit
	$('#clearUnit').click(clearUnit);
	$('#usubmit').click(validateUnit);
	function clearUnit(event){
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

	//Sales challan validate
	$('#ssubmit').click(insertSalesChallan);
	function insertSalesChallan(){
		var salesProductlist=[];
		var total=0;
		
		var companyid=sessionStorage.getItem('companyid');
		var customerid=$('#scustomername').val();
		var date=$('#sDate').val();
		var challanno=$('#schallanno').val();
		
		$('.product_row').each(function(){
			var obj={
				productid : $(this).find('#loadProductsDropdown').val(),
				unit    : $(this).find('#sunit').val(),
				qty     : $(this).find('#squantity').val(),
				rate    : $(this).find('#srate').val(),
				price   : $(this).find('#sprice').val()
			}
			total += parseInt(obj.price);
			
			salesProductlist.push(obj);
        });

        var json=JSON.stringify({usertype: "insertSalesChallan",companyid:companyid,customerid:customerid,challanno:challanno,date:date,total:total,data:salesProductlist});
        console.log(json);
        connection.send(json);
	}
});


function addSalesRow(){
  	var htmlString='<option value="-1">Select Item</option>';
	for(var index in productList)
		htmlString +='<option value='+productList[index].productid+'>'+productList[index].productname+' ( '+productList[index].length+' * '+productList[index].width+' * '+productList[index].thickness+' ) </option>';
	
	var htmlStringUnit='<option value="-1">Select Unit</option>';
	for(var index in unitList)
		htmlStringUnit +='<option value='+unitList[index].unitid+'>'+unitList[index].unitname+'</option>';

	var html = "<tr id='row' class='product_row'><td><select class='form-control' id='loadProductsDropdown' name='loadProductsDropdown'>"+htmlString+"</select></td>";
    	html +=	"<td><select class='form-control' id='loadUnitDropdown' name='loadUnitDropdown'>"+htmlStringUnit+"</select></td>"
        html +=	"<td><input id='squantity' type='text' name='squantity' class='form-control'></td>";                    
        html +=	"<td><input id='srate' type='text' name='srate' class='form-control'></td>";
        html +=	"<td><input id='sprice' type='text' name='sprice' class='form-control'></td>";
        html +=	"<td style='align-items: center;'>";
        html +=	"<a class='sadd' style='margin-top:5px;width: 28px;'><i class='fa fa-plus fa-fw'></i></a>";
        html +=	"<a class='scut' style='margin-left:5px;margin-top:5px;width: 28px;'><i class='fa fa-minus fa-fw'></i></a>";
        html +=	"</td></tr>";
	$('#scontainer').append(html);
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