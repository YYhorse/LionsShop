//获取应用实例
const app = getApp()
Page({
  data: {
    scrollHeight:null,
    SelectCategory:'消费类',
    SelectItemCategory:'全球购',
    CurrentCategoryPostion: 0,
    ConsumerClass:null,
    BusinessClass:null,
    OtherClasses:null
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({ title: '狮友帮' });
    //获取系统的参数，scrollHeight数值,微信必须要设置style:height才能监听滚动事件
    wx.getSystemInfo({
      success: function (res) {
        that.setData({  scrollHeight: parseInt(res.windowHeight) - 90 })
      }
    });
    //加载类别信息
    this.加载类别产品信息();
  },
  加载类别产品信息:function(){
    var that = this;
    wx.request({
      url: getApp().globalData.HomeUrl + getApp().globalData.GetCategrayUrl,
      data: {},
      method: 'GET',
      success: function (Ares) {
        console.log(Ares.data);
        if (Ares.data.status_code == 200) {
          that.setData({
            ConsumerClass: Ares.data.消费类,
            BusinessClass: Ares.data.业务类,
            OtherClasses: Ares.data.其他类,
            SelectCategory: '消费类',
            CurrentCategoryPostion: 0,
            SelectItemCategory: Ares.data.消费类[0],
          });
        }
        else {
          wx.showToast({ title: '申请失败,接口返回' + Ares.data.status_code, });
        }
      },
      fail: function () { wx.showToast({ title: '登陆失败,服务器异常', }) }
    })
  },
  点击消费类:function (e) {
    this.setData({
      SelectCategory:'消费类',
      CurrentCategoryPostion:0,
      SelectItemCategory: this.data.ConsumerClass[0],
    })
    console.log(this.data.SelectItemCategory);
  },
  点击业务类: function (e) {
    this.setData({
      SelectCategory: '业务类',
      CurrentCategoryPostion: 0,
      SelectItemCategory: this.data.BusinessClass[0],
    })
    console.log(this.data.SelectItemCategory);
  },
  点击其他类: function (e) {
    this.setData({
      SelectCategory: '其他类',
      CurrentCategoryPostion: 0,
      SelectItemCategory: this.data.OtherClasses[0],
    })
    console.log(this.data.SelectItemCategory);
  },
  选中消费类别数据:function (e) {
    var Index = e.currentTarget.dataset.numid;
    this.setData({
      CurrentCategoryPostion: Index,
      SelectItemCategory: this.data.ConsumerClass[Index],
    })
  },
  选中业务类别数据:function (e) {
    var Index = e.currentTarget.dataset.numid;
    this.setData({
      CurrentCategoryPostion: Index,
      SelectItemCategory: this.data.BusinessClass[Index],
    })
  },
  选中其他类别数据:function (e) {
    var Index = e.currentTarget.dataset.numid;
    this.setData({
      CurrentCategoryPostion: Index,
      SelectItemCategory: this.data.OtherClasses[Index],
    })
  },
  点击指定业务:function(e){
    var Index = e.currentTarget.dataset.numid;
    console.log('点击事件' + Index);
    let MyServiceJson = JSON.stringify(this.data.SelectItemCategory.service_lists[Index]);
    console.log(MyServiceJson);
    wx.navigateTo({ url: '/pages/HelpDetailActivity/helpdetail?MyServiceJson=' + MyServiceJson })
  }
})