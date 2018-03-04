//引入本地测试JSON数据
var postData = require('../../data/friend_data.js');
Page({
  data: {
    UserId: null,
    friendList:"",
    current_page:0,
    PullDownRefreshStatus:false,
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '狮友圈' });
    this.获取活动();
    console.log('活动userid' + this.data.UserId);
  },
  // 下拉刷新  
  onPullDownRefresh: function () { 
    // 显示导航栏loading  
    wx.showNavigationBarLoading();
    this.data.PullDownRefreshStatus = true;
    this.data.current_page = 0;
    this.获取活动();
  },
  获取活动:function(e){
    var that = this;
      wx.request({
        url: getApp().globalData.HomeUrl + getApp().globalData.GetActivityUrl,
        data: { 'current_page': that.data.current_page},
        method: 'GET',
        success: function (Ares) {
          console.log(Ares.data);
          if (that.data.PullDownRefreshStatus){
            that.data.PullDownRefreshStatus = false;
            // 隐藏导航栏loading  
            wx.hideNavigationBarLoading();
            // 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新  
            wx.stopPullDownRefresh();
          }
          that.setData({
            UserId: getApp().globalData.user_id,
            friendList: Ares.data.friend_info
          })
        },
      fail: function () { wx.showToast({ title: '获取失败,服务器异常', }) }
    })
  },
  点击指定活动:function(e){
    var Index = e.currentTarget.dataset.numid;
    let activityJson = JSON.stringify(this.data.friendList[Index]);
    console.log('点击事件'+Index);
    console.log(activityJson); 
    wx.navigateTo({ url: '/pages/FriendDetailActivity/frienddetail?activityJson=' + activityJson })
  },
  点击发布活动:function(e){
    console.log('发布活动');
    wx.navigateTo({ url: '/pages/FriendPushActivity/friendpush'});
  },
  onShow: function () {
    if (getApp().FlashActivityState == true) {
      console.log('成功发布活动后刷新')
      getApp().FlashActivityState = false;
      this.data.current_page = 0;
      this.获取活动();
    }
  }
})