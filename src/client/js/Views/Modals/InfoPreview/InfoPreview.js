/**
 * Created by json on 2017/11/27.
 * 狗证信息弹窗
 */
var $ = require('jquery');
var _ = require('lodash');
// var validator = require('validator');

var request = require('supertest');
var DogLicenseClient = require('../../../lib/APIClients/DogLicenseClient');

var Const = require('../../../lib/consts.js');

var Utils = require('../../../lib/utils.js');
var template = require('./InfoPreview.hbs');
// var UpdateProfileClient = require('../../../lib/APIClients/UpdateProfileClient');
// var loginUserManager = require('../../../lib/loginUserManager');


var InfoPreview = {

    DogLicenseModel: null,
    dog: null,
    dog_vaccine: null,
    owner: null,
    residence: null,

    show: function (dogLicenseModel) {
        this.DogLicenseModel = dogLicenseModel;
        console.log(this.DogLicenseModel.toJSON());

        var self = this;

        $('body').append(template({DogLicenseModel: this.DogLicenseModel.toJSON()}));
        $('#modal-profile').on('hidden.bs.modal', function (e) {
            $('#modal-profile').remove();

        })

        $('#modal-profile').on('show.bs.modal', function (e) {


        })

        $('#modal-profile').modal('show');
        $('#modal-btn-close').unbind().on('click', function () {
            self.hide();
        });

        //保存并制卡
        $('#save_and_ccard').unbind().on('click', function () {

            // self.hide();
            // var CardInfoT = require('../../Main/Dog/DogCard/CardInfo/CardInfo.hbs');
            // new SidebarView().createCard({
            //     'el': sView.$
            // })
            // alert("进入Main/Dog/DogCard/CardInfo页面")

            console.log(this.DogLicenseModel);
            return;

            DogLicenseClient.add(
                //狗证信息
                this.DogLicenseModel,
                //成功回调
                function (data) {
                    // loginUserManager.setToken(data.token);
                    // //存入本地缓存
                    // var user = UserModel.modelByResult(data.user)
                    // loginUserManager.setLoginUserID(user.get("id"))
                    // user.save();

                    var ds = require("../../Main/Dog/DogCard/DogCardView.js");
                    new ds().createCard();

                    // Utils.goPage("organization");


                },
                //失败回调
                function (errorCode) {
                    console.log(errorCode);
                    if (Const.ErrorCodes[errorCode]) {
                        var message = Const.ErrorCodes[errorCode]
                        alert(message)
                    }

                });
        });

    },


    /**
     * 重新编辑
     * @param onFinish
     */
    hide: function (onFinish) {
        $('#modal-profile').on('hidden.bs.modal', function (e) {
            $('#modal-profile').remove();
            if (!_.isUndefined(onFinish)) {
                onFinish();
            }
        })

        $('#modal-profile').modal('hide');
    }

    ,


    /**
     * 添加狗证
     */
    addDogCard: function () {
        var body = {
            husbandryNo: global.getRandomStr(),
            dog: {
                nickname: "test_" + global.getRandomStr(),
                sex: "1",
                breed: "breed",
                usage: "警卫",
                hairColor: "白色",
                bornDate: "2016-08-10",
                irisID: "a12345678",
                photoUrl: "123",
                vaccine: {
                    name: "av",
                    batchNo: "123",
                    manufacturer: "manufacturer",
                    veterinarianName: "veterinarianName",
                    organizationName: "organizationName",
                }

            },
            owner: {
                name: "test_" + global.getRandomStr(),
                sex: "1",
                tel: "345033",
                phone: "15901794453",
                certificateType: "1",
                certificateCode: "31010211111111",
                province: "province",
                district: "district",
                city: "city",
                address: "address",
                code: "code",

            },
            residence: {
                houseNo: "1234",
                houseProperty: "ziyou",
                address: "global.getRandomStr()",
                isSterilization: "0"
            }

        };

        request(app)
            .post('/dogsystem/v1/dogLicense/add')
            .set('Access-Token', token)
            .send(body)
            .end(function (err, res) {

                if (err) {
                    throw err;
                }

                console.log(res.body)
                res.body.should.have.property('code');
                res.body.code.should.equal(Const.responsecodeSucceed);

                done();

            });
    }
    ,

    /**
     * 补办狗证
     */
    issueDogCard: function () {
        var body = {
            husbandryNo: global.getRandomStr(),
            dog: {
                nickname: "test_" + global.getRandomStr(),
                sex: "1",
                breed: "breed",
                usage: "警卫",
                hairColor: "白色",
                bornDate: "2016-08-10",
                irisID: "a12345678",
                photoUrl: "123",
                vaccine: {
                    name: "av",
                    batchNo: "123",
                    manufacturer: "manufacturer",
                    veterinarianName: "veterinarianName",
                    organizationName: "organizationName",
                }

            },
            owner: {
                name: "test_" + global.getRandomStr(),
                sex: "1",
                tel: "345033",
                phone: "15901794453",
                certificateType: "1",
                certificateCode: "31010211111111",
                province: "province",
                district: "district",
                city: "city",
                address: "address",
                code: "code",

            },
            residence: {
                houseNo: "1234",
                houseProperty: "ziyou",
                address: "global.getRandomStr()",
                isSterilization: "0"
            }

        };

        request(app)
            .post('/dogsystem/v1/dogLicense/add')
            .set('Access-Token', token)
            .send(body)
            .end(function (err, res) {

                if (err) {
                    throw err;
                }

                console.log(res.body)
                res.body.should.have.property('code');
                res.body.code.should.equal(Const.responsecodeSucceed);

                done();

            });
    }
    ,

    /**
     * 免疫年检
     */
    immuneYearCheck: function () {

    }


};
module.exports = InfoPreview;