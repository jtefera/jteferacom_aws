'use strict';
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require( 'fs');
const path = require('path');
const morgan = require('morgan');
const aws = require('aws-sdk');
var LEX = require('letsencrypt-express').testing();

//Server
let app = express();

const PATHS = {
	recipejson: "./public/json/recipe_library.json",
	deleteRecipe: "/recipes/delete",
	addRecipe: "/recipes/add",
	getRecipes: "/recipes/get",
	editRecipe: "/recipes/edit",
	searchRecipes: "/recipes/search"
};

var lex = LEX.create({
  configDir: require('os').homedir() + '/letsencrypt/etc',
  approveRegistration: function (hostname, cb) {
    cb(null, {
      domains: [hostname],
      email: 'hello@jtefera.com',
      agreeTos: true,
    });
  }
});

lex.onRequest = app;

lex.listen([80], [443, 5001], function () {
  var protocol = ('requestCert' in this) ? 'https': 'http';
  console.log("Listening at " + protocol + '://localhost:' + this.address().port);
});
//logger

app.use(morgan('combined'));
/*let recipeServer = require("../projects/recipes_app_react/src/server/serverApp.js").app
app.use("/recipes", recipeServer);
app.use("/one_out", express.static('./src/projects/1out/public/'));*/
//Directories in __dirname
fs.readdir('./', (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});
//Static pages
app.use(express.static('public'));

//Parses json files so they can be usable
app.use(bodyParser.json());

//parses url files spliting the url in its different categoriesssss
app.use(bodyParser.urlencoded({extended: true}));

/*app.use('/js/', babel({
	srcPath: 'js/src',
	cachePath: __dirname + '/_cache',
	babelOptions: {
		presets: ['es2015', 'react']
	},
	debug: true
}));*/

//Mail config

//Config files with my AWS keys
aws.config.loadFromPath('./server/mail/config.json');

//SES is the AWS service for emails
var ses = new aws.SES();

// send to list
var to = ['jonathantefera@outlook.com']

// this must relate to a verified SES account
var from = 'jonahum@gmail.com'

//
app.post("/send_contact", (req, res) => {
	let contactInfo = req.body
	console.log("..........................")
	console.log(contactInfo)
	console.log("..........................")
	// this sends the email
	// @todo - add HTML version
	let subjectMessage = "jtefera.com: " + contactInfo.name,
			messageText = "Message by " + contactInfo.name + "\n"
										+ "Email: " + contactInfo.email + "\n"
										+ "Phone: " + contactInfo.phone + "\n"
										+ "Message: " + contactInfo.message + "\n"
										+ "Date: " + new Date() + "\n"
										+ "Unformatted" + JSON.stringify(req.body, null, "");
	ses.sendEmail( {
	   Source: from,
	   Destination: { ToAddresses: to },
	   Message: {
	       Subject: {
	          Data: subjectMessage
	       },
	       Body: {
	           Text: {
	               Data: messageText
	           }
	        }
	   }
	}
	, function(err, data) {
	    if(err) {
	      throw err
	    }

	    console.log('Email sent:');
	    console.log(data);
	 });

	res.json(contactInfo)

})

//If this middleware is used it is because none of the previous worked!
//So,, it is a 404
app.use((req, res) => {
	res.status(404)
	res.redirect('/404.html')
})


/*const server_port = 8080;
//const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, () => {
	console.log("dirname is " + __dirname);
	console.log("----------------------------");
	console.log("Server started on"  + ":" + server_port);
	console.log("---------------------------");
});*/

// handles your app
/*require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(443, function () {
  console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
});*/

var server = http.createServer(app);
server.listen(8080);
//server.on('error', onError);
//server.on('listening', onListening);