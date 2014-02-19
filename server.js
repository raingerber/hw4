var http = require("http"),
mysql = require("mysql"),
url = require("url"),
querystring = require("querystring"); 
 
var connection = mysql.createConnection({
    host: "stardock.cs.virginia.edu",
    user: "cs4720mra9cg",
    password: "spring2014",
    database: "cs4720mra9cg"
});
 
http.createServer(function (request, response) { 
	var req = request.url.split("/");
	var str = req[1].replace("%20"," ");
	var inp = "SELECT * FROM food";
	if (str!="favicon.ico" && str!="") {
		inp = inp.concat(" WHERE name='", str,"'");
	}
	connection.query(inp, function (error, rows, fields) {
        response.writeHead(200, {'Content-Type': 'text/html'});
		response.write("<a href='http://plato.cs.virginia.edu/~mra9cg/hw4/'>Return</a><br><br>");
        response.write(JSON.stringify(rows));
		response.end();
    });
}).listen(process.env.PORT || 8080);