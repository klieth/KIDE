var http = require("http");
var url = require("url");
var qs = require("querystring");

function start(route, p) {
	var port = p || 3131;
	http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		var opts = url.parse(request.url).query;
		if (request.method == 'POST') {
			console.log("request method is POST");
			var body = '';
			request.on('data', function (data) {
				body += data;
				if (body.length > 1e6) request.connection.destroy();
			});
			request.on('end', function() {
				opts += body;
			});
		}
		console.log("opts: " + opts);
		opts = qs.parse(opts);
		opts.response = response;
		console.log("response: " + opts.response);
		route(pathname, opts);
	}).listen(port);

	console.log("Server started on port " + port);
}

exports.start = start;
