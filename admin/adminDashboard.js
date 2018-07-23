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
	if(sessionStorage.getItem('User') ==null){
		window.location='login.html'
	}
	var connection = new WebSocket('ws://localhost:5005/');
	
	connection.onopen = function (message) {	
        console.log("connected");
		var json=JSON.stringify({usertype:"AdminsendAll"});
		connection.send(json);	
    };
    
	connection.onmessage = function (message) {
	  	var json = JSON.parse(message.data);
          
        if(json.type == "getAllUsers_callback"){
            var htmlString="";
            
            for(var i=0;i<json.data.length;i++){
                
                htmlString +='<tr>';
                htmlString +='<td>'+json.data[i].username+'</td>';
                htmlString +='</tr>';
            }
            $('#UserData').html(htmlString);
        }
        else if(json.type == "insertUser_callback"){
            if(json.data.msg== 'UserInsertSuccess'){
                notifyInsert();
                clearUser();
            }
            else if(json.data.msg == 'UserInsertFail'){
                notifyFail();
            }
        }	  	
	  	else if(json.type == "Adminlogout_callback"){
	  		window.location='login.html';
        }
	};

	$('a[href="#"]').click(function (event) {
	   event.preventDefault();
	});

	$('#adduser').click(validateUser);
	$('#clearUser').click(clearUser);	
	function clearUser(event){
		if(event)
			event.preventDefault();
		$('#username').val("");
		$('#password').val("");
		$('#confirmpassword').val("");	
	}
	function validateUser(event){
		event.preventDefault();
		var msg='';
		var flag=0;
		var username=$('#username').val();
		var password=$('#password').val();
		var confirmpassword=$('#confirmpassword').val();
		var letters = /^[A-Za-z]+$/;
		if(username =='' || username == null){
			flag=1;
			msg="Enter Username.";
		}
		else if(password == '' || password== null){
			flag=1;
			msg="Enter Password.";
        }
        else if(!password.match(/(?=.{9,})(?=.*?[^\w\s])(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*/)){
            flag=1;
            msg="Password Must Contain At least 1 Capital letter, 1 Small letter, 1 Numeric Value and 1 Symbol.";
        }        
		else if(confirmpassword == '' || confirmpassword== null){
			flag=1;
			msg="Enter Confirm Password."
		}
		else if(password != confirmpassword){
			flag=1;
			msg="Confirm Password didn't Match."	
		}
        
        if(flag == 0)
			insertUser();
		else{
			notifyValidateError(msg);
		}
	}
	function insertUser(){
		var username=$('#username').val();
        var password=$('#password').val();
        
		var obj={
			username:username,
			password : password,			
		};
        var json=JSON.stringify({usertype: "insertUser", data:obj});	
		connection.send(json);
		$('#username').focus();
	}
    
    $('#logout').click(logout);
	function logout(){        
        var json=JSON.stringify({usertype:"Adminlogout"});
		connection.send(json);
	}

});

function notifyInsert(){
    $.notify({
      	title: "Insert Complete : ",
      	message: "Something cool is just Inserted!",
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