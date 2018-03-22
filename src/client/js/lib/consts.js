var Consts = {
    credentialsMinLength: 6,

    NotificationUpdateWindowSize: "notification_update_window_size",
    NotificationUploadImageDone: "NotificationUploadImageDone",
    NotificationAddDoctorDone: "NotificationAddDoctorDone",
    infoPreviewAddVaccineCanel: "AddVaccineCanel",

    infoPreviewType: {
        //添加狗证变量
        AddDogLicense: "AddDogLicense",
        //完善房产信息
        PerfectResidence: "PerfectResidence",
        //跳转到制卡页面
        ToCardInfo: "ToCardInfo",
        //新增免疫
        AddVaccine: "AddVaccine",
    },

    ErrorCodes: {
        4000001: "没有狗证ID",
        1000001: "注册没邮箱",
        1000002: "注册没密码",
        1000003: "登录没邮箱",
        1000004: "登录没密码",
        1000005: "组织参数不全",
        1000006: "获取验证码没邮箱",
        1000007: "没发验证码",
        1000008: "登录没有用户类型",
        1000009: "注册没填验证码",
        2000001: "密码长度少于6",
        2000002: "We couldn't find your account with that username. Please try searching for your username again.",
        2000003: "The password you entered is incorrect. Please try again",
        2000004: "The email has already been registerd.",
        2000005: "注册邮箱格式错误",
        2000006: "组织存在",
        2000007: "The email has already been registerd.",
        2000008: "不存在该账户",
        2000009: "无效的验证码",
        2200001: "Email invalid.",
        2000010: "缺少宠物昵称",
        2000011: "缺少宠物性别",
        2000012: "缺少宠物种类",
        2000013: "缺少宠物用途",
        2000014: "缺少宠物毛色",
        2000015: "缺少宠物出生日期",
        2000016: "缺少宠物虹膜id",
        2000017: "缺少宠物照片",
        2000018: "缺少犬主名",
        2000019: "缺少犬主性别",
        2000020: "缺少犬主手机号",
        2000021: "缺少犬主身份类型",
        2000022: "缺少犬主身份证号",
        2000023: "缺少犬主省",
        2000024: "缺少犬主区",
        2000025: "缺少犬主市",
        2000026: "缺少犬主地址",
        2000027: "缺少犬主邮编",
        2000028: "缺少犬主座机",
        2000029: "缺少免疫名字",
        2000030: "缺少疫苗批号",
        2000031: "缺少厂商",
        2000032: "缺少兽医名",
        2000033: "缺少组织名",
        2000034: "缺少条形码",
        2000035: "已经被使用过的条形码",
        2100036: "查询时没有免疫卡号",
        2100037: "添加兽医缺少名字",
        2100038: "添加兽医缺少编号",
        2100039: "添加兽医不是数组",
        2100040: "虹膜ID存在",
        2100041: "兽医存在",
        2000038: "房产信息不能更新",
        2000039: "缺少房产参数",
        2000040: "房产已存在",
        2000041: "没有取件方式",
        2000042: "添加免疫不是数组",
        2000000: "Unknown Error",
        2000050: "The current you’ve entered is incorrect.Please enter a different password.",
    }

};

module["exports"] = Consts;