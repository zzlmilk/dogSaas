var Consts = {
    credentialsMinLength: 6,

    NotificationUpdateWindowSize: "notification_update_window_size",
    NotificationUploadImageDone: "NotificationUploadImageDone",
    NotificationAddDoctorDone: "NotificationAddDoctorDone",



    infoPreviewAddVaccineCanel: "AddVaccineCanel",

    infoPreviewType:{
        //添加狗证变量
        AddDogLicense:"AddDogLicense",
        //完善房产信息
        PerfectResidence:"PerfectResidence",
        //跳转到制卡页面
        ToCardInfo:"ToCardInfo",
        //新增免疫
        AddVaccine:"AddVaccine",
    },

    ErrorCodes: {
        2000000: "Unknown Error",
        2000001: "Username is empty",
        2000002: "resCodeLoginNoUser",
        2000003: "Password is wrong",
        2000004: "Username is already taken",
        2000005: "Email is already taken",
        2000006: "resCodeAddOrganizationExisting",
        2000007: "此邮箱已被注册",
        2000008: "Wrong secret",
        2000009: "邮件连接无效",
        2200001: "resCodeLoginerrEmail",


        1000003: "1111",
        1000004: "1000004",

    }


};


// Exports ----------------------------------------------
module["exports"] = Consts;