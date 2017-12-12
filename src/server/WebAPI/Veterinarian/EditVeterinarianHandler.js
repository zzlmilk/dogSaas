var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");

var VeterinarianLogic = require("../../Logics/VeterinarianLogic");
var OrganizationMiddleware = require("../middleware/organizationMiddleware");

var VeterinarianModel = require('../../Models/Veterinarian');




var EditVeterinarianHandler = function(){


}
/**
 * @api {post} /veterinarian/add 添加兽医
 * @apiName addVeterinarian
 * @apiGroup Veterinarian
 * @apiDescription 添加兽医api接口
 * @apiParam {String} name 兽医名字
 * @apiParam {String} code 兽医执照号
 * @apiHeader {String} token
 * @apiSuccessExample Success-Response:
 *{ veterinarian:
   { __v: 0,
     name: '张三',
     code: '119',
     created: '2017-12-11T02:11:18.705Z',
     _id: '5a2de9469a2b061da8297704' } }
 */

_.extend(EditVeterinarianHandler.prototype,RequestHandlerBase.prototype);


EditVeterinarianHandler.prototype.attach = function(route){
    var self = this;

    route.post('/',authenticator,OrganizationMiddleware,function(request,response){

       // console.log(request.body)

     //   console.log(request.organization)

        var  organization  = request.organization;

        var veterinarianModel = VeterinarianModel.get();
        var veterinarian = new veterinarianModel({
                name:"1234567",
                code:"123454567",
        })
        

        var veterinarians = organization.veterinarians;
        veterinarians.push(veterinarian)
        organization.veterinarians = veterinarians;

        organization.save(function(err,result){
            console.log(result)
        })



       


        return;

        request.body.organization = request.organization;
        VeterinarianLogic.add(request.body,function(result){
            self.successResponse(response,Const.responsecodeSucceed,{
              organization:result
            });

        },function(err,code){
            if (err) {
                self.errorResponse(response,Const.httpCodeServerError);
            }else{
                self.successResponse(response,code);
            }



        })

    })
}


new EditVeterinarianHandler().attach(router);
module["exports"] = router;