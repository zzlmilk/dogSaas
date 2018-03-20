var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");

var RegisterLogic = require("../../Logics/RegisterLogic");




var ChangePasswordHandler = function(){


}
/**
 * @api {post} /user/change_password 修改密码
 * @apiName changePassword
 * @apiGroup User
 * @apiDescription 修改密码api接口
 * @apiHeader  {Sting} access-token token
 * @apiParam   {String} oldPassword 原密码
 * @apiParam    {String} newPassword 新密码
 * @apiSuccess {String} token
 * @apiSuccessExample Success-Response:
 { token: 'q6QKHgEK7fk2981KPhRps8rT',
user:
 { _id: '5a1cf5857651f434a8eeb4ba',
   email: '2420933732@qq.com',
   logionProcess: 0 } }


 */
_.extend(ChangePasswordHandler.prototype,RequestHandlerBase.prototype);


ChangePasswordHandler.prototype.attach = function(route){
    var self = this;

    route.post('/',authenticator,function(request,response){
        var user=request.user;
        var oldPassword = request.body.oldPassword;
        var newPassword = request.body.newPassword;
        if (Utils.isEmpty(oldPassword)) {
            self.successResponse(response, Const.resCodeRegisterNoPassword);
            return;
        }
        if (Utils.isEmpty(newPassword)) {
            self.successResponse(response, Const.resCodeRegisterNoPassword);
            return;

        }
        var bool=Utils.vaild(oldPassword,user.password);
        if (!bool) {
            self.successResponse(response, Const.resCodeOldPasswordInCorrect);
            return;
        } else {
            user.password = Utils.saltAndHash(newPassword);
            var token = Utils.randomString(24);
            user.token = token;
            user.save(function (err, userResult) {
                if (err) {
                    self.errorResponse(response,Const.httpCodeServerError);

                }
                else {
                    self.successResponse(response, Const.responsecodeSucceed, {
                        token: token,
                        user: Utils.pickUser(userResult)
                    });
                }
            })
        }
    })
};


new ChangePasswordHandler().attach(router);
module["exports"] = router;