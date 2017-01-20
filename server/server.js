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
/*fs.readdir('./', (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});*/
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

// Based on https://github.com/justinmc/letsencrypt-express-example/

var lex = LEX.create({
  challenges: { 'http-01': require('le-challenge-fs').create({ webrootPath: '/tmp/acme-challenges' }) }, 
  store: require('le-store-certbot').create({ webrootPath: '/tmp/acme-challenges' }),

  server: 'https://acme-v01.api.letsencrypt.org/directory',
  approveDomains: ['jtefera.com', 'www.jtefera.com'],
  email: 'hello@jtefera.com',
  agreeTos: true,
  app: app
});

// handles acme-challenge and redirects to https
require('http').createServer(lex.middleware(require('redirect-https')())).listen(80, function () {
  console.log("Listening for ACME http-01 challenges on", this.address());
});

// handles your app
require('https').createServer(lex.httpsOptions, app).listen(443, function () {
  console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
});

const server_port = 8080;
//const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, () => {
	console.log("Local and http testing in port"  + ":" + server_port);
	console.log("---------------------------");
});