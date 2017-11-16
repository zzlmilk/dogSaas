var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./AddOrganization.hbs');

var AddOrganizationClient = require('../../../lib/APIClients/AddOrganizationClient');



var AddOrganizationView = Backbone.View.extend({

    el : null,
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

        $("#addOrganizationBtn").unbind().on('click',function(e){

            var organization = {                            
                            name: "test_111" ,
                            province:"上海",
                            district:"1",
                            city:"1",
                            address:"1",
                            code:"1",
                            tel:"1",
                            businessLicense:"1",
                            animalMedicalLicense:"1",
                            serviceScope:"1",
                            contacts_name:"1",
                            contacts_phone:"1"
                        };  

                 AddOrganizationClient.send(organization                                    
                    ,function(data){
                         console.log(data)
                         Utils.goPage("main");
                                                                    
                    },function(errorCode){
                        console.log(errorCode)
                                                                    
                    })
        })

    }

});
module.exports = AddOrganizationView;




