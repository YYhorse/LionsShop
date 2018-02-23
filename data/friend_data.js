//本地模拟朋友圈数据
var localData = {
  "status_code": 200,
  "friend_info": [
    {
      "title": "2018年3月聚会",
      "detail": "大家来一起聚聚",
      "time": "2018/3/1",
      "place":"大连长城饭店",
      "url": "http://img02.tooopen.com/images/20141231/sy_78327074576.jpg",
      "contact_name": "刘XX",
      "contact_tel": "18698711581",
      "activity_status": true
    },
    {
      "title": "测试A聚会",
      "detail": "大家来一起聚聚",
      "time": "2018/2/1",
      "place": "大连测试A饭店",
      "url": "http://img02.tooopen.com/images/20141231/sy_78327074576.jpg",
      "contact_name": "徐A先生",
      "contact_tel": "18698711581",
      "activity_status": false
    },
    {
      "title": "测试B聚会",
      "detail": "大家来一起聚聚",
      "time": "2018/1/1",
      "place": "大连测试B饭店",
      "url": "http://img02.tooopen.com/images/20141231/sy_78327074576.jpg",
      "contact_name": "徐B先生",
      "contact_tel": "18698711581",
      "activity_status": false
    },
    {
      "title": "测试C聚会",
      "detail": "大家来一起聚聚",
      "time": "2017/12/1",
      "place": "大连测试C饭店",
      "url": "http://img02.tooopen.com/images/20141231/sy_78327074576.jpg",
      "contact_name": "徐C先生",
      "contact_tel": "18698711581",
      "activity_status": false
    }
  ]
}

//定义数据出口
module.exports = {
  postList:localData
}