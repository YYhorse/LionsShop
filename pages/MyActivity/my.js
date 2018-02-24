var app = getApp() // 获取入口文件app的应用实例
var temptest = { "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLTI0d5Vsze6Yib5NWPUHJyTjX4D3N2BGrA6XMh8zFTGXECAGzTpRDia3ib2uPhJXYYvjYOTkIeaoGWw/0", "city": "Dalian", "country": "China", "gender": 1, "language": "zh_CN", "nickName": "奥创", "province": "Liaoning" };
Page({
  data: {
    AvatarUrl: "",
    NiceName:"无",
    MyBusiness:"申请成为狮友"
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的' });
    //console.log("------" + app.globalData.code);
    this.setData({
      AvatarUrl: temptest.avatarUrl,//app.globalData.userInfo.avatarUrl,
      NiceName: temptest.nickName,
      MyBusiness: app.globalData.vipStatus == true?'业务管理':'申请成为狮友',
    })
  },
  点击管理:function(e){
    if (this.data.MyBusiness == "申请成为狮友"){
      console.log("申请成为石油");
      wx.navigateTo({url: '/pages/MyWorkActivity/mywork'});
    }
    else if (this.data.MyBusiness == "业务管理"){
      console.log("业务管理");

    }
  }
})