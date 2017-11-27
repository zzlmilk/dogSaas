var Backbone = require('backbone');
var _ = require('lodash');

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
    


    Organization.modelByResult = function(obj){

        if (obj == null) {
            return;
        }


    		var model = new OrganizationModel({
    			id:obj._id,
    			name:obj.name,    			
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

