//获取应用实例
const app = getApp()
Page({
  data: {
    VipStatus: app.globalData.vipStatus,
    RealName: '',
    PhoneNumber:'',
    UserDetail:'',
  },
  onLoad: function (options) {
    console.log("-------"+this.data.VipStatus);
    wx.setNavigationBarTitle({ title: this.data.VipStatus=='vip'?'我的业务':'申请信息'});
  },
  输入姓名:function(e){
    this.setData({
      RealName: e.detail.value
    })
  },
  输入手机号:function(e){
    this.setData({
      PhoneNumber: e.detail.value
    })
  },
  输入备注: function (e) {
    this.setData({
      UserDetail: e.detail.value
    })
  },
  点击提交信息:function(e){
    console.log("姓名:" + this.data.RealName + "电话:" + this.data.PhoneNumber + "备注:" + this.data.UserDetail);
    wx.showLoading({ title: '提交中' }),
    wx.request({
      url: 'https://lionsshop.cn/api/v1/enter_applies',
      data: { "real_name": this.data.RealName, "phone_number": this.data.PhoneNumber, "detail": this.data.UserDetail, "user_id": app.globalData.user_id},
      method: 'POST',
      success: function (Ares) {
        console.log(Ares.data);
        if (Ares.data.status_code == 200) {
          //---申请成功----//
          wx.showToast({ title: '申请成功', });
          wx.navigateBack();
          app.globalData.vipStatus = "wait_for_audit";
        }
        else{
          wx.hideLoading();
          wx.showToast({ title: '申请失败,接口返回' + Ares.data.status_code, });
        }
      },
      fail: function () { wx.hideLoading(); wx.showToast({ title: '登陆失败,服务器异常', }) }
    })
  }
})