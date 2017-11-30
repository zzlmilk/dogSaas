var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var templateAdd = require('./AddOrganization.hbs');

//var templateStatus = require('./organzationStatus.hbs');


var AddOrganizationClient = require('../../../lib/APIClients/AddOrganizationClient');

var OrganizationModel = require('../../../Models/organization');
var User = require('../../../Models/user');

var LocalStorage = require('backbone.localstorage').LocalStorage;


var AddOrganizationView = Backbone.View.extend({
    organization:null,
    el : null,
    initialize: function(options) {


        var self = this
       
        if (options.action == null) {
            return;
        }else{
             
             var action = options.action
             self.organization = options.user.organization
            
            

            if (action == "add") {

                $(Config.defaultContaier).html(templateAdd({
                        
                }));
            }
            else if (action == "edit"){
                    //编辑
                     
                  
                $(Config.defaultContaier).html(templateAdd({
                         organization:self.organization
                }));

            }

            else if(action == "checkStatus"){
                
                  //等待审核
                  var status = self.organization.checkStatus.status;
                  if (status == 0) {
                      var templateStatus = require('./WaitReview.hbs');


                     $(Config.defaultContaier).html(templateStatus({
                            organization:self.organization
                     }));

                  }
                  else if(status == -1){

                       var templateStatus = require('./ReviewFailed.hbs');


                       $(Config.defaultContaier).html(templateStatus({
                              //organization:organization.attributes
                     }));

                  }else if (status == 1){
                       // var templateStatus = require('./ReviewFailed.hbs');
                       Utils.goPage("main")

                    
                  }

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

        var SignHeaderView = require('../SignHeader/SignHeaderView.js');
        var view = new SignHeaderView({
            'el': "#signheader-content"
        });

        var SignFooterView = require('../SignFooter/SignFooterView.js');
        var view = new SignFooterView({
            'el': "#signfooter-content"
        });


        $("#addOrganizationBtn").unbind().on('click',function(e){
          
            self.addOrganization()
        })



        //上传图片
        $("#businessLicense").bind().on("click",function(e){
               var n = $(this).find("input").attr("id");                              
               $("#"+n).on("aaaclick",function(e){         
                                     
                    $(this).show()

                   
               }) 

               
               console.log(n)
               $("#"+n).trigger("aaaclick")

                
        });

    },





    addOrganization:function(){
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
                    
                            //更新user的organization 
                             var user = User.getLoginUser();
                             var organization = data.organization;
                             user.organization = organization                             
                             var model  =  User.modelByResult(user)                           
                             model.save();

                            



                        


                         var templateStatus = require('./WaitReview.hbs');


                         $(Config.defaultContaier).html(templateStatus({
                                //organization:organization.attributes
                         }));

                         // Utils.goPage("organization"); 


                                                                                      
                    },function(errorCode){
                      alert(errorCode)
                     
                                                                    
                    })
    }

});
module.exports = AddOrganizationView;




