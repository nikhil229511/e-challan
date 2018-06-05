
var username=$('#username');
var password=$('#password');
var login=$('#Login');
var port=5005;

login.click(verifyUser);

var wSocket = new WebSocket('ws://localhost:5005/');
wSocket.onopen = function (message) {
	console.log("connected");
	/*var msg={
		hi: 'hi'
	}
	var json=JSON.stringify({ type:"login",data:msg});
	console.log(json);
	wSocket.send(json);*/

	
};
  

wSocket.onmessage = function (message) {
  var msg = JSON.parse(message.data);
  	switch(msg.type) {
	    case 1:
	      //case1
	      break;
	    case 2:
	      //case2
	      break;
  	}
};

wSocket.onclose=function(){

};



function verifyUser(){
	var obj={
		username : username.value(),
		password : password.value()
	};

	var json=JSON.stringify({usertype: "login",data:obj});
	console.log(json);
	wSocket.sendUTF(json);
}