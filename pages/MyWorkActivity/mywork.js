//获取应用实例
const app = getApp()
Page({
  data: {
    VipStatus:  false,//app.globalData.vipStatus,
    RealName: '',
    PhoneNumber:'',
    Detail:'',
  },
  onLoad: function (options) {
    console.log("-------"+this.data.VipStatus);
    wx.setNavigationBarTitle({ title: this.data.VipStatus==true?'我的业务':'申请信息'});
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
      Detail: e.detail.value
    })
  },
  点击提交信息:function(e){
    console.log("姓名:" + this.data.RealName);
  }
})