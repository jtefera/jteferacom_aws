"use strict";

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _babelMiddleware = require("babel-middleware");

var _babelMiddleware2 = _interopRequireDefault(_babelMiddleware);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _awsSdk = require("aws-sdk");

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//var routes = require("routes");

//Server
var app = (0, _express2.default)();

var PATHS = {
	recipejson: "./public/json/recipe_library.json",
	deleteRecipe: "/recipes/delete",
	addRecipe: "/recipes/add",
	getRecipes: "/recipes/get",
	editRecipe: "/recipes/edit",
	searchRecipes: "/recipes/search"
};

//logger

app.use((0, _morgan2.default)('combined'));
var recipeServer = require("../recipes_app_react/server/serverApp.js").app;
app.use("/recipes", recipeServer);
app.use("/one_out", _express2.default.static('1out/public'));

//Static pages
app.use(_express2.default.static('public'));

//Parses json files so they can be usable
app.use(_bodyParser2.default.json());

//parses url files spliting the url in its different categoriesssss
app.use(_bodyParser2.default.urlencoded({ extended: true }));

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
_awsSdk2.default.config.loadFromPath('./main_page/mail/config.json');

//SES is the AWS service for emails
var ses = new _awsSdk2.default.SES();

// send to list
var to = ['jonathantefera@outlook.com'];

// this must relate to a verified SES account
var from = 'jonahum@gmail.com';

//
app.post("/send_contact", function (req, res) {
	var contactInfo = req.body;
	console.log("..........................");
	console.log(contactInfo);
	console.log("..........................");
	// this sends the email
	// @todo - add HTML version
	var subjectMessage = "jtefera.com: " + contactInfo.name,
	    messageText = "Message by " + contactInfo.name + "\n" + "Email: " + contactInfo.email + "\n" + "Phone: " + contactInfo.phone + "\n" + "Message: " + contactInfo.message + "\n" + "Date: " + new Date() + "\n" + "Unformatted" + JSON.stringify(req.body, null, "");
	ses.sendEmail({
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
	}, function (err, data) {
		if (err) {
			throw err;
		}

		console.log('Email sent:');
		console.log(data);
	});

	res.json(contactInfo);
});

var server_port = 80;
//const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, function () {
	console.log("dirname is " + __dirname);
	console.log("----------------------------");
	console.log("Server started on" + ":" + server_port);
	console.log("---------------------------");
});