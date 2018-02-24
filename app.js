//app.js
App({
  onLaunch: function () {
    //this.GetUserInfo();
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

              getApp().globalData.vipStatus = false;
              wx.hideLoading();
              //that.AutoLogin(res);   //自动登陆
            },
            fail: function () { wx.showToast({ title: "获取信息失败!", }) }
          })
        }
      }
    })
  },
  //-----自动登陆-----//
  AutoLogin:function(res){
    wx.hideLoading();
    //----HTTP登陆请求-----//
    wx.request({
      url: 'http://192.168.1.95:3001/api/vi/users/login',
      data: { "code": getApp().globalData.code, "nickname": res.userInfo.nickName, "sex": res.userInfo.gender, "province": res.userInfo.province, "city": res.userInfo.city, "avatar": res.userInfo.avatarUrl},
      method: 'POST',
      success: function (Ares) {
        console.log(Ares.data.status_code);
        if (Ares.data.status_code == 200){
          //---登陆成功----//
          wx.hideLoading();
          getApp().globalData.user_id = Ares.data.user_id;
          wx.showToast({ title: '登陆成功', })
        }
        else
          wx.showToast({ title: '登陆失败', })
      },
      fail: function () { wx.showToast({ title: '登陆失败', }) }
    })
  },
  globalData: {
    code: null,
    userInfo: null,
    realName: null,
    phoneNumber:null,
    vipStatus:false,
  }
})