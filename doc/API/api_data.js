define({ "api": [
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
  }
] });
