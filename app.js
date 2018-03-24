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
      url: getApp().globalData.HomeUrl + getApp().globalData.LoginUrl,
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
    FlashServiceState:false,
    FlashActivityState:false,
    SelectCategrayValue:'消费类',
    SelectItemCategory:'全球购',
    FlashSelectFlag:false,
    HomeUrl:'https://lionsshop.cn',
    LoginUrl:'/api/v1/users/login',
    PushUserUrl:'/api/v1/enter_applies',
    GetHomeUrl:'/api/v1/users/home_page',
    GetCategrayUrl:'/api/v1/industry_types',
    GetStoreInfoUrl: '/api/v1/stores',         //获取店铺信息  【我的-店铺管理】
    GetIndustriesUrl:'/api/v1/industries',     //获取行业信息   【我的-店铺管理】
    UpdataStoreInfoUrl:'/api/v1/stores',      //更新店铺信息    【我得-店铺管理】
    GetTypeUrl:'/api/v1/stores/service_index',  
    GetServiceTeamUrl:'/api/v1/service_teams/all_service_teams', 
    GetUserAppliesUrl:'/api/v1/enter_applies', 
    ApplyRegisterUrl:'/api/v1/enter_applies',
    ApplyServiceUrl:'/api/v1/stores',
    GetServiceUrl:'/api/v1/stores',
    DelServiceUrl:'/api/v1/stores/destroy_store',
    EditServiceUrl:'/api/v1/stores/edit_store',
    SearchServiceUrl: '/api/v1/stores/hunt_for',
    GetActivityUrl:'/api/v1/activities',
    PushActivityUrl:'/api/v1/activities',
    PushMessageUrl:'/api/v1/personal_dynamics',
    DelActivityUrl:'/api/v1/activities/destroy_activity',
  }
})