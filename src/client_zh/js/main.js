window.$ = window.jQuery = require('jquery');
var bootstrap = require('bootstrap-sass');
var _ = require('lodash');
var Backbone = require('backbone');
var LocalStorage = require('backbone.localstorage').LocalStorage;
Backbone.$ = $;

var LocalizationManager = require('./lib/localizationManager.js');
var ViewHelpers = require('./lib/viewHelpers.js');



ViewHelpers.attach();




// load default language 
LocalizationManager.init("en");








// setup routing here
var Routing = require('./routing');

$(function () {

	  Backbone.history.start();
})

