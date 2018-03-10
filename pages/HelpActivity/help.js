//获取应用实例
const app = getApp()
Page({
  data: {
    SearchText:null,
    scrollHeight:null,
    SelectCategory: null,
    SelectItemCategory:null,
    CurrentCategoryPostion: 0,
    ConsumerClass:null,
    BusinessClass:null,
    OtherClasses:null,
    PullDownRefreshStatus: false,
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({ title: '狮友帮' });
    //获取系统的参数，scrollHeight数值,微信必须要设置style:height才能监听滚动事件
    wx.getSystemInfo({  success: function (res) { that.setData({  scrollHeight: parseInt(res.windowHeight) - 90 }) } });
    //加载类别信息
    if (app.globalData.FlashSelectFlag == false)
      this.加载类别产品信息();
  },
  onShow:function(){
    if (app.globalData.FlashSelectFlag == true){
      console.log("狮友帮刷新=");
      this.加载类别产品信息();
    }
  },
  // 下拉刷新  
  onPullDownRefresh: function () {
    // 显示导航栏loading  
    wx.showNavigationBarLoading();
    this.data.PullDownRefreshStatus = true;
    this.加载类别产品信息();
  },
  输入搜索: function (e) {
    this.setData({ SearchText: e.detail.value })
  },
  点击搜索:function(e){
    var that = this;
    console.log('搜索' + this.data.SearchText);
    wx.showLoading({ title: '搜索业务中' }),
      wx.request({
        url: getApp().globalData.HomeUrl + getApp().globalData.SearchServiceUrl,
        data: { "search_name": that.data.SearchText },
        method: 'POST',
        success: function (Ares) {
          wx.hideLoading();
          console.log(Ares.data);
          if (Ares.data.status_code == 200) {
            // console.log('删除成功');
            let SearchServiceJson = JSON.stringify(Ares.data.stores);
            console.log(SearchServiceJson);
            wx.navigateTo({ url: '/pages/HelpSearchActivity/helpsearch?SearchServiceJson=' + SearchServiceJson })
          }
          else {
            // wx.showModal({
            //   title: '错误提示',
            //   content: '接口返回错误=' + Ares.data.state_code,
            //   success: function (res) {
            //     if (res.confirm || res.cancel)
            //       wx.navigateBack();
            //   }
            // })
          }
        },
        fail: function () { wx.hideLoading(); wx.showToast({ title: '查找业务失败,服务器异常', }) }
      })
  },
  加载类别产品信息:function(){
    var that = this;
    wx.request({
      url: getApp().globalData.HomeUrl + getApp().globalData.GetCategrayUrl,
      data: {},
      method: 'GET',
      success: function (Ares) {
        console.log(Ares.data);
        if (that.data.PullDownRefreshStatus) {
          that.data.PullDownRefreshStatus = false;
          wx.hideNavigationBarLoading();       // 隐藏导航栏loading  
          wx.stopPullDownRefresh();
        }
        if (Ares.data.status_code == 200) {
          that.setData({
            ConsumerClass: Ares.data.消费类,
            BusinessClass: Ares.data.业务类,
            OtherClasses: Ares.data.其他类,
            SelectCategory: app.globalData.SelectCategrayValue,
          });
          that.判断快捷跳转显示();
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
    app.globalData.SelectCategrayValue = '消费类';
    console.log(this.data.SelectItemCategory);
  },
  点击业务类: function (e) {
    this.setData({
      SelectCategory: '业务类',
      CurrentCategoryPostion: 0,
      SelectItemCategory: this.data.BusinessClass[0],
    })
    app.globalData.SelectCategrayValue = '业务类';
    console.log(this.data.SelectItemCategory);
  },
  点击其他类: function (e) {
    this.setData({
      SelectCategory: '其他类',
      CurrentCategoryPostion: 0,
      SelectItemCategory: this.data.OtherClasses[0],
    })
    app.globalData.SelectCategrayValue = '其他类';
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
  },
  判断快捷跳转显示:function(){
    var that = this;
    //-------判断是否是首页快捷跳转-----------//
    if (app.globalData.FlashSelectFlag == true) {
      app.globalData.FlashSelectFlag = false;
      if (app.globalData.SelectItemCategory == '奢侈品') {
        that.setData({
          SelectItemCategory: that.data.ConsumerClass[3],
          CurrentCategoryPostion: 3
        })
      }
      else if (app.globalData.SelectItemCategory == '酒水') {
        that.setData({
          SelectItemCategory: that.data.ConsumerClass[5],
          CurrentCategoryPostion: 5
        })
      }
      else if (app.globalData.SelectItemCategory == '保健品') {
        that.setData({
          SelectItemCategory: that.data.ConsumerClass[7],
          CurrentCategoryPostion: 7
        })
      }
      else if (app.globalData.SelectItemCategory == '汽车用品') {
        that.setData({
          SelectItemCategory: that.data.ConsumerClass[8],
          CurrentCategoryPostion: 8
        })
      }
      else if (app.globalData.SelectItemCategory == '家装') {
        that.setData({
          SelectItemCategory: that.data.ConsumerClass[9],
          CurrentCategoryPostion: 9
        })
      }
      else if (app.globalData.SelectItemCategory == '财务会计') {
        that.setData({
          SelectItemCategory: that.data.BusinessClass[0],
          CurrentCategoryPostion: 0
        })
      }
      else if (app.globalData.SelectItemCategory == '广告传媒') {
        that.setData({
          SelectItemCategory: that.data.BusinessClass[1],
          CurrentCategoryPostion: 1
        })
      }
      else if (app.globalData.SelectItemCategory == '法律顾问') {
        that.setData({
          SelectItemCategory: that.data.BusinessClass[2],
          CurrentCategoryPostion: 2
        })
      }
      else if (app.globalData.SelectItemCategory == '投资担保') {
        that.setData({
          SelectItemCategory: that.data.BusinessClass[3],
          CurrentCategoryPostion: 3
        })
      }
      else if (app.globalData.SelectItemCategory == '更多其他') {
        that.setData({
          SelectItemCategory: that.data.OtherClasses[0],
          CurrentCategoryPostion: 0
        })
      }
    }
    else {
      that.setData({
        SelectItemCategory: that.data.ConsumerClass[0],
        CurrentCategoryPostion: 0,
      })
    }
  }
})