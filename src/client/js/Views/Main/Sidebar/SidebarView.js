var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./Sidebar.hbs');

var SidebarView = Backbone.View.extend({

    el : null,
    initialize: function(options) {
        this.el = options.el;
        this.render();
    },
    
    render: function() {	
        $(this.el).html(template({
        	   
        }));

        this.onLoad();

        return this;
        
    },

    onLoad: function(){

        var self = this;  


        var DogView = require('../Dog/DogView.js'); 
        var view = new DogView({
            'el': "#main-content"
        });



         $('#btn_immuneManager').unbind().on('click',function(){

            var ImmuneView = require('../Immune/ImmuneView');
            
            var view = new ImmuneView({
                  'el': "#main-content"
                }); 
            

        });



    }

});

module.exports = SidebarView;
