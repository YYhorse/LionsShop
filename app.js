//app.js
App({
  onLaunch: function () {
    this.GetUserInfo();
  },
  //-----获取用户信息------//
  GetUserInfo: function () {
    var that = this;
    wx.showLoading({ title: '正在登录中' }),
    wx.login({
      success: function (res) {
        if (res.code) {
          getApp().globalData.code = res.code;
          console.log('Code=' + res.code);
          //-----获取用户信息-------//
          wx.getUserInfo({
            success: function (res) {
              getApp().globalData.userInfo = res.userInfo
              if(that.userInfoReadyCallback)
                that.userInfoReadyCallback(res)
              console.log(res.userInfo);
              that.AutoLogin(res);      //自动登陆
            },
            fail: function () { wx.showToast({ title: "获取信息失败!", }) }
          })
        }
      }
    })
  },
  //-----自动登陆-----//
  AutoLogin:function(res){
    //----HTTP登陆请求-----//
    wx.request({
      url: 'https://lionsshop.cn/api/v1/users/login',
      data: { "code": getApp().globalData.code, "nickname": res.userInfo.nickName, "sex": res.userInfo.gender, "province": res.userInfo.province, "city": res.userInfo.city, "avatar": res.userInfo.avatarUrl},
      method: 'POST',
      success: function (Ares) {
        wx.hideLoading();
        console.log(Ares.data);
        if (Ares.data.status_code == 200){
          //---登陆成功----//
          wx.showToast({ title: '登陆成功', });
          getApp().globalData.user_id = Ares.data.user_id;
          getApp().globalData.vipStatus = Ares.data.user_state; //tourist   vip   wait_for_audit 
          if (getApp().globalData.vipStatus == 'vip'){
            //是VIP用户
            getApp().globalData.realName = Ares.data.real_name;
            getApp().globalData.phoneNumber = Ares.data.phone_number;
          }
        }
        else{
          wx.showToast({ title: '登陆失败,接口' + Ares.data.status_code, })
        }
      },
      fail: function () { wx.hideLoading(); wx.showToast({ title: '登陆失败，服务器异常', }) }
    })
  },
  globalData: {
    code: null,
    user_id:null,
    userInfo: null,
    realName: null,
    phoneNumber:null,
    vipStatus:false,
  }
})