//获取应用实例
const app = getApp()
Page({
  data: {
    SelectCategory:0
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '狮友帮' });
  },
  点击消费类:function (e) {
    this.setData({
      SelectCategory:0
    })
  },
  点击业务类: function (e) {
    this.setData({
      SelectCategory: 1
    })
  },
  点击其他类: function (e) {
    this.setData({
      SelectCategory: 2
    })
  },
})