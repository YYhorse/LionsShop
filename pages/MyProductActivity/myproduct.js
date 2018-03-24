//获取应用实例
const app = getApp()
Page({
  data: {
    VipStatus: '',
    image_photo:'',
    RealName: '',
    PhoneNumber: '',
    ServiceTeamIndex: 0,  
    ServiceTeam: [''],  
    JoinDats:'',
    CurrentPosition:'',
    PreviousPosition:'',
    Honor:'',

    ConsumerClass: null,
    BusinessClass: null,
    OtherClasses: null,
    MyService: null,
    PullDownRefreshStatus: false,
  },
  onLoad: function (options) {
    this.setData({ VipStatus: app.globalData.vipStatus });
    console.log("子状态:" + this.data.VipStatus);
    if (this.data.VipStatus == 'vip') {
      wx.setNavigationBarTitle({ title: '我的业务' });
      this.刷新个人业务();
    }
    else{
      wx.setNavigationBarTitle({ title: '狮友身份验证' });
      this.获取服务队信息();
    }
  },
  onShow: function () {
    if (getApp().FlashServiceState == true) {
      console.log('成功编辑后刷新')
      getApp().FlashServiceState = false;
      this.刷新个人业务();
    }
  },
  // 下拉刷新  
  onPullDownRefresh: function () {
    if (this.data.VipStatus == 'vip'){
      wx.showNavigationBarLoading();
      this.data.PullDownRefreshStatus = true;
      this.刷新个人业务();
    }
  },
  获取服务队信息:function(){
    var that = this;
    wx.showLoading({ title: '提交中' }),
      wx.request({
        url: getApp().globalData.HomeUrl + getApp().globalData.GetServiceTeamUrl,
        data: {},
        method: 'POST',
        success: function (Ares) {
          console.log(Ares.data);
          if (Ares.data.status_code == 200) {
            wx.hideLoading();
            that.setData({ ServiceTeam: Ares.data.service_teams })
          }
          else {
            wx.hideLoading();
            wx.showToast({ title: '获取服务队信息错误,接口返回' + Ares.data.status_code, });
          }
        },
        fail: function () { wx.hideLoading(); wx.showToast({ title: '获取服务队信息错误'}) }
      })
  },
  刷新个人业务: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.HomeUrl + getApp().globalData.GetServiceUrl,
      data: { "user_id": app.globalData.user_id },
      method: 'GET',
      success: function (Ares) {
        console.log(Ares.data);
        if (that.data.PullDownRefreshStatus) {
          that.data.PullDownRefreshStatus = false;
          wx.hideNavigationBarLoading();       // 隐藏导航栏loading  
          wx.stopPullDownRefresh();
        }
        if (Ares.data.status_code == 200) {
          that.setData({ MyServices: Ares.data.stores })
        }
        else
          wx.showToast({ title: '无个人业务', })
      },
      fail: function () { wx.showToast({ title: '获取失败,服务器异常', }) }
    })
  },
  上传照片:function(e){
    var that = this
    wx.chooseImage({
      count: 1,  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.data.image_photo = that.data.image_photo.concat(tempFilePaths);
        that.setData({ image_photo: tempFilePaths[0] })
      }
    })
  },
  输入姓名: function (e) {
    this.setData({ RealName: e.detail.value })
  },
  输入手机号: function (e) {
    this.setData({ PhoneNumber: e.detail.value })
  },
  监听服务队:function(e){
    this.setData({ ServiceTeamIndex: e.detail.value })  
  },
  监听日期变化:function(e){
    this.setData({  JoinDats: e.detail.value  })
  },
  输入现任职务:function(e){
    this.setData({ CurrentPosition: e.detail.value })
  },
  输入历任职务:function(e){
    this.setData({ PreviousPosition: e.detail.value })
  },
  输入所获荣誉:function(e){
    this.setData({ Honor: e.detail.value })
  },
  点击提交信息: function (e) {
    var that = this;
    console.log("姓名:" + this.data.RealName + "手机号:" + this.data.PhoneNumber + "服务队:" + this.data.ServiceTeam[this.data.ServiceTeamIndex] + "入会时间:" + this.data.JoinDats + "现任:" + this.data.CurrentPosition + "历任:" + this.data.PreviousPosition + "荣耀:" + this.data.Honor+"图片:"+this.data.image_photo);
    wx.showLoading({ title: '提交中' });
    wx.uploadFile({
      url: getApp().globalData.HomeUrl + getApp().globalData.PushUserUrl,
      filePath: that.data.image_photo,
      name: 'avatar',
      formData: {
        'user_id': app.globalData.user_id,
        'real_name': that.data.RealName,
        'phone_number': that.data.PhoneNumber,
        'service_team_name': that.data.ServiceTeam[that.data.ServiceTeamIndex],
        'admission_time': that.data.JoinDats,
        'current_position': that.data.CurrentPosition,
        'previous_position': that.data.PreviousPosition,
        'honor': that.data.Honor,
      },
      success: function (Ares) {
        console.log(Ares.data);
        wx.hideLoading();
        if (Ares.data == '{"status_code":200}') {
          console.log('上传成功');
          wx.showModal({
            title: '成功',
            content: '验证信息提交成功!',
            success: function (res) {
              if (res.confirm || res.cancel){
                app.globalData.vipStatus = 'wait_for_audit';
                wx.navigateBack();
              }
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
      fail: function () { wx.hideLoading(); wx.showToast({ title: '获取失败,服务器异常', }) }
    })    
    // wx.showLoading({ title: '提交中' }),
    //   wx.request({
    //     url: getApp().globalData.HomeUrl + getApp().globalData.ApplyRegisterUrl,
    //     data: { "real_name": this.data.RealName, "phone_number": this.data.PhoneNumber, "detail": this.data.UserDetail, "user_id": app.globalData.user_id },
    //     method: 'POST',
    //     success: function (Ares) {
    //       console.log(Ares.data);
    //       if (Ares.data.status_code == 200) {
    //         //---申请成功----//
    //         wx.showToast({ title: '申请成功', });
    //         wx.navigateBack();
    //         app.globalData.vipStatus = "wait_for_audit";
    //       }
    //       else {
    //         wx.hideLoading();
    //         wx.showToast({ title: '申请失败,接口返回' + Ares.data.status_code, });
    //       }
    //     },
    //     fail: function () { wx.hideLoading(); wx.showToast({ title: '登陆失败,服务器异常', }) }
    //   })
  },
  点击指定业务: function (e) {
    var Index = e.currentTarget.dataset.numid;
    let MyServiceJson = JSON.stringify(this.data.MyServices[Index]);
    console.log(MyServiceJson);
    wx.navigateTo({ url: '/pages/MyServiceDetailActivity/myservicedetail?serviceJson=' + MyServiceJson })
  },
  点击发布新业务: function (e) {
    wx.navigateTo({ url: '/pages/MyServiceActivity/myservice' });
  },
})