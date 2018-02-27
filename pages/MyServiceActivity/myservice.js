//获取应用实例
const app = getApp()
Page({
  data: {
    SelectParentClass: '消费类',
    ParentArray: ['消费类', '业务类', '其他类'],
    ParentIndex: 0,
    SonArray:['无'],
    SonIndex:0,
    ServiceName:null,
    ServicePlace:null,
    ServiceDetail:null,
    ContactName:null,
    ContactPhone:null,
    image_photo:null
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '新建业务'});
    this.GetCategrayInfo();
  },
  GetCategrayInfo:function(){
    var that = this;
    wx.showLoading({ title: '获取信息中' }),
    wx.request({
      url: getApp().globalData.HomeUrl + getApp().globalData.GetTypeUrl,
      data: {},
      method: 'GET',
      success: function (Ares) {
        wx.hideLoading();
        console.log(Ares.data);
        that.setData({
          ConsumerClass: Ares.data.消费类,
          BusinessClass: Ares.data.业务类,
          OtherClasses: Ares.data.其他类
        });
      },
      fail: function () { wx.hideLoading();wx.showToast({ title: '获取失败,服务器异常', }) }
    })
  },
  选择大类别:function(e){
    this.setData({ 
      ParentIndex: e.detail.value,
      SelectParentClass: this.data.ParentArray[e.detail.value]
    })
    console.log('选择大类别为', this.data.SelectParentClass)
  },
  选择子类别:function(e){
    this.setData({ SonIndex: e.detail.value })
    console.log('选择子类别为', this.data.SonArray[this.data.SonIndex])
  },
  输入名称: function (e) {
    this.setData({
      ServiceName: e.detail.value
    })
  },
  输入地点: function (e) {
    this.setData({
      ServicePlace: e.detail.value
    })
  },
  输入详情: function (e) {
    this.setData({
      ServiceDetail: e.detail.value
    })
  },
  输入姓名:function(e){
    this.setData({
      ContactName: e.detail.value
    })
  },
  输入电话: function (e) {
    this.setData({
      ContactPhone: e.detail.value
    })
  },
  拍摄照片:function(e){
    var that = this
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths
        that.setData({
          textHidden: true,
          image_photo: tempFilePaths,
          photoHidden: false
        })
      }
    })  
  },
  点击发布:function(e){
    console.log('名称=' + this.data.ServiceName + "地点=" + this.data.ServicePlace + "详情=" + this.data.ServiceDetail + "联系人" + this.data.ContactName + this.data.ContactPhone);


  }
})