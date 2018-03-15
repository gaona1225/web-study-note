/*
 * nodejs的例子：
 * 启动服务器后，访问http://localhost:8888/,可在页面看到‘Hello World’
 */
var http = require("http");
http.createServer(function(request, response) {  
	response.writeHead(200, {"Content-Type": "text/plain"});  
response.write("Hello World");  
response.end();}).listen(8888);
