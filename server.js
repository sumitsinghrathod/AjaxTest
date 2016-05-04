/*
	Author : Sumit Kumar
	Date: 3rd May 2016
*/
// Defining the port number here which can be production port by default or 8080 port.
var PORT = process.env.PORT || 8080;
var securePORT  = process.env.PORT || 8443
// Importing module Express.
var securePort    = process.env.PORT || 8443;
var httpsRedirect = require('https-redirect-server');
var express = require('express');
var _ = require('underscore');
// Importing body parser to Read data from http or https request.
var bodyParser = require('body-parser');
// Importing file system to read file.
var fs = require('fs');
// Importing HTTP for http request and response.
var http = require('http');
//Importing HTTPS for secure request and response.
var https = require('https');
// Reading private key from saved location.
var privateKey = fs.readFileSync('/home/sumit/key.pem').toString();
//Reading certificate Key from saved location.
var certificate = fs.readFileSync('/home/sumit/cert.pem').toString();
// Making credential object for Authentication.
var credential = {
	key : privateKey , 
	cert : certificate,
	rejectUnauthorized: false,
};
// Express will return all the frame work feature in app object and directly we can use it for implimentation
var app = express();

//var router = express.Router();

//This is middleware to parse data from request.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
	* Post method to recive data.
	* Data should be in JSON Format.
	* 
*/
 app.post('/' , function(req , res){
	var body = _.pick(req.body , 'id' , 'name');
	//console.log('body data>>>>>>>' + JSON.stringify(body));
	//var pa  
	var id = req.body.id;
	console.log('Id is ' + id);
	var name = req.body.name;
	console.log('Name is ' + name);
	if(typeof id === 'undefined' || typeof name === 'undefined' || name == "") {
		//res.header("Content-Type:","text/html");
        console.log("success get");            
        res.send({"Status" : "error"});
	}
	else {
		//res.header("Content-Type:","text/html");
		res.send({"Status" : "success"});
	}

});

//app.use('/' ,router);

/*
	* GET Request which does not require any data in request.
	* It will respond with response.
	* It will send response code for success and failure along with data.
*/

app.get('/login' , function(req , res){

	res.json({"status" : "200" , "auth" : "Authenticated"});

});

app.get('/' , function(req , res){

	res.send("Hello World");
});

app.get('/loginform' , function(req , res){

	res.send('Hi Sumit Welcome to Login Page');
});


// var server = http.createServer(credential , function(){

// 	console.log("Server Started on https server");

// }).listen(8080);

// http.listen(PORT , function(){
// 	console.log('Server Started at port 3000 with http');
// })



/*
	* Creating Server for port 80 and 8443.
	* To access 8443 server we need cert.pem file.
	* 8443 is Authenticated port.
*/

// var httpServer = http.createServer(app);
var httpsServer = https.createServer(credential, app);

// httpServer.listen(PORT , function(){
// 		console.log('Server Statred on HTTP');

// });
 httpsServer.listen(8443 , function(){

 	console.log('Server Started on HTTPS')
 });

/*
	* This code is used to redirect the user or 443 port if any request comes from client side.
*/

// httpsRedirect(PORT, securePORT).server(); // will redirect anything to receives

// https.createServer(credential, app).listen(securePort , function(){

// 	console.log('Server Connected Via Secure PORT');
// });