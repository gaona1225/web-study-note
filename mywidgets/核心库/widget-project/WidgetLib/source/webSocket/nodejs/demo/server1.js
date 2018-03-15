// ������Ҫ��ģ�飺http��socket.io
var http = require("http"),
     io = require("socket.io");
  
//����server
 var server = http.createServer(function(request, response) {
     response.writeHead({ "Content-Type": "text/html" });
     response.end("HTML5 WebSocket Demo!!!");//��ͻ��˷�������
 });
 //�˿�8000
 server.listen(8000, "localhost");
  
//����socket
 var socket = io.listen(server);
 //������Ӽ���
 socket.on("connection", function(client) {
     console.log("connected1");		
	 //���ӳɹ���ִ������ļ���
     client.on("message", function(data) {
         client.send("Hello1 " + data);//���ͻ��˽��ܵ������ݷ��͸��ͻ���
     });
     //�Ͽ�����callback
     client.on("disconnect", function() {
         //clearInterval(interval);
		 console.log("disconnected1");
     });
	/*  var interval = setInterval(function(){
		client.send('This is a message the server!'+new Date().getTime());
	},1000);*/
 });