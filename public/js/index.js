/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	console.log("Cargado!");
	contactForm.addEventListener("submit", function (e) {
	  console.log("Form enviado");
	  e.preventDefault();
	  var contactForm = document.getElementById("contactForm"),
	      nameContact = document.getElementById("name").value,
	      emailContact = document.getElementById("email").value,
	      phoneContact = document.getElementById("phone").value,
	      messageContact = document.getElementById("message").value,

	  /*payload = {
	    name: nameContact,
	    email: emailContact,
	    phone: phoneContact,
	    message: messageContact
	  },*/
	  payload = "name=" + encodeURIComponent(nameContact) + "&email=" + encodeURIComponent(emailContact) + "&phone=" + encodeURIComponent(phoneContact) + "&message=" + encodeURIComponent(messageContact);

	  fetch("/send_contact", {
	    method: "POST",
	    headers: {
	      "accept": "application/json",
	      "cache-control": "no-cache",
	      "content-type": "application/x-www-form-urlencoded"
	    },
	    body: payload
	  }).then(function (response) {
	    return response.json();
	  }).then(function (data) {
	    $("#contactModalSuccess").modal('show');
	  }).catch(function (e) {
	    $("#contactModalError").modal('show');
	  });
	  /*
	  var data = "name=JOnathan&email=correojona%40hotmail.com&phone=7028810253&message=Te%20quiero";
	    var xhr = new XMLHttpRequest();
	  xhr.withCredentials = true;
	    xhr.addEventListener("readystatechange", function () {
	    if (this.readyState === 4) {
	      console.log(this.responseText);
	    }
	  });
	    xhr.open("POST", "http://localhost/send_contact");
	  xhr.setRequestHeader("'content-type'", "application/json");
	  xhr.setRequestHeader("accept", "application/json");
	  xhr.setRequestHeader("cache-control", "no-cache");
	  xhr.setRequestHeader("postman-token", "00e37f5c-45bc-421f-8e68-32472e88daea");
	  xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	    xhr.send(data);
	  */
	});

/***/ }
/******/ ]);