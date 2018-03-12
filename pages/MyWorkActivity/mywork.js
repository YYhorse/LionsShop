//获取应用实例
const app = getApp()
Page({
  data: {
    VipStatus: '',
    RealName: '',
    PhoneNumber: '',
    UserDetail: '',
    ConsumerClass: null,
    BusinessClass: null,
    OtherClasses: null,
    MyService: null,
    PullDownRefreshStatus: false,
  },
  onLoad: function (options) {
    this.setData({ VipStatus: app.globalData.vipStatus });
    console.log("子状态:" + this.data.VipStatus);
    if (this.data.VipStatus == 'vip') {
      wx.setNavigationBarTitle({ title: '我的业务' });
      this.刷新个人业务();
    }
    else
      wx.setNavigationBarTitle({ title: '申请信息' });
  },
  onShow: function () {
    if (getApp().FlashServiceState == true) {
      console.log('成功编辑后刷新')
      getApp().FlashServiceState = false;
      this.刷新个人业务();
    }
  },
  // 下拉刷新  
  onPullDownRefresh: function () {
    // 显示导航栏loading  
    wx.showNavigationBarLoading();
    this.data.PullDownRefreshStatus = true;
    this.刷新个人业务();
  },
  刷新个人业务: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.HomeUrl + getApp().globalData.GetServiceUrl,
      data: { "user_id": app.globalData.user_id },
      method: 'GET',
      success: function (Ares) {
        console.log(Ares.data);
        if (that.data.PullDownRefreshStatus) {
          that.data.PullDownRefreshStatus = false;
          wx.hideNavigationBarLoading();       // 隐藏导航栏loading  
          wx.stopPullDownRefresh();
        }
        if (Ares.data.status_code == 200) {
          that.setData({ MyServices: Ares.data.stores })
        }
        else
          wx.showToast({ title: '无个人业务', })
      },
      fail: function () { wx.showToast({ title: '获取失败,服务器异常', }) }
    })
  },
  输入姓名: function (e) {
    this.setData({ RealName: e.detail.value })
  },
  输入手机号: function (e) {
    this.setData({ PhoneNumber: e.detail.value })
  },
  输入备注: function (e) {
    this.setData({ UserDetail: e.detail.value })
  },
  点击提交信息: function (e) {
    console.log("姓名:" + this.data.RealName + "电话:" + this.data.PhoneNumber + "备注:" + this.data.UserDetail);
    wx.showLoading({ title: '提交中' }),
      wx.request({
        url: getApp().globalData.HomeUrl + getApp().globalData.ApplyRegisterUrl,
        data: { "real_name": this.data.RealName, "phone_number": this.data.PhoneNumber, "detail": this.data.UserDetail, "user_id": app.globalData.user_id },
        method: 'POST',
        success: function (Ares) {
          console.log(Ares.data);
          if (Ares.data.status_code == 200) {
            //---申请成功----//
            wx.showToast({ title: '申请成功', });
            wx.navigateBack();
            app.globalData.vipStatus = "wait_for_audit";
          }
          else {
            wx.hideLoading();
            wx.showToast({ title: '申请失败,接口返回' + Ares.data.status_code, });
          }
        },
        fail: function () { wx.hideLoading(); wx.showToast({ title: '登陆失败,服务器异常', }) }
      })
  },
  点击指定业务: function (e) {
    var Index = e.currentTarget.dataset.numid;
    let MyServiceJson = JSON.stringify(this.data.MyServices[Index]);
    // console.log('点击事件' + Index);
    console.log(MyServiceJson);
    wx.navigateTo({ url: '/pages/MyServiceDetailActivity/myservicedetail?serviceJson=' + MyServiceJson })
  },
  点击发布新业务: function (e) {
    wx.navigateTo({ url: '/pages/MyServiceActivity/myservice' });
  },
})