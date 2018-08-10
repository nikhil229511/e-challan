"use strict";
var row_id = 1;
var productList=[];
var unitList=[];
var customers=[];
var customerName=[];
var salesGrand;
var salesReturnGrand;
var companyid,customerid,date,challanno;

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
		window.location='index.html'
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
	  		var html="<option value='-1'>Select Customer</option>";

	  		for(var i=0;i<json.data.length;i++){
	  			var strName=json.data[i].fname+" "+json.data[i].lname;
	  			customerName.push(strName);
	  			html +='<option>'+strName+'</option>';

	  			htmlString +='<tr>';
	  			htmlString +='<td>'+json.data[i].fname+'</td>';
	  			htmlString +='<td>'+json.data[i].lname+'</td>';	
	  			htmlString +='<td>'+json.data[i].gstno+'</td>';
	  			htmlString +='<td>'+json.data[i].contactno+'</td>';
	  			htmlString +='<td>'+json.data[i].address+'</td>';
	  			htmlString +="<td><a href='#' onclick=updateCustomer("+json.data[i].customerid+","+json.data[i].companyid+",'"+json.data[i].fname+"','"+json.data[i].lname+"','"+json.data[i].contactno+"','"+json.data[i].gstno+"','"+encodeURIComponent(json.data[i].address) +"'); >";
	  			htmlString +='<i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	  			htmlString +='<a href="#" class="demoSwalCustomer" id='+json.data[i].customerid+'><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
	  			htmlString +='</tr>';
	  		}
	  		$('#srsearchcustomername').html(html);
	  		$('#ssearchcustomername').html(html);
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
	  			htmlString +='<a href="#" class="demoSwalTransporter" id='+json.data[i].transportid+'><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
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
	  			htmlString +='<a href="#" class="demoSwalProduct" id='+json.data[i].productid+'><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
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
	  			htmlString +='<a href="#" class="demoSwalUnit" id='+json.data[i].unitid+'><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
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
	  	else if(json.type == "SearchSalesChallanNowise_callback"){
	  		if(json.data.msg == 'ChallanSelectFail'){
	  			notifyFail();
	  		}
	  		else if(json.data.msg == 'ChallanSelectSuccess'){
	  			$('#searchSalesCustomerName').text(json.dataM.customername);
	  			$('#searchSalesChallanNo').text(json.dataM.challanno);
	  			$('#SearchSalesDate').text(json.dataM.date);
	  			$('#searchSalesgrandTotal').text(json.dataM.total);
	  			$('#searchSalesCustomerAddress').text(json.dataM.address);

	  			$('#searchSalesPrintList').empty();
	  			var html='';
	  			for(var index in json.dataD){
	  				html  = "<tr class='itemRow'>";
					html +=	"<td id='itemid' data-ProductId="+json.dataD[index].productid+">"+json.dataD[index].productname+"</td>";
			    	html +=	"<td id='itemunit' data-unit="+json.dataD[index].unit+">"+json.dataD[index].unit+"</td>"
			        html +=	"<td id='itemqty' data-qty="+json.dataD[index].quantity+" style='text-align:right;'>"+json.dataD[index].quantity+"</td>";                    
			        html +=	"<td id='itemrate' data-rate="+json.dataD[index].rate+" style='text-align:right;'><span data-prefix>₹</span>"+json.dataD[index].rate+"</td>";
			        html +=	"<td id='itemprice' data-price="+json.dataD[index].price+" style='text-align:right;'><span data-prefix>₹</span>"+json.dataD[index].price+"</td>";
			        html += "</tr>";

    				$('#searchSalesPrintList').append(html);
	  			}
	  			$('#sales_report_Challanwise_div').show();	  			
	  		}
	  	}
	  	else if(json.type == "SearchSalesReturnChallanNowise_callback"){
	  		if(json.data.msg == 'ChallanSelectFail'){
	  			notifyFail();
	  		}
	  		else if(json.data.msg == 'ChallanSelectSuccess'){
	  			
	  			$('#searchSalesReturnCustomerName').text(json.dataM.customername);
	  			$('#searchSalesReturnChallanNo').text(json.dataM.challanno);
	  			$('#SearchSalesReturnDate').text(json.dataM.date);
	  			$('#searchSalesReturngrandTotal').text(json.dataM.total);
	  			$('#searchSalesReturnCustomerAddress').text(json.dataM.address);

	  			$('#searchSalesPrintList').empty();
	  			var html='';
	  			for(var index in json.dataD){
	  				html  = "<tr class='itemRow'>";
					html +=	"<td id='itemid' data-ProductId="+json.dataD[index].productid+">"+json.dataD[index].productname+"</td>";
			    	html +=	"<td id='itemunit' data-unit="+json.dataD[index].unit+">"+json.dataD[index].unit+"</td>"
			        html +=	"<td id='itemqty' data-qty="+json.dataD[index].quantity+" style='text-align:right;'>"+json.dataD[index].quantity+"</td>";                    
			        html +=	"<td id='itemrate' data-rate="+json.dataD[index].rate+" style='text-align:right;'><span data-prefix>₹</span>"+json.dataD[index].rate+"</td>";
			        html +=	"<td id='itemprice' data-price="+json.dataD[index].price+" style='text-align:right;'><span data-prefix>₹</span>"+json.dataD[index].price+"</td>";
			        html += "</tr>";

    				$('#searchSalesReturnPrintList').append(html);
	  			}
	  			$('#sales_return_report_Challanwise_div').show();	  			
	  		}	  		
	  	}
	  	else if(json.type == "SearchSalesChallanDatewise_callback"){
	  		$('#searchSalesFromDate').text($('#ssearchfromdate').val());
			$('#searchSalesToDate').text($('#ssearchtodate').val());

			$('#searchSalesPrintListDatewise').empty();
			var html="";
			
			for(var i in json.data){
				html += "<tr>";
				html += "<td>"+json.data[i].fname+" "+json.data[i].lname+"</td>";
				html += "<td>"+json.data[i].challanno+"</td>";
				html += "<td>"+json.data[i].date+"</td>";
				html += "<td>"+json.data[i].contactno+"</td>";
				html += "<td style='text-align:right;'> <span data-prefix>₹</span>"+json.data[i].total+"</td>";
				html += "</tr>";

			}  	
			$('#searchSalesPrintListDatewise').append(html);		 			
	  	}
	  	else if(json.type == "SearchSalesReturnChallanDatewise_callback"){
	  		$('#searchSalesReturnFromDate').text($('#srsearchfromdate').val());
			$('#searchSalesReturnToDate').text($('#srsearchtodate').val());

			$('#searchSalesReturnPrintListDatewise').empty();
			var html="";
			
			for(var i in json.data){
				/*var d1=json.data[i].date;
				d1=d1.substring(0,10);
	  			d1=d1.split("-");
	  			var d=d1[2]+"/"+d1[1]+"/"+d1[0];
				*/
				html += "<tr>";
				html += "<td>"+json.data[i].fname+" "+json.data[i].lname+"</td>";
				html += "<td>"+json.data[i].challanno+"</td>";
				html += "<td>"+json.data[i].date+"</td>";
				html += "<td>"+json.data[i].contactno+"</td>";
				html += "<td style='text-align:right;'> <span data-prefix>₹</span>"+json.data[i].total+"</td>";
				html += "</tr>";

			}  	
			$('#searchSalesReturnPrintListDatewise').append(html);		 			
	  	}
	  	else if(json.type == "SearchSalesChallanCustomerwise_callback"){
	  		$('#searchSalesCustomerName1').text(""+json.data[0].fname+" "+json.data[0].lname+"");
			$('#searchSalesAddress').text(json.data[0].address);
			$('#searchSalesContactNo').text(json.data[0].contactno);

			$('#searchSalesPrintListCustomerwise').empty();
			var html="";
			
			for(var i in json.data){
				html += "<tr>";
				html += "<td>"+json.data[i].challanno+"</td>";
				html += "<td>"+json.data[i].date+"</td>";
				html += "<td style='text-align:right;'> <span data-prefix>₹</span>"+json.data[i].total+"</td>";
				html += "</tr>";

			}  	
			$('#searchSalesPrintListCustomerwise').append(html);		 			
	  	}
	  	else if(json.type == "SearchSalesReturnChallanCustomerwise_callback"){
	  		$('#searchSalesReturnCustomerName1').text(""+json.data[0].fname+" "+json.data[0].lname+"");
			$('#searchSalesReturnAddress').text(json.data[0].address);
			$('#searchSalesReturnContactNo').text(json.data[0].contactno);

			$('#searchSalesReturnPrintListCustomerwise').empty();
			var html="";
			if(json.data.length){
				for(var i in json.data){
					html += "<tr>";
					html += "<td>"+json.data[i].challanno+"</td>";
					html += "<td>"+json.data[i].date+"</td>";
					html += "<td style='text-align:right;'> <span data-prefix>₹</span>"+json.data[i].total+"</td>";
					html += "</tr>";
				}
				$('#searchSalesReturnPrintListCustomerwise').append(html);
			}
			else{
				alert("No Data Found");
			}					 			
	  	}
	  	else if(json.type == "logout_callback"){
	  		sessionStorage.removeItem('companyid');
	  		sessionStorage.removeItem('username');
	  		window.location='./../Public/index.html';
		}
		else if(json.type == "changePassword_callback"){
			if(json.data.msg== 'changePasswordSuccess'){
				notifyChangePassword();
				sessionStorage.removeItem('companyid');
				sessionStorage.removeItem('username');
				window.location('index.html');
			}
			else if(json.data.msg == 'changePasswordFail'){
				var msg="New Password and Confirm Password Mismatch.";
				notifyValidateError(msg);
			}
		}
		  

	  	$('.demoSwalCustomer').click(function(e){
	  		var id=$(e.currentTarget).attr('id');
	      	swal({
	      		title: "Are you sure?",
	      		text: "You will not be able to recover this Change!",
	      		type: "warning",
	      		showCancelButton: true,
	      		confirmButtonText: "Yes, delete it!",
	      		cancelButtonText: "No, cancel!",
	      		closeOnConfirm: false,
	      		closeOnCancel: false
	      	}, function(isConfirm) {
	      		if (isConfirm) {
	      			deleteCustomer(id);
	      			swal("Deleted!", "Record has been deleted.", "success");
	      		} else {
	      			swal("Cancelled", "Customer is Not Deleted.", "error");
	      		}
	      	});
	    });

	  	$('.demoSwalTransporter').click(function(e){
	  		var id=$(e.currentTarget).attr('id');
	      	swal({
	      		title: "Are you sure?",
	      		text: "You will not be able to recover this Change!",
	      		type: "warning",
	      		showCancelButton: true,
	      		confirmButtonText: "Yes, delete it!",
	      		cancelButtonText: "No, cancel!",
	      		closeOnConfirm: false,
	      		closeOnCancel: false
	      	}, function(isConfirm) {
	      		if (isConfirm) {
	      			deleteTransporter(id);
	      			swal("Deleted!", "Record has been deleted.", "success");
	      		} else {
	      			swal("Cancelled", "Customer is Not Deleted.", "error");
	      		}
	      	});
	    });

	    $('.demoSwalProduct').click(function(e){
	  		var id=$(e.currentTarget).attr('id');
	      	swal({
	      		title: "Are you sure?",
	      		text: "You will not be able to recover this Change!",
	      		type: "warning",
	      		showCancelButton: true,
	      		confirmButtonText: "Yes, delete it!",
	      		cancelButtonText: "No, cancel!",
	      		closeOnConfirm: false,
	      		closeOnCancel: false
	      	}, function(isConfirm) {
	      		if (isConfirm) {
	      			deleteProduct(id);
	      			swal("Deleted!", "Record has been deleted.", "success");
	      		} else {
	      			swal("Cancelled", "Customer is Not Deleted.", "error");
	      		}
	      	});
	    });

	    $('.demoSwalUnit').click(function(e){
	  		var id=$(e.currentTarget).attr('id');
	      	swal({
	      		title: "Are you sure?",
	      		text: "You will not be able to recover this Change!",
	      		type: "warning",
	      		showCancelButton: true,
	      		confirmButtonText: "Yes, delete it!",
	      		cancelButtonText: "No, cancel!",
	      		closeOnConfirm: false,
	      		closeOnCancel: false
	      	}, function(isConfirm) {
	      		if (isConfirm) {
	      			deleteUnit(id);
	      			swal("Deleted!", "Record has been deleted.", "success");
	      		} else {
	      			swal("Cancelled", "Customer is Not Deleted.", "error");
	      		}
	      	});
	    });

		$('#salesChallanDiv').unbind().click(function(){
	    	$('#div_sales_challan').show("slow", function() {
	    		$('#grandTotal').val("");
	    		salesGrand=0;		
	    		loadAllProductsandChallanNo();
	    	});	
	    });	    
	    $('#salesReturnChallanDiv').unbind().click(function(){
	    	$('#div_sales_return_challan').show("slow", function() {
	    		$('#srgrandTotal').val("");
	    		salesReturnGrand=0;
	    		loadAllProductsandChallanNosr();
	    	});	
	    });
		$(document).unbind().on('click','.sadd',function(){	      		      	
	      	addSalesRow();
	      	
	    });

	    $('#searchchallannos').change(function(){
	    	$('#sales_report_Challanwise_div').hide();
	    });
	    $('#searchchallannosr').change(function(){
	    	$('#sales_return_report_Challanwise_div').hide();
	    });
	    $('#ssearchfromdate').change(function(){
	    	$('#sales_report_datewise_div').hide();
	    });
	    $('#ssearchtodate').change(function(){
	    	$('#sales_report_datewise_div').hide();
	    });
	    $('#srsearchfromdate').change(function(){
	    	$('#sales_return_report_datewise_div').hide();
	    });
	    $('#srsearchtodate').change(function(){
	    	$('#sales_return_report_datewise_div').hide();
	    });
	    $('#ssearchcustomername').change(function(){
			$('#searchSalesCustomerName1').text("");
			$('#searchSalesAddress').text("");
			$('#searchSalesContactNo').text("");
			$('#searchSalesPrintListCustomerwise').html("");
			
			$('#sales_report_customerwise_div').hide();
	    });
	    $('#srsearchcustomername').change(function(){
			$('#searchSalesReturnCustomerName1').text("");
			$('#searchSalesReturnAddress').text("");
			$('#searchSalesReturnContactNo').text("");
			$('#searchSalesReturnPrintListCustomerwise').html("");

	    	$('#sales_return_report_customerwise_div').hide();
	    });
	    

	    $(document).on('click','.sradd',function(){
	      	addSalesReturnRow();	      	
	    });

	    $(document).on('click','.scut',function(){
	      	var priceval=parseFloat($(this).parent().parent().find('#itemprice').attr('data-price'));
	      	priceval = priceval.toFixed(2);
	      	salesGrand = parseFloat(salesGrand) -  parseFloat(priceval);
	      	salesReturnGrand = parseFloat(salesReturnGrand) -  parseFloat(priceval);
	      	$('#grandTotal').text(salesGrand);
	      	$(this).parent().parent().remove();	    	
	    });

	    $(document).on('click','.srcut',function(){
	      	var pricevall=parseFloat($(this).parent().parent().find('#itempricesr').attr('data-price'));
	      	pricevall = pricevall.toFixed(2);
	      	salesReturnGrand = parseFloat(salesReturnGrand) -  parseFloat(pricevall);
	      	$('#srgrandTotal').text(salesReturnGrand);
	      	
	      	$(this).parent().parent().remove();	    	
	    });
	};

	//initial display div setting
	var div_active=sessionStorage.getItem('activeDiv');
	$('#'+div_active).show();
	if(div_active == 'div_sales_challan'){
		setTimeout(function(){
			salesGrand=0;
  			loadAllProductsandChallanNo();
		},1);
	}
	else if(div_active == 'div_sales_return_challan'){
		setTimeout(function(){
			salesReturnGrand=0;
  			loadAllProductsandChallanNosr();
		},1);	
	}

	$('a[href="#"]').click(function (event) {
	   event.preventDefault();
	});

	//change Password
	$('#ChangePassword').click(validatePassword);
	function validatePassword(event){
		event.preventDefault();
		var msg='';
		var flag=0;
		var currentpassword=$('#CurrentPassword').val();
		var newpassword=$('#NewPassword').val();
		var confirmnewpassword=$('#ConfirmNewPassword').val();
		
		if(currentpassword =='' || currentpassword == null){
			flag=1;
			msg="Enter Current Password.";
		}
		else if(!currentpassword.match(/(?=.{9,})(?=.*?[^\w\s])(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*/)){
			flag=1;
			msg="Current Password Must Contain At least 1 Capital letter, 1 Small letter, 1 Numeric Value and 1 Symbol.";
		}
		else if(newpassword == '' || newpassword== null){
			flag=1;
			msg="Enter New Password.";
		}
		else if(!newpassword.match(/(?=.{9,})(?=.*?[^\w\s])(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*/)){
			flag=1;
			msg="New Password Must Contain At least 1 Capital letter, 1 Small letter, 1 Numeric Value and 1 Symbol.";
		}
		else if(confirmnewpassword == '' || confirmnewpassword== null){
			flag=1;
			msg="Enter Confirm Password."
		}
		else if(newpassword != confirmnewpassword){
			flag=1;
			msg="New Password and Confirm Password Mismatch"	
		}
		
		//check error flag.
		if(flag == 0)
			changePassword();
		else{
			notifyValidateError(msg);
		}
	}
	function changePassword(){
		var currentpassword=$('#CurrentPassword').val();
		var newpassword=$('#NewPassword').val();
		var username=sessionStorage.getItem('username');
		var obj={
			username:username,
			currentpassword:currentpassword,
			newpassword:newpassword
		}
		var json=JSON.stringify({usertype: "changePassword", data:obj});	
		connection.send(json);
	}

	//Customer
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
		var letters = /^[A-Za-z]+$/;
		if(cfname =='' || cfname == null){
			flag=1;
			msg="Enter First Name.";
		}
		else if(!cfname.match(/^[A-Za-z]+$/)){
			flag=1;
			msg="First Name Only Accepts Alphabets."
		}
		else if(clname == '' || clname== null){
			flag=1;
			msg="Enter Last Name.";
		}
		else if(!clname.match(/^[A-Za-z]+$/)){
			flag=1;
			msg="Last Name Only Accepts Alphabets."
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
			if(!cgstno.match(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)){
				flag=1;
				msg="Incorrect GST Number Format."		
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
		$('#cfname').focus();
	}
	function deleteCustomer(customerid){
		var obj={
			customerid:customerid,
			companyid:sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype: "deleteCustomer", data:obj});
		connection.send(json);
	}

	//Transporter
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
		else if(!tfname.match(/^[A-Za-z]+$/)){
			flag=1;
			msg="First Name Only Accepts Alphabets."
		}
		else if(tlname == '' || tlname== null){
			flag=1;
			msg="Enter Last Name.";
		}
		else if(!tlname.match(/^[A-Za-z]+$/)){
			flag=1;
			msg="First Name Only Accepts Alphabets."
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
			if(!tgstno.match(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)){
				flag=1;
				msg="Incorrect GST Number Format."		
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
		$('#tfname').focus();
	}
	function deleteTransporter(transportid){
		var obj={
			transportid:transportid,
			companyid:sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype: "deleteTransporter", data:obj});
		connection.send(json);
	}

	//Product
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
		else if(!len.match(/^\d+(\.\d{1,2})?$/)){
			flag=1;
			msg="Length Should be Number.";
		}
		else if(width == '' || width== null){
			flag=1;
			msg="Enter Width.";
		}
		else if(!width.match(/^\d+(\.\d{1,2})?$/)){
			flag=1;
			msg="width Should be Number.";
		}else if(thickness == '' || thickness== null){
			flag=1;
			msg="Enter Thickness.";			
		}
		else if(!thickness.match(/^\d+(\.\d{1,2})?$/)){
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
		$('#pname').focus();
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

	//Unit
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
		$('#uname').focus();
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
		$('#salesPrintList').html($('#listSalesChallan').html());
		
		$('#salesgrandTotal').text($('#grandTotal').text());

		companyid=sessionStorage.getItem('companyid');
		customerid=$('#scustomername').val();
		date=$('#sDate').val();
		challanno=$('#schallanno').val();
		printDiv('sales_print_div');	
	}

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
		
		companyid=sessionStorage.getItem('companyid');
		customerid=$('#srcustomername').val();
		date=$('#srDate').val();
		challanno=$('#srchallanno').val();
		printDiv('sales_return_print_div');
	}

	$('#btnPrintSalesChallanNowise').click(PrintSalesChallanNowise);
	function PrintSalesChallanNowise(){
		if(event)
			event.preventDefault();
		printDiv('sales_report_Challanwise_div');		
	}

	$('#btnPrintSalesReturnChallanNowise').click(PrintSalesReturnChallanNowise);
	function PrintSalesReturnChallanNowise(){
		if(event)
			event.preventDefault();
		printDiv('sales_return_report_Challanwise_div');
	}

	$('#btnPrintSalesChallanDatewise').click(PrintSalesChallanDatewise);
	function PrintSalesChallanDatewise(){
		if(event)
			event.preventDefault();
		printDiv('sales_report_datewise_div');
	}

	$('#btnPrintSalesReturnChallanDatewise').click(PrintSalesReturnChallanDatewise);
	function PrintSalesReturnChallanDatewise(){
		if(event)
			event.preventDefault();
		printDiv('sales_return_report_datewise_div');
	}

	$('#btnPrintSalesChallanCustomerwise').click(PrintSalesChallanCustomerwise);
	function PrintSalesChallanCustomerwise(){
		if(event)
			event.preventDefault();
		printDiv('sales_report_customerwise_div');
	}

	$('#btnPrintSalesReturnChallanCustomerwise').click(PrintSalesReturnChallanCustomerwise);
	function PrintSalesReturnChallanCustomerwise(){
		if(event)
			event.preventDefault();
		printDiv('sales_return_report_customerwise_div');
	}

	function printDiv(divID) {
		var divElements = document.getElementById(divID).innerHTML;
        var oldPage = document.body.innerHTML;
        document.body.innerHTML = 
          "<html><head><title></title></head><body><pre><br><br><br><br></pre>"+divElements+"</body>";
        window.print();
        document.body.innerHTML = oldPage;  
        $('#div_dashboard').show();
        location.reload();
        $('#div_sales_challan').hide();    
    }

	$('#ssubmit').click(popSalesPrint);
	function popSalesPrint(){
		if($('#scustomername').val()=='-1'){
			var msg="Please Select Customer Name.";
			notifyValidateError(msg);
			return false;
		}
		else if($('#sDate').val()== ''){
			var msg="Please Select Date.";
			notifyValidateError(msg);
			return false;
		}
		else if($('#grandTotal').text()== '' || $('#grandTotal').text()== '0'){
			var msg="Blank Challan can not be saved.";
			notifyValidateError(msg);
			return false;
		}

		swal({
      		title: "Do you want to print challan?",
      		//text: "You will not be able to recover this Change!",
      		type: "info",
      		showCancelButton: true,
      		confirmButtonText: "Yes!",
      		cancelButtonText: "No!",
      		closeOnConfirm: true,
      		closeOnCancel: true
      	}, function(isConfirm) {
      		if (isConfirm) {
      			insertSalesChallan();
      			printsaleschallan();
      		} else {
      			insertSalesChallan();
      		}
      	});	
	}
	function insertSalesChallan(){
		var salesProductlist=[];
		var total=0;
		
		companyid=sessionStorage.getItem('companyid');
		customerid=$('#scustomername').val();
		date=$('#sDate').val();
		challanno=$('#schallanno').val();
		date=date.replace(/\//g, "-");
		var t=date.split('-');
		date=t[2]+"-"+t[1]+"-"+t[0];
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
		var json=JSON.stringify({usertype: "insertSalesChallan",companyid:companyid,customerid:customerid,challanno:challanno,date:date,total:total,data:salesProductlist});
        connection.send(json);
        location.reload();
	}
	
	$('#clearsaleschallan').click(clearsaleschallan);
	function clearsaleschallan(){		
		$('#listSalesChallan').html("");
		$('#grandTotal').html("");
		$('#div_sales_challan').hide();
		$('#div_dashboard').show();
	}
	
	$('#srsubmit').click(popSalesReturnPrint);
	function popSalesReturnPrint(){
		if($('#srcustomername').val()=='-1'){
			var msg="Please Select Customer Name.";
			notifyValidateError(msg);
			return false;
		}
		else if($('#srDate').val()== ''){
			var msg="Please Select Date.";
			notifyValidateError(msg);
			return false;
		}
		else if($('#srgrandTotal').text()== '' || $('srgrandTotal').text()== '0'){
			var msg="Blank Challan can not be saved.";
			notifyValidateError(msg);
			return false;
		}
		
		swal({
      		title: "Do you want to print challan?",
      		type: "info",
      		showCancelButton: true,
      		confirmButtonText: "Yes!",
      		cancelButtonText: "No!",
      		closeOnConfirm: true,
      		closeOnCancel: true
      	}, function(isConfirm) {
      		if (isConfirm) {
      			insertSalesReturnChallan();
      			printsalesreturnchallan();
      		} else {
      			insertSalesReturnChallan();
      		}
      	});	
	}
	function insertSalesReturnChallan(){
		var salesReturnProductlist=[];
		var total=0;
		
		var companyid=sessionStorage.getItem('companyid');
		var customerid=$('#srcustomername').val();
		var date=$('#srDate').val();
		var challanno=$('#srchallanno').val();
		date=date.replace(/\//g, "-");
		var t=date.split('-');
		date=t[2]+"-"+t[1]+"-"+t[0];
		
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
		var json=JSON.stringify({usertype: "insertSalesReturnChallan",companyid:companyid,customerid:customerid,challanno:challanno,date:date,total:total,data:salesReturnProductlist});
        connection.send(json);
        location.reload();
	}
	
	$('#clearsalesreturnchallan').click(clearsalesreturnchallan);
	function clearsalesreturnchallan(){
		$('#listSalesReturnChallan').html("");
		$('#srgrandTotal').html("");
		$('#div_sales_return_challan').hide();
		$('#div_dashboard').show();
	}

	$('#btnSearchSalesChallanNowise').click(SearchSalesChallanNowise);
	function SearchSalesChallanNowise(){
		if(event)
			event.preventDefault();
		var obj={
			challanno 	: 	$('#searchchallannos').val(),
			companyid 	: 	sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype:"SearchSalesChallanNowise" , data:obj});
		connection.send(json);
	}

	$('#btnSearchSalesReturnChallanNowise').click(SearchSalesReturnChallanNowise);
	function SearchSalesReturnChallanNowise(){
		if(event)
			event.preventDefault();
		var obj={
			challanno 	: 	$('#searchchallannosr').val(),
			companyid 	: 	sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype:"SearchSalesReturnChallanNowise" , data:obj});
		connection.send(json);
	}

	$('#btnSearchSalesChallanDatewise').click(SearchSalesChallanDatewise);
	function SearchSalesChallanDatewise(){
		if(event)
			event.preventDefault();
		var fromdate=$('#ssearchfromdate').val();
		fromdate=fromdate.replace(/\//g, "-");
		var t=fromdate.split('-');
		fromdate=t[2]+"-"+t[1]+"-"+t[0];
		var todate=$('#ssearchtodate').val();
		todate=todate.replace(/\//g, "-");
		var t=todate.split('-');
		todate=t[2]+"-"+t[1]+"-"+t[0];
		var obj={
			fromDate 	: 	fromdate,
			toDate 		: 	todate,
			companyid 	: 	sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype:"SearchSalesChallanDatewise" , data:obj});
		connection.send(json);

		$('#sales_report_datewise_div').show();
	}

	$('#btnSearchSalesReturnChallanDatewise').click(SearchSalesReturnChallanDatewise);
	function SearchSalesReturnChallanDatewise(){
		if(event)
			event.preventDefault();
		var fromdate=$('#srsearchfromdate').val();
		fromdate=fromdate.replace(/\//g, "-");
		var t=fromdate.split('-');
		fromdate=t[2]+"-"+t[1]+"-"+t[0];
		
		var todate=$('#srsearchtodate').val();
		todate=todate.replace(/\//g, "-");
		var t=todate.split('-');
		todate=t[2]+"-"+t[1]+"-"+t[0];

		var obj={
			fromDate 	: 	fromdate,
			toDate 		: 	todate,
			companyid 	: 	sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype:"SearchSalesReturnChallanDatewise" , data:obj});
		connection.send(json);

		$('#sales_return_report_datewise_div').show();
	}

	$('#btnSearchSalesChallanCustomerwise').click(SearchSalesChallanCustomerwise);
	function SearchSalesChallanCustomerwise(){
		if(event)
			event.preventDefault();
		var cname=$('#ssearchcustomername').val();
		cname=cname.split(" ");
		var obj={
			fname 		: 	cname[0],
			lname 		: 	cname[1],
			companyid 	: 	sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype:"SearchSalesChallanCustomerwise" , data:obj});
		connection.send(json);

		$('#sales_report_customerwise_div').show();
	}
	$('#btnSearchSalesReturnChallanCustomerwise').click(SearchSalesReturnChallanCustomerwise);
	function SearchSalesReturnChallanCustomerwise(){
		if(event)
			event.preventDefault();
		var cname=$('#srsearchcustomername').val();
		cname=cname.split(" ");
		var obj={
			fname 		: 	cname[0],
			lname 		: 	cname[1],
			companyid 	: 	sessionStorage.getItem('companyid')
		}
		var json=JSON.stringify({usertype:"SearchSalesReturnChallanCustomerwise" , data:obj});
		connection.send(json);

		$('#sales_return_report_customerwise_div').show();
	}

	$('#logout').click(logout);
	function logout(){
		var json=JSON.stringify({usertype:"logout"});
		connection.send(json);
	}

});

