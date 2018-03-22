var TempShopInfo = { "shop_name": "大连华月七星月子会所", "shop_detail": "引领中国高品质母婴生活方式，让每一位新生妈妈都能享受到科学健康的月子照护。↵    本公司是“中国母婴保健协会”理事单位，全国月子会所联盟理事单位，辽宁月子会所联盟发起单位，也是“大连市母婴照护行业协会”的发起单位。", "address_detail": "辽宁省大连市沙河口区星海广场城堡酒店公寓", "address_name": "华月七星月子会所(城堡店)", "latitude": "38.87862083167476", "longitude": "121.59501317744581", "shop_discount": "无", "shop_images": [{ "current_url": "https://lionsshop.cn/uploads/store_image/img_url/23/tmp_981c60763ee402eae590542b4b0e161a.jpg" }] };
Page({
  data: {
    shopInfo:'',
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的店铺' });
    this.setData({
      shopInfo: TempShopInfo
    })
  },
 
})