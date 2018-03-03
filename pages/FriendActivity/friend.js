//引入本地测试JSON数据
var postData = require('../../data/friend_data.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    friendList:""
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '狮友圈' });
    this.setData({
      friendList: postData.postList.friend_info,
    });
  },
  // 下拉刷新  
  onPullDownRefresh: function () { 
    // 显示导航栏loading  
    wx.showNavigationBarLoading();  
    // 隐藏导航栏loading  
    wx.hideNavigationBarLoading();
    // 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新  
    wx.stopPullDownRefresh();
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
  }
})