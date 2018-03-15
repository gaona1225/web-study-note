var conns = new Array();

// ������Ҫ��ģ�飺http��socket.io��fs�ļ�
var http = require("http"),
     io = require("socket.io"),
	 fs = require('fs'); 
//����server
 var server = http.createServer(function(request, response) {
     response.writeHead({ "Content-Type": "text/html" });
     //����������htmlҳ�淽��
	 response.end(fs.readFileSync(__dirname + '/index3.html'));
 });
 //�˿�8082����ַ��192.168.1.70��Ϊ����IP��ַ
 server.listen(8082, "192.168.1.70");
  
//����socket
 var socket = io.listen(server);
 //������Ӽ���
 socket.on("connection", function(client) {
     console.log("connected1"+client);	
	 conns.push(client);
	 //���ӳɹ���ִ������ļ���
     client.on("message", function(data) {
       //  client.send("Hello1 " + data);
		console.log('���data11111:'+data);
		console.log('conns:'+conns);
		//ʵ�������ҹ���
		for(var i=0; i<conns.length; i++){
			if(conns[i]!=client){
				conns[i].send(data);
			}else{//��һ�η���Ϣ
				 client.send(data);
			}
		}
     });
     //�Ͽ�����callback
     client.on("disconnect", function() {
         console.log("disconnected1");
     });
 });