var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");

function start(response, postData) {
	//console.log("Request handler 'start' was called.");
	
	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post">'+
		'<textarea name="text" rows="20" cols="60"></textarea>'+
		'<input type="submit" value="Submit text" />'+
		'</form>'+
		'</body>'+
		'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
	
	//exec("dir", function (error, stdout, stderr) {
	//	response.writeHead(200, {"Content-Type": "text/plain"});
	//	response.write("About to print stdout:");
	//	response.write(stdout);
	//	response.end();
	//});
}
function upload(response, postData) {
	//console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello Upload");
	response.write("You've sent the text: " + querystring.parse(postData).text);
	response.end();
}

function responsive(response, postData) {
    fs.readFile('./ResponsiveWeb.html', function (err, html) {
        if (err) {
            throw err;
        }
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
}

exports.start = start;
exports.upload = upload;
exports.responsive = responsive;