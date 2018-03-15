// 引入需要的模块：http和socket.io
var http = require("http"),
     io = require("socket.io");
  
//创建server
 var server = http.createServer(function(request, response) {
     response.writeHead({ "Content-Type": "text/html" });
     response.end("HTML5 WebSocket Demo!!!");//向客户端发送数据
 });
 //端口8000
 server.listen(8000, "localhost");
  
//创建socket
 var socket = io.listen(server);
 //添加连接监听
 socket.on("connection", function(client) {
     console.log("connected1");		
	 //连接成功则执行下面的监听
     client.on("message", function(data) {
         client.send("Hello1 " + data);//将客户端接受到的数据发送给客户端
     });
     //断开连接callback
     client.on("disconnect", function() {
         //clearInterval(interval);
		 console.log("disconnected1");
     });
	/*  var interval = setInterval(function(){
		client.send('This is a message the server!'+new Date().getTime());
	},1000);*/
 });