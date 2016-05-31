import http from "http";
import express from "express";
import babel from "babel-middleware";
import bodyParser from "body-parser";
import fs from  'fs';
import path from 'path'
import morgan from 'morgan'
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
let recipeServer = require("../recipe_app_react/server/serverApp.js").app
app.use("/recipes", recipeServer);
app.use("/one_out", express.static('1out/public'));

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

const server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
//const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, () => {
	console.log("dirname is " + __dirname);
	console.log("----------------------------");
	console.log("Server started on"  + ":" + server_port);
	console.log("----------------------------");
});
