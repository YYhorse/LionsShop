var app = getApp()      // 获取入口文件app的应用实例
Page({
  data: {
    AvatarUrl: "",
    NiceName:"无",
    CheckInfo:"",

    VipStatus:'',
    ShopStatue:'',
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的' });
    this.获取个人信息();
    this.setData({
      AvatarUrl: app.globalData.userInfo.avatarUrl,
      NiceName: app.globalData.userInfo.nickName
    })
  },
  点击身份验证:function(e){
    if (this.data.VipStatus == 'tourist')
      wx.navigateTo({ url: '/pages/MyProductActivity/myproduct' });
    else
      wx.showToast({  title: '请耐心等待验证'})
  },
  点击我的名片:function(e){ wx.navigateTo({ url: '/pages/MyCard/mycard' }); },
  点击店铺管理:function(e){
    if (this.data.ShopStatue == 'wait_for_audit')
      wx.showToast({ title: '请耐心等待验证' });
    else
      wx.navigateTo({ url: '/pages/MyShop/myshop' });
  },
  点击产品管理:function(e){
    if (this.data.ShopStatue =='audit_success')
      wx.navigateTo({ url: '/pages/MyProductActivity/myproduct' });
    else
      wx.showModal({  content: '店铺信息不全或者审核中'  })
  },
  // 下拉刷新  
  onPullDownRefresh: function () {
    this.获取个人信息();
  },
  获取个人信息:function(){
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: getApp().globalData.HomeUrl + getApp().globalData.FlashUserUrl,
      data: { 'user_id': getApp().globalData.user_id},
      method: 'POST',
      success: function (Ares) {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        console.log(Ares.data);
        if (Ares.data.status_code == 200) {
          that.setData({ 
            VipStatus: Ares.data.user_state,
            ShopStatue: Ares.data.store_state,
            CheckInfo: that.GetUserStatusInfo(),
          })
        }
        else {
          wx.showModal({
            title: '接口异常',
            content: '获取个人信息失败,接口异常' + Ares.data,
          })
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '服务器异常',
          content: '获取指个人信息失败,服务器异常' + Ares.data,
        })
      }
    })
  },
  GetUserStatusInfo: function () {
    var ShowStatus = '';
    if (this.data.VipStatus == 'tourist')
      ShowStatus = '狮友验证';
    else
      ShowStatus = '信息审核中';
    return ShowStatus;
  },
})