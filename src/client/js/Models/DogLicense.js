var Backbone = require('backbone');
var _ = require('lodash');
var LocalStorage = require('backbone.localstorage').LocalStorage;


// Class ------------------------------------------------
var DogLicenseModel = Backbone.Model.extend({
    
    localStorage: new LocalStorage("DogLicenseModel"),

    defaults: {
        //畜牧业提供的条形码
        husbandryNo: "",
        //狗
        dog: {
            nickname: "",
            sex: "",
            breed: "",
            usage: "",
            hairColor: "",
            bornDate: "",
            irisID: "",
            photoUrl: "",
            vaccine: {
                name: "",
                batchNo: "",
                manufacturer: "",
                veterinarianName: "",
                organizationName: "",
            }

        },
        //主人
        owner: {
            name: "",
            sex: "",
            tel: "",
            phone: "",
            certificateType: "",
            certificateCode: "",
            province: "",
            district: "",
            city: "",
            address: "",
            code: "",

        },
        //免疫卡
        vaccine: {
            name: "",        //疫苗名称
            batchNo: "",	 //批号
            manufacturer: "", //厂商
            veterinarianName: "",//打疫苗的兽医
            organizationName: "", //免疫点名称
            created: "", //创建时间	},
            //户籍
            residence: {
                houseNo: "",
                houseProperty: "",
                address: "",
                isSterilization: ""
            },
            //所属机构办理
            organization: {
                name: {
                    type: ""
                },//机构名字
                location: {
                    province: "",
                    district: "",
                    city: "",
                    address: "",
                    code: "" //邮编
                },
                tel: "", //座机
                businessLicense: "",  //图片 url地址  用七牛服务存储
                animalMedicalLicense: "", //图片 url地址  用七牛服务存储
                serviceScope: [], //服务范围 eg: [美容，医疗]
                //联系人信息
                contacts: {
                    name: "",
                    phone: "",
                },
                checkStatus: {
                    status: "", //状态：  0等待审核   1审核通过   -1审核未通过
                    comment: "",
                    time: "", //时间
                },
                veterinarians: [{
                    type: "",
                    name: "",  //疫苗名称
                    code: "",  //证件号
                    created: "", //创建时间
                }], //兽医(填写人名)
                created: ""
            }
        },
        //是否制卡
        vaccineCard: {
            isCreate: "",  //0不能制卡 1能制卡
            info: {
                cardNo: "", //免疫证号
                name: "", //犬主姓名
                addresses: "",
                district: "",//区县
                breed: "",
                hairColor: "",
                vaccineCreate: "",
                irisID: "",
                annualDate: [], //1306 1806
                signOrganization: "", //签发机构
                signCreate: "", //初始发证日期

            }, //制卡信息

            annual: {
                canAnnual: "",  //是否能年审（需要免疫卡一直可以年审）
                updateDate: "",
            },

            create: "",//创建时间
        },
        DogCard: {
            isCreate: "",  //0不能制卡 1能制卡
            message: "", //
            annual: {
                canAnnual: "",  //是否能年审（需要免疫卡先年审，狗证才能年审）
                updateDate: "",

            },
            info: {
                cardNo: "", //登记证号
                name: "",
                addresses: "",
                district: "",//区县
                irisID: "",
                breed: "",
                hairColor: "",
                annualDate: [], //1206 1806
                loopLineType: "",
                signOrganization: "", //签发机构
                signCreate: "", //初始发证日期
            },
            create: "",//创建时间
        },
        //创建时间
        create: "",
        //更新时间
        update: "",
    },


    initialize: function () {

    },


});

module["exports"] = DogLicenseModel;

