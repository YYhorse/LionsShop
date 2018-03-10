// var tempjson = { "store_code":"00010004", "service_state":"wait_for_audit", "service_name":"第一个", "service_place":"大连", "service_detail":"大连第一个", "contact_name":null, "contact_tel":"186xxxx1234", "picinfo":[{ "current_url": "https://lionsshop.cn/uploads/store_image/img_url/4/wx8289ef823b120966.o6zAJs9zMuO4UJGMEGveE_cR7jrM.adfdc8d7962619ac23e97f18d3ce75f9.jpg" }] }

Page({
  data: {
    ServiceCode:null,
    ServiceInfoList:null,
    ServiceName: null,
    ServicePlace: null,
    ServicePlaceClass: '',
    ServiceDetail: null,
    ContactName: null,
    ContactPhone: null,
    image_photo: null
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '业务详情' });
    let tempList = JSON.parse(options.serviceJson);
    this.setData({
      ServiceInfoList: tempList
    })
    this.setData({
      ServiceCode: tempList.store_code,
      ServiceName: tempList.service_name,
      ServicePlace: tempList.address_name,
      ServiceDetail: tempList.service_detail,
      ContactName: tempList.contact_name,
      ContactPhone: tempList.contact_tel,
      image_photo: tempList.picinfo[0].current_url
    })
  },
  输入名称: function (e) {
    this.setData({ ServiceName: e.detail.value })
  },
  点击选择地点: function (e) {
    console.log("点击选择地点")
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          ServicePlaceClass: res,
          ServicePlace: res.name
        })
      },
    })
  },
  输入详情: function (e) {
    this.setData({ ServiceDetail: e.detail.value })
  },
  输入姓名: function (e) {
    this.setData({ ContactName: e.detail.value })
  },
  输入电话: function (e) {
    this.setData({ ContactPhone: e.detail.value })
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
  点击删除服务:function(e){
    wx.showLoading({ title: '删除业务中' }),
    wx.request({
      url: getApp().globalData.HomeUrl + getApp().globalData.DelServiceUrl,
      data: { "user_id": getApp().globalData.user_id, "store_code": this.data.ServiceCode },
      method: 'POST',
      success: function (Ares) {
        wx.hideLoading();
        if (Ares.data.status_code == 200) {
          console.log('删除成功');
          getApp().FlashServiceState = true;
          wx.showModal({
            title: '成功',
            content: '业务删除成功!',
            success: function (res) {
              if (res.confirm || res.cancel)
                wx.navigateBack();
            }
          })
        }
        else{
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
      fail: function () { wx.hideLoading(); wx.showToast({ title: '删除业务失败,服务器异常', }) }
    })
  },
  点击更新服务:function(e){
    var that = this;
    // console.log('名称=' + this.data.ServiceName + "地点=" + this.data.ServicePlace + "详情=" + this.data.ServiceDetail + "联系人" + this.data.ContactName + this.data.ContactPhone);
    wx.showLoading({ title: '提交中' });
    if (this.data.image_photo != this.data.ServiceInfoList.picinfo[0].current_url){
      console.log("图片已经修改");
      wx.uploadFile({
        url: getApp().globalData.HomeUrl + getApp().globalData.EditServiceUrl,
        filePath: that.data.image_photo,
        name: 'service_img',
        formData: {
          'service_name': that.data.ServiceName,
          'address_name': that.data.ServicePlaceClass.name,
          'address_detail': that.data.ServicePlaceClass.address,
          'latitude': that.data.ServicePlaceClass.latitude,
          'longitude': that.data.ServicePlaceClass.longitude,
          'service_detail': that.data.ServiceDetail,
          'contact_name': that.data.ContactName,
          'contact_tel': that.data.ContactPhone,
          'user_id': getApp().globalData.user_id,
          'store_code': that.data.ServiceCode
        },
        success: function (Ares) {
          console.log(Ares.data);
          wx.hideLoading();
          if (Ares.data == '{"status_code":200}') {
            console.log('修改成功');
            getApp().FlashServiceState = true;
            wx.showModal({
              title: '成功',
              content: '业务更新成功!',
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
    else{  
      console.log("图片未修改");
      wx.request({
        url: getApp().globalData.HomeUrl + getApp().globalData.EditServiceUrl,
        data: {
          "service_name": that.data.ServiceName,
          'address_name': that.data.ServicePlaceClass.name,
          'address_detail': that.data.ServicePlaceClass.address,
          'latitude': that.data.ServicePlaceClass.latitude,
          'longitude': that.data.ServicePlaceClass.longitude,
          "service_detail": that.data.ServiceDetail,
          "contact_name": that.data.ContactName,
          "contact_tel": that.data.ContactPhone,
          "user_id": getApp().globalData.user_id,
          "store_code": that.data.ServiceCode},
        method: 'POST',
        success: function (Ares) {
          console.log(Ares.data);
          wx.hideLoading();
          if (Ares.data.status_code == 200) {
            console.log('修改成功');
            getApp().FlashServiceState = true;
            wx.showModal({
              title: '成功',
              content: '业务更新成功!',
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
        fail: function () { wx.hideLoading(); wx.showToast({ title: '删除业务失败,服务器异常', }) }
      })
    }
    // var service_img = this.data.image_photo != null ? this.data.image_photo : "";
  }
})