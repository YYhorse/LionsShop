//获取应用实例
const app = getApp()
Page({
  data: {
    movies: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
AdUrl:'https://m.360buyimg.com/mobilecms/jfs/t16072/18/2051412761/188193/849f56a8/5a8168a7N80e3e3ae.gif',
  },
  onLoad:function(options){
    wx.setNavigationBarTitle({ title: '首页' });
    wx.request({
      url: 'https://lionsshop.cn/api/v1/users/home_page',
      data: {},
      method: 'GET',
      success: function (Ares) {
        console.log(Ares.data);
      },
      fail: function () { wx.showToast({ title: '登陆失败,服务器异常', }) }
    })
  },
  点击奢侈品:function(e){
    wx.showLoading({ title: '奢侈品' })
  }
})
