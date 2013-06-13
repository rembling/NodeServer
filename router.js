var fs = require("fs");

function route(handle, pathname, response, postData) {
	//console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        //console.log("pathname has a handle: " + pathname);
		return handle[pathname](response, postData);
    } else {
	    if (pathname === '/favicon.ico')
		{
		}
		else
	    {
	        // check for generic file requests
	        if (/\.(js|html|swf|png|jpg)$/.test(pathname)) {
	            //console.log("js/html/swf/png/jpg: " + pathname);
	            try {
	                var swf = pathname.substr(-4) === '.swf';
	                var html = pathname.substr(-5) === '.html';
	                var png = pathname.substr(-4) === '.png';
	                var jpg = pathname.substr(-4) === '.jpg';
	                var js = pathname.substr(-3) === '.js';
	                if (swf) {
	                    response.writeHead(200, { 'Content-Type': 'application/x-shockwave-flash' });
	                    response.write(fs.readFileSync(__dirname + pathname, 'binary'), 'binary');
	                }
	                else if (png)
                    {
	                    response.writeHead(200, { 'Content-Type': 'image/jpeg' });
	                    response.write(fs.readFileSync(__dirname + pathname, 'binary'), 'binary');
	                }
	                else if (jpg)
	                {
	                    response.writeHead(200, { 'Content-Type': 'image/jpeg' });
	                    response.write(fs.readFileSync(__dirname + pathname, 'binary'), 'binary');
	                }
	                else if (html)
	                {
	                    response.writeHead(404, { "Content-Type": "text/html" });
	                    response.write(fs.readFileSync(__dirname + pathname, 'utf8'), 'utf8');
	                }
	                else if (js) {
	                    response.writeHead(404, { "Content-Type": "text/javascript" });
	                    response.write(fs.readFileSync(__dirname + pathname, 'utf8'), 'utf8');
	                }
	                response.end();
	            } catch(e){ 
	                console.log("Error: No request handler found for " + pathname);
	                console.log("Error: " + e);
	                response.writeHead(404, { "Content-Type": "text/plain" });
	                response.write("404 Not found");
	                response.end();
	            }               
	        }
	        else if (/\.(css)$/.test(pathname)) {
	            //console.log("css: " + pathname);
	            response.writeHead(200, { 'Content-Type': 'text/css' });
	            response.write(fs.readFileSync(__dirname + pathname, 'utf8'));
	            response.end();
	        }
	        else{
	            console.log("Error: No request handler found for " + pathname);
	            response.writeHead(404, {"Content-Type": "text/plain"});
	            response.write("404 Not found");
	            response.end();
	        }
		}
	}
}
exports.route = route;