var conns = new Array();

// 引入需要的模块：http和socket.io，fs文件
var http = require("http"),
     io = require("socket.io"),
	 fs = require('fs'); 
//创建server
 var server = http.createServer(function(request, response) {
     response.writeHead({ "Content-Type": "text/html" });
     //服务器连接html页面方法
	 response.end(fs.readFileSync(__dirname + '/index3.html'));
 });
 //端口8082，地址‘192.168.1.70’为本地IP地址
 server.listen(8082, "192.168.1.70");
  
//创建socket
 var socket = io.listen(server);
 //添加连接监听
 socket.on("connection", function(client) {
     console.log("connected1"+client);	
	 conns.push(client);
	 //连接成功则执行下面的监听
     client.on("message", function(data) {
       //  client.send("Hello1 " + data);
		console.log('获得data11111:'+data);
		console.log('conns:'+conns);
		//实现聊天室功能
		for(var i=0; i<conns.length; i++){
			if(conns[i]!=client){
				conns[i].send(data);
			}else{//第一次发消息
				 client.send(data);
			}
		}
     });
     //断开连接callback
     client.on("disconnect", function() {
         console.log("disconnected1");
     });
 });