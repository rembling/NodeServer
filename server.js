var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		console.log("ClientIP: " + request.connection.remoteAddress + " Request Url: " + request.url);
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		//console.log("Request for " + pathname + " received.");
		
		request.setEncoding("utf8");
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk: '"+
			postDataChunk + "'.");
		});
		
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}
	http.createServer(onRequest).listen(8888);
	
	console.log("Server has started.");
	console.log('Server running at http://127.0.0.1:8888/');
}

exports.start = start;