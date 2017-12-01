window.$ = window.jQuery = require('jquery');
var bootstrap = require('bootstrap-sass');
var _ = require('lodash');
var Backbone = require('backbone');
var LocalStorage = require('backbone.localstorage').LocalStorage;
Backbone.$ = $;










// setup routing here
var Routing = require('./routing');

$(function () {
	 
	  Backbone.history.start();
})

