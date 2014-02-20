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
	// get the parameter from the end of the url
	var req = request.url.split("/");
	// replace "%20" with a blank space for parameters that have multiple words
	var str = req[1].replace("%20"," ");
	// default select statement
	var inp = "SELECT * FROM food";
	// if there is a valid name parameter, update the select statement
	if (str!="favicon.ico" && str!="") {
		inp = inp.concat(" WHERE name='", str,"'");
	}
	// access the database
	connection.query(inp, function (error, rows, fields) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        	// have a link to return to the index page
		response.write("<a href='http://plato.cs.virginia.edu/~mra9cg/hw4/'>Return</a><br><br>");
        response.write(JSON.stringify(rows));
		response.end();
    });
}).listen(process.env.PORT || 8080);
