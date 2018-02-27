var app = getApp() // 获取入口文件app的应用实例
Page({
  data: {
    AvatarUrl: "",
    NiceName:"无",
    MyBusiness:"申请成为狮友"
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的' });
    var ShowStatus = this.GetUserStatusInfo();
    this.setData({
      AvatarUrl: app.globalData.userInfo.avatarUrl,
      NiceName: app.globalData.userInfo.nickName,
      MyBusiness: ShowStatus,
    })
  },
  点击管理:function(e){
    if (this.data.MyBusiness == "申请成为狮友"){
      console.log("申请成为石油");
      wx.navigateTo({url: '/pages/MyWorkActivity/mywork'});
    }
    else if (this.data.MyBusiness == "业务管理"){
      console.log("业务管理");
      wx.navigateTo({ url: '/pages/MyWorkActivity/mywork' });
    }
    else
      app.GetUserInfo(); //待审核刷新
  },
  GetUserStatusInfo:function(){
    var ShowStatus = '';
    if (app.globalData.vipStatus == 'tourist')
      ShowStatus = '申请成为狮友';
    else if (app.globalData.vipStatus == 'vip')
      ShowStatus = '业务管理';
    else
      ShowStatus = '信息审核中';  
    return ShowStatus;
  },
  onShow:function(){
    console.log("状态=" + app.globalData.vipStatus);
    var ShowStatus = this.GetUserStatusInfo();
    this.setData({MyBusiness: ShowStatus})
  }
})