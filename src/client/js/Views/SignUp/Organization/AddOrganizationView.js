var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var templateAdd = require('./AddOrganization.hbs');
var templateStatus = require('./organzationStatus.hbs');


var AddOrganizationClient = require('../../../lib/APIClients/AddOrganizationClient');

var OrganizationModel = require('../../../Models/organization');


var AddOrganizationView = Backbone.View.extend({
    params:{},
    el : null,
    initialize: function(options) {
       
        var self = this
        if (options.actions == null) {
            return;
        }else{
            self.params = Utils.getActionsParams(options.actions)
            var action = self.params.action
            if (action == "add") {
                $(Config.defaultContaier).html(templateAdd({
                        
                }));
            }
            else if (action == "edit"){
                    //编辑
            }
            else if(action == "checkStatus"){
                
                  //等待审核
                 $(Config.defaultContaier).html(templateStatus({
                        //organization:organization.attributes
                 }));

            }
            else{
                      console.log("action wrong")
            }


        }

        
      



        this.render();

    },
    
    
    render: function() {

       

        this.onLoad();

        return this;
        


    },


    onLoad: function(){

        var self = this;  


        $("#addOrganizationBtn").unbind().on('click',function(e){

            var name = $("#organization_name").val()

            var organization = {                            
                            name: name ,
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
                         var organization = OrganizationModel.modelByResult(data.organization) 
                         
                         var checkStatus = organization.get("checkStatus").status;
                        
                         if (checkStatus == 0) {
                             // 等待审核
                             $(Config.defaultContaier).html(templateStatus({
                                        organization:organization.attributes
                             }));

                         }
                         else{

                             Utils.goPage("main");
                         }




                                                                    
                    },function(errorCode){

                        console.log(errorCode)
                                                                    
                    })
        })

    }

});
module.exports = AddOrganizationView;




