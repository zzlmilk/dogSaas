var CONST = require('./consts');
var _ = require('lodash');
var U = require('./utils.js');
var LocalizationManager = require('./localizationManager.js');
var Handlebars = require('hbsfy/runtime');



function ViewHelpers() {
    };


     // Header -----------------------------------------------
    ViewHelpers.prototype.attach = attach; 



    function attach(){

    	 Handlebars.registerHelper("l10n", function(text) {
           return  LocalizationManager.localize(text);
        });


    
    }

     // Exports ----------------------------------------------
    module["exports"] = new ViewHelpers();