function addSalesRow(){
	var itemid    =$("#loadProductsDropdown option:selected").val();
	var itemName  =$("#loadProductsDropdown option:selected").text();
	var itemUnit  =$("#loadUnitDropdown option:selected").text();
	var itemQty   =$('#squantity').val();
	var itemRate  =$('#srate').val();
	var itemPrice =$('#sprice').val();
	var msg,flag=0;
	if($("#loadProductsDropdown").val()==-1){
		flag=1;
		msg="Please Select Product.";
  	}
  	else if($('#loadUnitDropdown').val()==-1){
  		flag=1;
		msg="Please Select Unit of Measurement.";
  	}
  	else if(itemQty==""){
  		flag=1;
		msg="Please Enter Quantity.";
  	}
  	else if(! itemQty.match(/^\d+$/)){
  		flag=1;
		msg="Quantity can only be Numbers.";
  	}
  	else if(itemRate==""){
  		flag=1;
		msg="Please Enter Rate.";
  	}
  	else if(! itemRate.match(/^\d+(\.\d{1,2})?$/)){
  		flag=1;
		msg="Rate Can only be Numbers.";	
  	}

  	if(flag==1){
  		notifyValidateError(msg);
  		$('#loadProductsDropdown').focus();
  		return false;
  	}

  	salesGrand =parseFloat(salesGrand) + parseFloat($('#sprice').val());
  	salesGrand=salesGrand.toFixed(2);
	      	

	var itemMeasurement = $('#loadProductsDropdown option:selected').attr('data-value');
	var itemOffset=$('#loadUnitDropdown option:selected').attr('data-offset');

	var html  = "<tr class='itemRow'>";
		html +=	"<td id='itemid' data-ProductId="+itemid+">"+itemName+"</td>";
    	html +=	"<td id='itemunit' data-unit="+itemUnit+">"+itemUnit+"</td>"
        html +=	"<td id='itemqty' data-qty="+itemQty+" style='text-align:right;'>"+itemQty+"</td>";                    
        html +=	"<td id='itemrate' data-rate="+itemRate+" style='text-align:right;'><span data-prefix>₹</span>"+itemRate+"</td>";
        html +=	"<td id='itemprice' data-price="+itemPrice+" style='text-align:right;'><span data-prefix>₹</span>"+itemPrice+"</td>";
        html +=	"<td style='align-items: center;' class='hideforprint'>";
        html +=	"<a class='scut'><i class='fa fa-trash' aria-hidden='true'></i></a>";
        html +=	"</td>";
        html += "</tr>";

    $('#listSalesChallan').append(html);
    $('#grandTotal').text(salesGrand);

    //restore original state of the panel.

  	$('#loadUnitDropdown').val($('#loadUnitDropdown option:first').val());
  	$('#loadProductsDropdown').val($('#loadProductsDropdown option:first').val());
  	$('#srate').val("");
  	$('#squantity').val("");
  	$('#sprice').val("");
  	$('#loadProductsDropdown').focus();
}
function addSalesReturnRow(){
	var itemid    =$("#loadProductsDropdownsr option:selected").val();
	var itemName  =$("#loadProductsDropdownsr option:selected").text();
	var itemUnit  =$("#loadUnitDropdownsr option:selected").text();
	var itemQty   =$('#srquantity').val();
	var itemRate  =$('#srrate').val();
	var itemPrice =$('#srprice').val();
	var msg,flag=0;
	
	if($("#loadProductsDropdownsr").val()==-1){
		flag=1;
		msg="Please Select Product.";
  	}
  	else if($('#loadUnitDropdownsr').val()==-1){
  		flag=1;
		msg="Please Select Unit of Measurement.";
  	}
  	else if(itemQty==""){
  		flag=1;
		msg="Please Enter Quantity.";
  	}
  	else if(! itemQty.match(/^\d+$/)){
  		flag=1;
		msg="Quantity can only be Numbers.";
  	}
  	else if(itemRate==""){
  		flag=1;
		msg="Please Enter Rate.";
  	}
  	else if(! itemRate.match(/^\d+(\.\d{1,2})?$/)){
  		flag=1;
		msg="Rate Can only be Numbers.";	
  	}

  	if(flag==1){
  		notifyValidateError(msg);
  		$('#loadProductsDropdownsr').focus();
  		return false;
  	}

	salesReturnGrand =parseFloat(salesReturnGrand) + parseFloat($('#srprice').val());
  	salesReturnGrand=salesReturnGrand.toFixed(2);
	      	
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
        html +=	"<a class='srcut'><i class='fa fa-trash' aria-hidden='true'></i></a>";
        html +=	"</td>";
        html += "</tr>";

    $('#listSalesReturnChallan').append(html);
    $('#srgrandTotal').text(salesReturnGrand);

    //restore panel to original state
  	$('#loadUnitDropdownsr').val($('#loadUnitDropdownsr option:first').val());
  	$('#loadProductsDropdownsr').val($('#loadProductsDropdownsr option:first').val());
  	$('#srrate').val("");
  	$('#srquantity').val("");
  	$('#srprice').val("");
  	$('#loadProductsDropdownsr').focus();
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
function notifyChangePassword(){
	$.notify({
		title: "Success",
		message: "Password changed Successfully.",
		icon: 'fa fa-check' 
  	},{
		type: "success"
  	});
}