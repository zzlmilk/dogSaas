define({ "api": [
  {
    "type": "post",
    "url": "/dogLicense/add",
    "title": "办理狗证",
    "name": "addDogLicense",
    "group": "DogLicense",
    "description": "<p>办理狗证信息api接口,获取狗，疫苗，用户，房产信息</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "husbandryNo",
            "description": "<p>畜牧业提供的条形码</p>"
          }
        ],
        "dog": [
          {
            "group": "dog",
            "type": "String",
            "optional": false,
            "field": "nickname",
            "description": "<p>宠物昵称</p>"
          },
          {
            "group": "dog",
            "type": "String",
            "optional": false,
            "field": "sex",
            "description": "<p>性别</p>"
          },
          {
            "group": "dog",
            "type": "String",
            "optional": false,
            "field": "breed",
            "description": "<p>品种</p>"
          },
          {
            "group": "dog",
            "type": "String",
            "optional": false,
            "field": "usage",
            "description": "<p>用途</p>"
          },
          {
            "group": "dog",
            "type": "String",
            "optional": false,
            "field": "hairColor",
            "description": "<p>毛色</p>"
          },
          {
            "group": "dog",
            "type": "Date",
            "optional": false,
            "field": "bornDate",
            "description": "<p>出生日期</p>"
          },
          {
            "group": "dog",
            "type": "Number",
            "optional": false,
            "field": "irisID",
            "description": "<p>虹膜id</p>"
          },
          {
            "group": "dog",
            "optional": false,
            "field": "photoUrl",
            "description": "<p>宠物照片</p>"
          }
        ],
        "dog_vaccine": [
          {
            "group": "dog_vaccine",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>疫苗名称</p>"
          },
          {
            "group": "dog_vaccine",
            "type": "String",
            "optional": false,
            "field": "batchNo",
            "description": "<p>批号</p>"
          },
          {
            "group": "dog_vaccine",
            "type": "String",
            "optional": false,
            "field": "manufacturer",
            "description": "<p>厂商</p>"
          },
          {
            "group": "dog_vaccine",
            "type": "String",
            "optional": false,
            "field": "veterinarianName",
            "description": "<p>打疫苗的兽医</p>"
          },
          {
            "group": "dog_vaccine",
            "type": "String",
            "optional": false,
            "field": "organizationName",
            "description": "<p>免疫点名称</p>"
          }
        ],
        "owner": [
          {
            "group": "owner",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>主人名字</p>"
          },
          {
            "group": "owner",
            "type": "String",
            "optional": false,
            "field": "sex",
            "description": "<p>性别   1男 2女</p>"
          },
          {
            "group": "owner",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>座机</p>"
          },
          {
            "group": "owner",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号码</p>"
          },
          {
            "group": "owner",
            "type": "String",
            "optional": false,
            "field": "certificateType",
            "description": "<p>证件类型  1身份证 2护照</p>"
          },
          {
            "group": "owner",
            "type": "String",
            "optional": false,
            "field": "certificateCode",
            "description": "<p>证件号</p>"
          },
          {
            "group": "owner",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>省</p>"
          },
          {
            "group": "owner",
            "type": "String",
            "optional": false,
            "field": "district",
            "description": "<p>区</p>"
          },
          {
            "group": "owner",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>城市</p>"
          },
          {
            "group": "owner",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>地址</p>"
          },
          {
            "group": "owner",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>邮编</p>"
          }
        ],
        "residence": [
          {
            "group": "residence",
            "type": "String",
            "optional": false,
            "field": "houseNo",
            "description": "<p>(沪)房地（长）字（2006）第(000386)号</p>"
          },
          {
            "group": "residence",
            "type": "String",
            "optional": false,
            "field": "houseProperty",
            "description": "<p>自由和租凭</p>"
          },
          {
            "group": "residence",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>xxx路xxx弄xxx号 ，用户判断唯一性</p>"
          },
          {
            "group": "residence",
            "type": "Number",
            "optional": false,
            "field": "isSterilization",
            "description": "<p>是否绝育  0:未绝育 1:绝育</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "\n{  husbandryNo:global.getRandomStr(),\n        dog:{\n            nickname: \"test_\" + global.getRandomStr(),\n            sex:\"1\",\n            breed:\"breed\",\n            usage:\"警卫\",\n            hairColor:\"白色\",\n            bornDate:\"2016-08-10\",\n            irisID:\"a12345678\",\n            photoUrl:\"123\",\n            vaccine:{\n                name:\"av\",\n                batchNo:\"123\",\n                manufacturer:\"manufacturer\",\n                veterinarianName:\"veterinarianName\",\n                organizationName:\"organizationName\",\n            }\n\n        },\n        owner:{\n            name: \"test_\" + global.getRandomStr(),\n            sex:\"1\",\n            tel:\"345033\",\n            phone:\"15901794453\",\n            certificateType:\"1\",\n            certificateCode:\"31010211111111\",\n            province:\"province\",\n            district:\"district\",\n            city:\"city\",\n            address:\"address\",\n            code:\"code\",\n\n        },\n        residence:{\n            houseNo:\"1234\",\n            houseProperty:\"ziyou\",\n            address:\"1234\",\n            isSterilization:\"0\"\n        }\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ dogLicense:\n { __v: 0,\n   owner: '5a1f603923027209fcffa110',\n   dog: '5a1f6217fd9fd21fb4f2d8aa',\n   residence: '5a1f6217fd9fd21fb4f2d8a8',\n   husbandryNo: 'jzOM0',\n   _id: '5a1f6217fd9fd21fb4f2d8a7',\n   DogCard: { isCreate: 1, message: '可以办理狗证' },\n   vaccineCard: { isCreate: 1, create: '2017-11-30T01:42:47.637Z' } } }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/WebAPI/DogLicense/AddDogLicenseHandler.js",
    "groupTitle": "DogLicense"
  },
  {
    "type": "get",
    "url": "/dogLicense/find_by_dog",
    "title": "查询狗证（犬只）",
    "name": "findDogLicenseByDog",
    "group": "DogLicense",
    "description": "<p>查询api接口，获取狗证信息</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "irisID",
            "description": "<p>虹膜ID</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Access-Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ dogLicenses:\n   { _id: '5a26561758875261c0a5da71',\n     owner: '5a1f603923027209fcffa110',\n     dog: '5a26561758875261c0a5da73',\n     husbandryNo: 'jK3qR',\n     __v: 0,\n     DogCard: { isCreate: 0, message: '该房产已经被注册' },\n     vaccineCard: { isCreate: 1, create: '2017-12-05T08:17:27.078Z' } } }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/WebAPI/DogLicense/FindDogLicenseByDogHandler.js",
    "groupTitle": "DogLicense"
  },
  {
    "type": "get",
    "url": "/dogLicense/find_by_owner",
    "title": "查询狗证（犬主）",
    "name": "findDogLicenseByOwner",
    "group": "DogLicense",
    "description": "<p>查询api接口，获取狗证信息</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>犬主名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "certificateType",
            "description": "<p>证件类型</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "certificateCode",
            "description": "<p>证件号</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Access-Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ dogLicenses:\n   [ { _id: '5a1f603923027209fcffa10d',\n       owner: '5a1f603923027209fcffa110',\n       dog: '5a1f603923027209fcffa10f',\n       husbandryNo: 'Jykjx',\n       __v: 0,\n       DogCard: [Object],\n       vaccineCard: [Object] },\n     { _id: '5a24f583bf77595ff08bf873',\n       owner: '5a24f583bf77595ff08bf876',\n       dog: '5a24f583bf77595ff08bf875',\n       husbandryNo: '33RNR',\n       __v: 0,\n       DogCard: [Object],\n       vaccineCard: [Object] } ] }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/WebAPI/DogLicense/FindDogLicenseByOwnerHandler.js",
    "groupTitle": "DogLicense"
  },
  {
    "type": "post",
    "url": "Send/Email",
    "title": "获取验证码",
    "name": "sendmail",
    "group": "Email",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Access-Token",
            "description": "<p>Users unique access-token.</p>"
          }
        ]
      }
    },
    "description": "<p>获取验证码api接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "useType",
            "description": "<p>1:注册使用；2:忘记密码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ code: 1}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/WebAPI/Email/SendEmailHandler.js",
    "groupTitle": "Email"
  },
  {
    "type": "post",
    "url": "vaild/Email",
    "title": "验证验证码",
    "name": "vaildmail",
    "group": "Email",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Access-Token",
            "description": "<p>Users unique access-token.</p>"
          }
        ]
      }
    },
    "description": "<p>验证验证码api接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>验证码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "useType",
            "description": "<p>1:注册使用；2:忘记密码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\nemail: '2420933732@qq.com',\nuseType: '1' }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/WebAPI/Email/VaildEmailHandler.js",
    "groupTitle": "Email"
  },
  {
    "type": "post",
    "url": "/organization/add",
    "title": "添加机构",
    "name": "addOrganization",
    "group": "Organization",
    "description": "<p>添加机构信息api接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>机构名字</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>省</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "district",
            "description": "<p>区</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>城市</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>邮编</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>座机</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "businessLicense",
            "description": "<p>营业执照图片url地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "animalMedicalLicense",
            "description": "<p>动物诊疗许可证图片url地址</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "serviceScope",
            "description": "<p>服务范围</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contacts_name",
            "description": "<p>联系人姓名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contacts_phone",
            "description": "<p>联系人电话</p>"
          }
        ],
        "veterinarian": [
          {
            "group": "veterinarian",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>兽医名字</p>"
          },
          {
            "group": "veterinarian",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>兽医执照号</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "\n {\n\t name: \"test_\" + global.getRandomStr(),\n\t province: \"上海\",\n\t district: \"浦东新区\",\n\t city: \"航头镇\",\n\t address: \"杭南公路\",\n\t code: \"123456\",\n\t tel: \"15838365455\",\n\t businessLicense: \"123\",\n\t animalMedicalLicense: \"123\",\n\t serviceScope: \"美容\",\n\t contacts_name: \"admin\",\n\t contacts_phone: \"15838365455\",\n\n\t veterinarian: {\n\t\t name: \"张三\",\n\t\t code: \"110\"\n\t }\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ organization:\n  { __v: 0,\n    name: 'test_xChnk',\n    tel: '15838365455',\n    businessLicense: '123',\n    animalMedicalLicense: '123',\n    adminUser: '5a0bec3f3bea6821641c8c18',\n    created: '2017-12-06T04:44:19.124Z',\n    _id: '5a2775a36449ea31dc31a9ff',\n    veterinarian: [ '5a2775a36449ea31dc31a9fe' ],\n    checkStatus: { status: 0, time: '2017-12-06T04:44:19.123Z' },\n    contacts: { name: 'admin', phone: '15838365455' },\n    serviceScope: [ '美容' ],\n    location:\n     { province: '上海',\n       district: '浦东新区',\n       city: '航头镇',\n       address: '杭南公路',\n       code: '123456' } } }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/WebAPI/Organization/AddOrganizationHandler.js",
    "groupTitle": "Organization"
  },
  {
    "type": "post",
    "url": "/organization/edit",
    "title": "编辑机构信息",
    "name": "editOrganization",
    "group": "Organization",
    "description": "<p>编辑机构信息api接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>机构名字</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>省</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "district",
            "description": "<p>区</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>城市</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>邮编</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>座机</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "businessLicense",
            "description": "<p>营业执照图片url地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "animalMedicalLicense",
            "description": "<p>动物诊疗许可证图片url地址</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "serviceScope",
            "description": "<p>服务范围</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contacts_name",
            "description": "<p>联系人姓名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contacts_phone",
            "description": "<p>联系人电话</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ organization:\n  { __v: 0,\n    name: 'test_Esv3Q',\n    tel: '15838365455',\n    businessLicense: '123',\n    animalMedicalLicense: '123',\n    adminUser: '5a0bec3f3bea6821641c8c18',\n    created: '2017-11-28T07:45:57.005Z',\n    _id: '5a1d1435185d925c9c3c14c8',\n    veterinarians: [],\n    checkStatus: { status: 0, time: '2017-11-28T07:45:57.004Z' },\n    contacts: { name: 'admin', phone: '15838365455' },\n    serviceScope: [],\n    location:\n     { province: '上海',\n       district: '浦东新区',\n       city: '航头镇',\n       address: '杭南公路',\n       code: '123456' } } }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/WebAPI/Organization/EditorganizationHandler.js",
    "groupTitle": "Organization"
  },
  {
    "type": "get",
    "url": "/organization/show",
    "title": "获取机构信息",
    "name": "showOrganization",
    "group": "Organization",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "token",
            "description": "<p>Access-Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success_Response:",
          "content": "{ organization:\n { _id: '5a1d138dfac88f58a0a4330b',\n   name: 'test_ke7Ht',\n   tel: '15838365455',\n   businessLicense: '123',\n   animalMedicalLicense: '123',\n   adminUser:\n    { _id: '5a0bec3f3bea6821641c8c18',\n      email: '413124766@qq.com',\n      password: '0062003400520061004900667F6289DE275B2896C34A86CD3BD8852A',\n      created: '2017-11-15T07:26:55.376Z',\n      token: '9Q05UVlIwaXAf28B919Uc64k',\n      isAccountEnabled: 1,\n      logionProcess: 1,\n      __v: 0,\n      organization: '5a1d1435185d925c9c3c14c8' },\n   created: '2017-11-28T07:43:09.274Z',\n   __v: 0,\n   veterinarians: [],\n   checkStatus: { status: 0, time: '2017-11-28T07:43:09.273Z' },\n   contacts: { name: 'admin', phone: '15838365455' },\n   serviceScope: [],\n   location:\n    { province: '上海',\n      district: '浦东新区',\n      city: '航头镇',\n      address: '杭南公路',\n      code: '123456' } } }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/WebAPI/Organization/ShowOrganizationHandler.js",
    "groupTitle": "Organization"
  },
  {
    "type": "get",
    "url": "owner/find",
    "title": "查询犬主",
    "name": "findOwner",
    "group": "Owner",
    "description": "<p>查询api接口，获取犬主信息</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "certificateType",
            "description": "<p>证件类型</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "certificateCode",
            "description": "<p>证件号</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Access-Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ owner:\n   { _id: '5a24f583bf77595ff08bf876',\n     name: 'test_kEiAr',\n     sex: '1',\n     phone: '15901794453',\n     tel: '345033',\n     certificateType: '1',\n     certificateCode: '31010222222222',\n     __v: 1,\n     dogs: [ '5a24f5c6a8b1f54b60bfbd1a' ],\n     location:\n      { province: 'province',\n        district: 'district',\n        city: 'city',\n        address: 'address',\n        code: 'code' } } }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/WebAPI/Owner/FindOwnerHandler.js",
    "groupTitle": ""
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "用户登录",
    "name": "login",
    "group": "User",
    "description": "<p>登录api接口，获取用户token 和用户信息</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Model",
            "optional": false,
            "field": "user",
            "description": "<p>Model of loginned user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \t  token: '3JQKTIhfV7gdk7E2UZqKteQ3',\n\t  user: \n\t   { _id: '5a1bc7c8fa5f0a59734923e2',\n\t     email: '413124766@qq.com',\n\t     logionProcess: 1,\n\t     organization: \n\t      { _id: '5a1cde7ff9e55785d860fd83',\n\t        name: 'test_d7OpY',\n\t        tel: '15838365455',\n\t        businessLicense: '123',\n\t        animalMedicalLicense: '123',\n\t        adminUser: '5a1bc7c8fa5f0a59734923e2',\n\t        created: '2017-11-28T03:56:47.154Z',\n\t        __v: 0,\n\t        veterinarians: [],\n\t        checkStatus: [Object],\n\t        contacts: [Object],\n\t        serviceScope: [],\n\t        location: [Object] } } }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/WebAPI/User/LoginHandler.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/register",
    "title": "用户注册",
    "name": "register",
    "group": "User",
    "description": "<p>注册api接口，获取token</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>验证码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ token: 'PGXNvuC1W7q3BRfOSD1lSFc1',\n     user:\n      { _id: '5a1cf5857651f434a8eeb4ba',\n        email: '2420933732@qq.com',\n        logionProcess: 0 } } }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/WebAPI/User/RegisterHandler.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/set_password",
    "title": "忘记密码",
    "name": "setassword",
    "group": "User",
    "description": "<p>忘记密码api接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " { token: 'q6QKHgEK7fk2981KPhRps8rT',\nuser:\n { _id: '5a1cf5857651f434a8eeb4ba',\n   email: '2420933732@qq.com',\n   logionProcess: 0 } }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/WebAPI/User/SetPasswordHandler.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/test",
    "title": "Test",
    "name": "Tes111t",
    "group": "WebAPI",
    "description": "<p>Just test[] we434</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "test1111",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/WebAPI/TestHandler.js",
    "groupTitle": "WebAPI"
  },
  {
    "type": "GET",
    "url": "/Qiniu/token",
    "title": "获取qiniu tokern",
    "name": "qiuniu",
    "group": "qiuniu",
    "description": "<p>获取qiniu</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Sting",
            "optional": false,
            "field": "access-key",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ code: 1,\n  data: \n  { token: 'k-ZxbCCBV3eLH5k2nUnSZo6OG_2zWfohupr_DZa2:0Zt0mMjvEWaRySAPFGLMFbvv3pU=:eyJzY29wZSI6ImhhbG9raXQiLCJkZWFkbGluZSI6MTQ5OTkzNTM3OX0=' } }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/WebAPI/QiNiuHandler.js",
    "groupTitle": "qiuniu"
  }
] });
