var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../lib/utils');
var Const = require('../../lib/consts');
var Config = require('../../lib/init');

// load template
var template = require('./User.hbs');

var UserView = Backbone.View.extend({

   
    initialize: function(options) {
       
        this.render();
    },
    
    render: function() {	

        $(Config.defaultContaier).html(template({
                
        }));

        this.onLoad();

        return this;
        
    },


    onLoad: function(){

        var self = this;  

        $('#btn_addUser').on('click',function(){
            alert("aaa")
            
        })


    }

});

module.exports = UserView;
