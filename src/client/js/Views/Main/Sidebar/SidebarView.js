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

         //办理狗证
        $('#btn_dogManager').unbind().on('click',function(){

            var DogCardView = require('../Dog/DogCard/DogCardView');

            var view = new DogCardView({
                'el': "#main-content"
            });

        });

        //免疫年检
         $('#btn_immuneManager').unbind().on('click',function(){

            var ImmuneView = require('../Immune/ImmuneView');
            
            var view = new ImmuneView({
                  'el': "#main-content"
            });

        });

        //免疫卡管理
        $('#btn_immuneManagerCard').unbind().on('click',function(){

            var ImmuneCardView = require('../ImmuneCard/ImmuneCardView');

            var view = new ImmuneCardView({
                'el': "#main-content"
            });

        });

        //信息查询
        $('#btn_infoSearch').unbind().on('click',function(){

            var InfoSearchView = require('../InfoSearch/InfoSearchView');

            var view = new InfoSearchView({
                'el': "#main-content"
            });

        });



    }

});

module.exports = SidebarView;
