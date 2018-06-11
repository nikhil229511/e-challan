"use strict";

$(function(){

	var login=$('#Login');
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

	login.click(verifyUser);

	var connection = new WebSocket('ws://localhost:5005/');
	connection.onopen = function (message) {
		console.log("connected");
	};
	  

	connection.onmessage = function (message) {
	  var json = JSON.parse(message.data);
	  console.log(json);
	  	if(json.type == "login_callback") {
	  		if(json.data.msg== 'success'){
	  			if(window.sessionStorage){
	  				sessionStorage.setItem('companyid','"'+json.data.companyid+'"');
	  				sessionStorage.setItem('username','"'+json.data.username+'"');
	  				window.location='dashboard.html'
	  			}
	  		}
	  		if(json.data.msg == 'fail'){
	  			$('#error_msg').html("Invalid username or password.");
	  		}
	  	}
	};

	connection.onclose=function(){

	};



	function verifyUser(){
		var username=$('#username').val();
		var password=$('#password').val();

		if(username== '' || username.length==0)
			$('#error_msg').html("Please Enter Username.");
		else if(password== '' || password.length==0)
			$('#error_msg').html("Please Enter Password.");
		else{
			var obj={
				username : username,
				password : password
			};
			var json=JSON.stringify({usertype: "login",data:obj});
			connection.send(json);
		}
	}
});
