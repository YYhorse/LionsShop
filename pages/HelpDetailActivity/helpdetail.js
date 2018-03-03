// var tempList = { "service_name": "法国名包", "service_place": "大连西安路", "service_detail": "专营名牌法国包包", "contact_name": "何洁", "contact_tel": "13204090823", "picinfo": [{ "current_url": "https://lionsshop.cn/uploads/store_image/img_url/11/wx8289ef823b120966.o6zAJs9zMuO4UJGMEGveE_cR7jrM.21f08e39141685178988df7a1c2b74e9.jpg" }] }

Page({
  data: {
    ServiceInfoList:null,
    ServiceName: null,
    ServicePlace: null,
    ServiceDetail: null,
    ContactName: null,
    ContactPhone: null,
    image_photo: null
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '业务详情' });
    let tempList = JSON.parse(options.MyServiceJson);
    this.setData({
      ServiceInfoList: tempList
    })
    console.log(tempList.picinfo[0].current_url);
    this.setData({
      ServiceName: tempList.service_name,
      ServicePlace: tempList.service_place,
      ServiceDetail: tempList.service_detail,
      ContactName: tempList.contact_name,
      ContactPhone: tempList.contact_tel,
      image_photo: tempList.picinfo[0].current_url
    })
  },
  点击一键拨号:function(e){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.ContactPhone,
    })
  }
})