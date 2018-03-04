//获取应用实例
const app = getApp()
Page({
  data: {
    TitleText:'',
    Begindates:'2018-03-11',
    Enddates:'',
    PlaceClass:'',
    DetailText:'无',
    image_photo: null
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '新建业务' });
  },
  输入标题: function (e) {
    this.setData({ TitleText: e.detail.value })
  },
  输入详情: function (e) {
    this.setData({ DetailText: e.detail.value })
  },
  bindBeginDateChange:function(e){
    this.setData({
      Begindates: e.detail.value
    })
  },
  bindEndDateChange:function(e){
    this.setData({
      Enddates: e.detail.value
    })
  },
  点击选择地点:function(e){
    console.log("点击选择地点")
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        that.setData({
          PlaceClass: res
        })
      },
    })
  },
  拍摄照片: function (e) {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        console.log("图片地址：" + tempFilePaths);
        that.setData({
          image_photo: tempFilePaths[0],
        })
      }
    })
  },
  点击发布:function(e){
    console.log(this.data.TitleText + "|" + this.data.PlaceClass.address + "|" + this.data.Begindates + "|" + this.data.Enddates + "|" + this.data.DetailText);
    if (this.data.TitleText != '' && this.data.PlaceClass != '' && this.data.Enddates!=''){
      if (this.data.image_photo == null)
        wx.showToast({ title: '请上传一张图片', });
      else{
        var that = this;
        wx.showLoading({ title: '提交中' });
        wx.uploadFile({
          url: getApp().globalData.HomeUrl + getApp().globalData.PushActivityUrl,
          filePath: that.data.image_photo,
          name: 'activity_images',
          formData: {
            'user_id': getApp().globalData.user_id,
            'title': that.data.TitleText,
            'start_at': that.data.Begindates,
            'end_at': that.data.Enddates,
            'place': that.data.PlaceClass.address,
            'detail': that.data.DetailText,
          },
          success: function (Ares) {
            console.log(Ares.data);
            wx.hideLoading();
            if (Ares.data == '{"status_code":200}') {
              console.log('上传成功');
              getApp().FlashActivityState = true;
              wx.showModal({
                title: '成功',
                content: '活动提交成功!',
                success: function (res) {
                  if (res.confirm || res.cancel)
                    wx.navigateBack();
                }
              })
            }
            else {
              wx.showModal({
                title: '错误提示',
                content: '接口返回错误=' + Ares.data.state_code,
                success: function (res) {
                  if (res.confirm || res.cancel)
                    wx.navigateBack();
                }
              })
            }
          },
          fail: function () { wx.showToast({ title: '获取失败,服务器异常', }) }
        })    
      }
    }
    else
      wx.showToast({ title: '信息不能为空', });
  }
})