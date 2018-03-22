var TempuserInfo = { "user_images": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLTI0d5Vsze6Yib5NWPUHJyTjX4D3N2BGrA6XMh8zFTGXECAGzTpRDia3ib2uPhJXYYvjYOTkIeaoGWw/0", "real_name": "张三", "phone_number": "18698711581", "service_team_name": "XX一队", "admission_time": "2018-03-11", "current_position": "经理", "previous_position": "部长", "honor": "无数奖项" };
Page({
  data: {
    userInfo:'',
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的名片' });
    this.setData({
      userInfo: TempuserInfo
    })
  },
 
})