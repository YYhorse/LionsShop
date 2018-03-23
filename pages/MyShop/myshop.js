var TempShopInfo = { "shop_name": "大连华月七星月子会所", "shop_detail": "引领中国高品质母婴生活方式，让每一位新生妈妈都能享受到科学健康的月子照护。↵    本公司是“中国母婴保健协会”理事单位，全国月子会所联盟理事单位，辽宁月子会所联盟发起单位，也是“大连市母婴照护行业协会”的发起单位。", "address_detail": "辽宁省大连市沙河口区星海广场城堡酒店公寓", "address_name": "华月七星月子会所(城堡店)", "latitude": "38.87862083167476", "longitude": "121.59501317744581", "shop_discount": "无", "shop_images": [{ "current_url": "https://lionsshop.cn/uploads/store_image/img_url/23/tmp_981c60763ee402eae590542b4b0e161a.jpg" }] };
Page({
  data: {
    shopInfo:'',
    shopName:'',
    shopDetail:'',
    addressName:'',
    addressDetail: '',
    addressLatitude: '',
    addressLongitude: '',
    shopDiscount:'无',
    Index: 0,
    Industries: ['请选择行业'],  
    image_photo: [],
    PicSelect: 0,
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的店铺' });
    this.setData({
      shopInfo: TempShopInfo,
      shopName: TempShopInfo.shop_name,
      shopDetail: TempShopInfo.shop_detail,
      addressName: TempShopInfo.address_name,
      addressDetail: TempShopInfo.address_detail,
      addressLatitude:TempShopInfo.latitude,
      addressLongitude:TempShopInfo.longitude,
      shopDiscount:TempShopInfo.shop_discount,
      image_photo:TempShopInfo.shop_images
    })
  },
  输入店铺名称:function(e){
    this.setData({ shopName: e.detail.value })
  },
  输入店铺详情:function (e) {
    this.setData({ shopDetail: e.detail.value })
  },
  点击选择地点:function (e) {
    console.log("点击选择地点")
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({ 
          addressName: res.name,
          addressDetail: res.address,
          addressLatitude: res.latitude,
          addressLongitude: res.longitude
        })
      }
    })
  },
  输入店铺优惠:function(e) {
    this.setData({ shopDiscount: e.detail.value })
  },
  拍摄照片: function (e) {
    var that = this
    if (this.data.image_photo.length < 3) {
      wx.chooseImage({
        count: 3, // 默认9  
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          var tempFilePaths = res.tempFilePaths;
          that.data.image_photo = that.data.image_photo.concat(tempFilePaths);
          that.setData({ image_photo: that.data.image_photo })
        }
      })
    }
    else {
      wx.showToast({
        title: '最多上传3张图片',
        icon: 'loading',
        duration: 1000
      });
    }
  },
  点击更新:function(e){
    console.log(this.data.shopName + "|" + this.data.shopDetail + this.data.addressName);
    console.log(this.data.image_photo);
  },
  UpdateFirstPic: function () {
    var that = this;
    wx.uploadFile({
      url: getApp().globalData.HomeUrl + getApp().globalData.PushActivityUrl,
      filePath: that.data.image_photo[that.data.PicSelect],
      name: 'activity_images',
      formData: {
        'user_id': getApp().globalData.user_id,
        'title': that.data.TitleText,
        'start_at': that.data.Dates,
        'end_at': that.data.Dates,//that.data.Enddates,
        'address_name': that.data.PlaceClass.name,
        'address_detail': that.data.PlaceClass.address,
        'latitude': that.data.PlaceClass.latitude,
        'longitude': that.data.PlaceClass.longitude,
        'detail': that.data.DetailText,
      },
      success: function (Ares) {
        console.log(Ares.data);
        var json = JSON.parse(Ares.data);
        if (json.status_code == 200) {
          that.data.Activity_id = json.activity_id;
          that.data.PicSelect = that.data.PicSelect + 1;
          console.log("上传第" + that.data.PicSelect + "张成功!")
          if (that.data.PicSelect == that.data.image_photo.length) {
            wx.hideLoading();
            console.log('上传完成');
            getApp().FlashActivityState = true;
            wx.showModal({
              title: '成功',
              content: '提交成功!',
              success: function (res) {
                if (res.confirm || res.cancel) wx.navigateBack();
              }
            })
          }
          else
            that.UpdateOtherPic();        //继续上传
        }
        else {
          console.log("上传第" + that.data.PicSelect + "张失败!")
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
  },
  UpdateOtherPic: function () {
    var that = this;
    wx.uploadFile({
      url: getApp().globalData.HomeUrl + getApp().globalData.PushActivityUrl,
      filePath: that.data.image_photo[that.data.PicSelect],
      name: 'activity_images',
      formData: { 'activity_id': that.data.Activity_id },
      success: function (Ares) {
        console.log(Ares.data);
        var json = JSON.parse(Ares.data);
        that.data.PicSelect = that.data.PicSelect + 1;
        if (json.status_code == 200) {
          console.log("上传第" + that.data.PicSelect + "张成功!")
          if (that.data.PicSelect == that.data.image_photo.length) {
            wx.hideLoading();
            console.log('上传完成');
            getApp().FlashActivityState = true;
            wx.showModal({
              title: '成功',
              content: '提交成功!',
              success: function (res) {
                if (res.confirm || res.cancel)
                  wx.navigateBack();
              }
            })
          }
          else
            that.UpdateOtherPic();   //继续上传
        }
        else {
          console.log("上传第" + that.data.PicSelect + "张失败!")
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
})
