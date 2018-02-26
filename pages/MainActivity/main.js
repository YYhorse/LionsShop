//获取应用实例
const app = getApp()
Page({
  data: {
    DynamicAdUrl: null,
    StaticAdUrl: 'https://m.360buyimg.com/mobilecms/jfs/t16072/18/2051412761/188193/849f56a8/5a8168a7N80e3e3ae.gif',
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({ title: '首页' });
    wx.request({
      url: 'https://lionsshop.cn/api/v1/users/home_page',
      data: {},
      method: 'GET',
      success: function (Ares) {
        console.log(Ares.data);
        that.setData({
          DynamicAdUrl: Ares.data.image_infos,
          // StaticAdUrl: Ares.data.advertisement_url,
        })
      },
      fail: function () { wx.showToast({ title: '登陆失败,服务器异常', }) }
    })
  },
  点击奢侈品: function (e) {
    wx.showLoading({ title: '奢侈品' })
  }
})
