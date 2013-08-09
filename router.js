var fs = require("fs");

var Handler = {
	touch : function(dir, opts) {
		console.log("touching file: " + opts.fname);
	},
	save : function(dir, opts) {},
	rm : function(dir, opts) {},
	html : function(dir, response) {
		console.log("sending index.html");
		fs.readFile(__dirname + '/index.html', function (err, data) {
			if (err) {
				response.writeHead(500);
				return response.end('Error loading index.html');
			}
			response.writeHead(200);
			response.end(data);
		});
	},
	js : function(dir, opts) {
		console.log("sending js/" + dir[2]);
		var response = opts.response;
		fs.readFile(__dirname + "/js/" + dir[2], function (err, data) {
			if (err) {
				response.writeHead(500);
				return response.end('Error loading ' + dir[2]);
			}
			response.writeHead(200);
			response.end(data);
		});
	},
	css : function(dir, response) {
		console.log("sending css/" + dir[2]);
		var response = opts.response;
		fs.readFile(__dirname + "/css/" + dir[2], function (err, data) {
			if (err) {
				response.writeHead(500);
				return response.end('Error loading ' + dir[2]);
			}
			response.writeHead(200);
			response.end(data);
		});
	}
};

exports.route = function(pathname, opts) {
	console.log("About to route a request for " + pathname);
	var dir = pathname.split("/");
	if (!dir[1]) {
		console.log("serving with default html() handler");
		Handler.html(dir, opts.response);
		return;
	}
	console.log("Serving with handler " + dir[1] + "()");
	Handler[dir[1]](dir, opts);
}
