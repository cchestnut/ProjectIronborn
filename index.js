var http = require('http');
var server = require('node-http-server');
var fs = require('fs');
var index = fs.readFileSync('index.html');
var my404 = fs.readFileSync('404.mu');
var my500 = fs.readFileSync('500.mu');
var contentTypesByExtension = {
    '.html': "text/html",
    '.css':  "text/css",
    '.js':   "text/javascript"
  };
var url = require('url');
var  port = process.argv[2] || 8888;
var path = require('path');
/*server.deploy(
	{
		verbose:true,
		port:8000,
		root:'./'
	}
);*/
http.createServer(function(req, res){
	var uri = url.parse(req.url).pathname
		, filename = path.join(process.cwd(), uri);
	
	path.exists(filename, function(exists){
		if(!exists){
			res.writeHeader(404,{"Content-Type":"text/html"});
			res.write(my404);
			res.end();
			return;
		}
		
		if (fs.statSync(filename).isDirectory()) {
			filename += '/index.mu';
		}

		fs.readFile(filename, "binary", function(err, file) {
			if(err) {        
				res.writeHead(500, {"Content-Type": "text/html"});
				res.write(my500);
				res.end();
				return;
			}

			var headers = {};
			var contentType = contentTypesByExtension[path.extname(filename)];
			if (contentType) 
				headers["Content-Type"] = contentType;
			res.writeHead(200, headers);
			res.write(file, "binary");
			res.end();
		});
	});
		
	//res.writeHead(200, {'Content-Type': 'text/html'});
	//res.end(index);
}).listen(1337,'127.0.0.1');
console.log("Server running...");	