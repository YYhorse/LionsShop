//获取应用实例
const app = getApp()
Page({
  data: {
    SelectParentClass: '请选择',
    ParentArray: ['请选择','消费类', '业务类', '其他类'],
    ParentIndex: 0,
    SonArray:null,
    SonIndex:0,
    SonIdArray:null,
    ServiceName:null,
    ServicePlaceClass:'',
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
    console.log('选择大类别为', this.data.SelectParentClass);
    this.更新子类显示();
  },
  更新子类显示:function(){
    if (this.data.SelectParentClass !='请选择'){
      var tempNameArray = new Array();
      var tempIdArray = new Array();
      if (this.data.SelectParentClass == '消费类') {
        for (var i = 0; i < this.data.ConsumerClass.length; i++){
          tempNameArray.push(this.data.ConsumerClass[i].name);
          tempIdArray.push(this.data.ConsumerClass[i].code);
        }
      }
      else if(this.data.SelectParentClass == '业务类'){
        for (var i = 0; i < this.data.BusinessClass.length; i++){
          tempNameArray.push(this.data.BusinessClass[i].name);
          tempIdArray.push(this.data.BusinessClass[i].code);
        }
      }
      else {
        for (var i = 0; i < this.data.OtherClasses.length; i++){
          tempNameArray.push(this.data.OtherClasses[i].name);
          tempIdArray.push(this.data.OtherClasses[i].code);
        }
      }
      console.log("子类名称=" + tempNameArray + "子类编号=" + tempIdArray);
      this.setData({
        SonArray: tempNameArray,
        SonIdArray: tempIdArray,
        SonIndex: 0
      })
    }
  },
  选择子类别:function(e){
    this.setData({ SonIndex: e.detail.value })
    console.log('选择子类别为', this.data.SonArray[this.data.SonIndex])
  },
  输入名称: function (e) {
    this.setData({  ServiceName: e.detail.value })
  },
  点击选择地点:function(e){
    console.log("点击选择地点")
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          ServicePlaceClass: res
        })
      },
    })
  },
  输入详情: function (e) {
    this.setData({  ServiceDetail: e.detail.value })
  },
  输入姓名:function(e){
    this.setData({  ContactName: e.detail.value })
  },
  输入电话: function (e) {
    this.setData({  ContactPhone: e.detail.value  })
  },
  拍摄照片:function(e){
    var that = this
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        console.log("图片地址："+tempFilePaths);
        that.setData({
          image_photo: tempFilePaths[0],
        })
      }
    })  
  },
  点击发布:function(e){
    var that =this;
    //  console.log('名称=' + this.data.ServiceName + "地点=" + this.data.ServicePlace + "详情=" + this.data.ServiceDetail + "联系人" + this.data.ContactName + this.data.ContactPhone);
    //  console.log('选择类别=' + this.data.SonArray[this.data.SonIndex] + '   编号:' + this.data.SonIdArray[this.data.SonIndex]);
    var service_img = this.data.image_photo != null ? this.data.image_photo:"";
    //--------发布活动请求-------//
    wx.showLoading({ title: '提交中' });
    wx.uploadFile({
      url: getApp().globalData.HomeUrl + getApp().globalData.ApplyServiceUrl,
      filePath: service_img,
      name: 'service_img',
      formData: {
        'service_name': that.data.ServiceName,
        'address_name': that.data.PlaceClass.name,
        'address_detail': that.data.PlaceClass.address,
        'latitude': that.data.PlaceClass.latitude,
        'longitude': that.data.PlaceClass.longitude,
        'service_detail': that.data.ServiceDetail,
        'contact_name': that.data.ContactName,
        'contact_tel': that.data.ContactPhone,
        'user_id': getApp().globalData.user_id,
        'industry_code': that.data.SonIdArray[that.data.SonIndex],
      },
      success: function (Ares) {
        console.log(Ares.data); 
        wx.hideLoading(); 
        if (Ares.data == '{"status_code":200}'){
          console.log('上传成功');
          getApp().FlashServiceState = true;
          wx.showModal({
            title: '成功',
            content: '业务提交成功，请等待审核!',
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
            success:function(res){
              if (res.confirm || res.cancel) 
                wx.navigateBack();
            }
          })
        }
      },
      fail: function () { wx.showToast({ title: '获取失败,服务器异常', })      }  
    })    
  }
})