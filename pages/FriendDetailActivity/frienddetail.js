Page({
  data: {
    userId:null,
    activityList:''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '活动详情'});
    this.setData({
      userId: getApp().globalData.user_id,
      activityList: JSON.parse(options.activityJson)
    })
  },
  点击拨打电话:function(e){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.activityList.contact_number,
    })
  },
  点击删除活动:function(e){
    
  }
})