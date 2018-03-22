var app = getApp()      // 获取入口文件app的应用实例
Page({
  data: {
    AvatarUrl: "",
    NiceName:"无",
    CheckInfo:"",
    VipStatus:'',
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的' });
    if (app.globalData.vipStatus !='vip'){
      var ShowStatus = this.GetUserStatusInfo();
      this.setData({
        AvatarUrl: app.globalData.userInfo.avatarUrl,
        NiceName: app.globalData.userInfo.nickName,
        CheckInfo: ShowStatus,
        VipStatus: app.globalData.vipStatus,
      })
    }
    else{
      this.setData({
        AvatarUrl: app.globalData.userInfo.avatarUrl,
        NiceName: app.globalData.userInfo.nickName,
        VipStatus: app.globalData.vipStatus,
      })
    }
  },
  GetUserStatusInfo: function () {
    var ShowStatus = '';
    if (app.globalData.vipStatus == 'tourist')
      ShowStatus = '狮友验证';
    else
      ShowStatus = '信息审核中';
    return ShowStatus;
  },
  点击身份验证:function(e){
    if(app.globalData.vipStatus == 'tourist'){
      wx.navigateTo({ url: '/pages/MyWorkActivity/mywork' });
    }
    else
      wx.showToast({  title: '请耐心等待验证'})
  },
  点击管理:function(e){
    // if (this.data.MyBusiness == "申请成为狮友"){
    //   wx.navigateTo({url: '/pages/MyWorkActivity/mywork'});
    // }
    // else if (this.data.MyBusiness == "业务管理"){
    //   wx.navigateTo({ url: '/pages/MyWorkActivity/mywork' });
    // }
    // else
    //   app.GetUserInfo(); //待审核刷新
  },
  // onShow:function(){
  //   console.log("状态=" + app.globalData.vipStatus);
  //   var ShowStatus = this.GetUserStatusInfo();
  //   this.setData({MyBusiness: ShowStatus})
  // }
})