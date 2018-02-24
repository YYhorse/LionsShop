//获取应用实例
const app = getApp()
Page({
  data: {
    activityList:''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '活动详情'});
    this.setData({
      activityList: JSON.parse(options.activityJson)
    })
  },
  点击拨打电话:function(e){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.activityList.contact_tel,
    })
  }
})

// JSON.parse('{"title": "2018年3月聚会", "detail": "大家来一起聚聚", "time": "2018/3/1", "place": "大连长城饭店", "url": "http://img02.tooopen.com/images/20141231/sy_78327074576.jpg", "contact_name": "刘XX", "contact_tel": "18698711581", "activity_status": true }')
