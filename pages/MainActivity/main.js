//获取应用实例
const app = getApp()
Page({
  data: {
    DynamicAdUrl: null,
    StaticAdUrl: 'https://m.360buyimg.com/mobilecms/jfs/t16072/18/2051412761/188193/849f56a8/5a8168a7N80e3e3ae.gif',
    ActivityInfo:null,
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({ title: '首页' });
    wx.request({
      url: getApp().globalData.HomeUrl + getApp().globalData.GetHomeUrl,
      data: {},
      method: 'GET',
      success: function (Ares) {
        console.log(Ares.data);
        that.setData({
          DynamicAdUrl: Ares.data.image_infos,
          StaticAdUrl: Ares.data.advertisement_url,
          ActivityInfo: Ares.data.activities,
        })
      },
      fail: function () { wx.showToast({ title: '登陆失败,服务器异常', }) }
    })
  },
  点击奢侈品: function (e) {
    app.globalData.FlashSelectFlag = true;
    app.globalData.SelectCategrayValue = '消费类';
    app.globalData.SelectItemCategory = '奢侈品';
    wx.switchTab({ url: '/pages/HelpActivity/help'})
  },
  点击酒水:function(e){
    app.globalData.FlashSelectFlag = true;
    app.globalData.SelectCategrayValue = '消费类';
    app.globalData.SelectItemCategory = '酒水';
    wx.switchTab({ url: '/pages/HelpActivity/help' })
  },
  点击保健品:function(e){
    app.globalData.FlashSelectFlag = true;
    app.globalData.SelectCategrayValue = '消费类';
    app.globalData.SelectItemCategory = '保健品';
    wx.switchTab({ url: '/pages/HelpActivity/help' })
  },
  点击汽车:function(e){
    app.globalData.FlashSelectFlag = true;
    app.globalData.SelectCategrayValue = '消费类';
    app.globalData.SelectItemCategory = '汽车用品';
    wx.switchTab({ url: '/pages/HelpActivity/help' })
  },
  点击家装:function(e){
    app.globalData.FlashSelectFlag = true;
    app.globalData.SelectCategrayValue = '消费类';
    app.globalData.SelectItemCategory = '家装';
    wx.switchTab({ url: '/pages/HelpActivity/help' })
  },
  点击财务会计:function(e){
    app.globalData.FlashSelectFlag = true;
    app.globalData.SelectCategrayValue = '业务类';
    app.globalData.SelectItemCategory = '财务会计';
    wx.switchTab({ url: '/pages/HelpActivity/help' })
  },
  点击广告传媒:function(e){
    app.globalData.FlashSelectFlag = true;
    app.globalData.SelectCategrayValue = '业务类';
    app.globalData.SelectItemCategory = '广告传媒';
    wx.switchTab({ url: '/pages/HelpActivity/help' })
  },
  点击法律顾问:function(e){
    app.globalData.FlashSelectFlag = true;
    app.globalData.SelectCategrayValue = '业务类';
    app.globalData.SelectItemCategory = '法律顾问';
    wx.switchTab({ url: '/pages/HelpActivity/help' })
  },
  点击投资担保:function(e){
    app.globalData.FlashSelectFlag = true;
    app.globalData.SelectCategrayValue = '业务类';
    app.globalData.SelectItemCategory = '投资担保';
    wx.switchTab({ url: '/pages/HelpActivity/help' })
  },
  点击更多:function(e){
    app.globalData.FlashSelectFlag = true;
    app.globalData.SelectCategrayValue = '其他类';
    app.globalData.SelectItemCategory = '更多其他';
    wx.switchTab({ url: '/pages/HelpActivity/help' })
  }
})
