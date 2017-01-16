import http from "http";
import express from "express";
import bodyParser from "body-parser";
import fs from  'fs';
import path from 'path'
import morgan from 'morgan'
import aws from 'aws-sdk'

//var routes = require("routes");



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

//logger

app.use(morgan('combined'));
let recipeServer = require("../projects/recipes_app_react/src/server/serverApp.js").app
app.use("/recipes", recipeServer);
app.use("/one_out", express.static(__dirname + '/src/projects/1out/public/'));
//Directories in __dirname
const fs = require('fs');
fs.readdir(__dirname, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})
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


const server_port = 8080;
//const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, () => {
	console.log("dirname is " + __dirname);
	console.log("----------------------------");
	console.log("Server started on"  + ":" + server_port);
	console.log("---------------------------");
});
