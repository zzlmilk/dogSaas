var Backbone = require('backbone');
var _ = require('lodash');
var LocalStorage = require('backbone.localstorage').LocalStorage;

 // Class ------------------------------------------------
    var OrganizationModel = Backbone.Model.extend({

    	 defaults: {
            id: "",            
            adminUser: "",            
            animalMedicalLicense: "",        
            businessLicense:""  ,
            checkStatus:{
                    status:"",
                    time:"",
                },
            contacts:"",
            created:"",
            location:{
                address:"",
                city:"",
                code:"",
                district:"",
                province:"",            
            },
            name:"",
            serviceScope:"",
            tel:"",

        
        },
        localStorage: new LocalStorage("OrganizationModel"),
        initialize: function(){
    
        }


   });

 	var OrganizationCollection = Backbone.Collection.extend({
        model: OrganizationModel
    });



   var Organization = {
        Model:OrganizationModel,
        Collection:OrganizationCollection,
    }


    Organization.getOrganizationById = function(id){
            var model = new OrganizationModel();
            var organization = model.localStorage.find({id:id})
            return organization;
    },




    Organization.modelByResult = function(obj){

        if (obj == null) {
            return;
        }



    		var model = new OrganizationModel({
    			id:obj._id,
    			name:obj.name,   
                adminUser:obj.adminUser, 			
    			checkStatus:{
                    status:obj.checkStatus.status,
                },
                tel:obj.tel

    		});
            

    		return model;

    }



      Organization.collectionByResult = function(obj){
        
        if(!_.isArray(obj))
            return null;
        
        var aryForCollection = [];
        
        _.each(obj,function(row){

            aryForCollection.push(Organization.modelByResult(row));
             
        });
        
        return new OrganizationCollection(aryForCollection);
                
    }


 	module["exports"] = Organization;

