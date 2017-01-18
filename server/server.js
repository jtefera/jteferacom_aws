'use strict';
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require( 'fs');
const path = require('path');
const morgan = require('morgan');
var LEX = require('letsencrypt-express');

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

// Based on https://github.com/justinmc/letsencrypt-express-example/

var lex = LEX.create({
  configDir: require('os').homedir() + '/letsencrypt/etc',
  server: 'staging',
  approveDomains: ['jtefera.com', 'www.jtefera.com'],
  email: 'hello@jtefera.com',
  agreeTos: true
});

lex.onRequest = app;

lex.listen([80], [443, 5001], function () {
  var protocol = ('requestCert' in this) ? 'https': 'http';
  console.log("Listening at " + protocol + '://localhost:' + this.address().port);
});


// Redirect www.jtefera.com to jtefera.com
// Check 2nd answer from http://stackoverflow.com/questions/7013098/node-js-www-non-www-redirection
function wwwRedirect(req, res, next) {
    if (req.headers.host.slice(0, 4) === 'www.') {
        var newHost = req.headers.host.slice(4);
        return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
    }
    next();
};

app.set('trust proxy', true);
app.use(wwwRedirect);

//logger

// app.use(morgan('combined'));
let recipeServer = require("../src/projects/recipes_app_react/src/server/serverApp.js").app
app.use("/recipes", recipeServer);
app.use("/one_out", express.static('./src/projects/1out/public/'));
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

// Response to the contact form
app.post("/send_contact", require('./mailRouter.js'));

//If this middleware is used it is because none of the previous worked!
//So,, it is a 404
app.use((req, res) => {
	res.status(404)
	res.redirect('/404.html')
})

var server = http.createServer(app);
server.listen(8080);
