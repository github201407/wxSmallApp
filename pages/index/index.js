//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    cityName: '福州市',
    state: '大部多云',
    temp: '17度'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    wx.connectSocket({
      url: "http://apis.baidu.com/tianyiweather/basicforecast/weatherapi",
      data: {area : '101010100'},
      header: {apikey : 'e24a5d72819e415807c132433895b1ec'}, // 设置请求的 header
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        // success
        that.setData({cityName: res})
      },
      fail: function() {
        // fail
         that.setData({cityName: 'fail'})
      },
      complete: function() {
        // complete
        that.setData({cityName: 'complete'})
      }
    })

    wx.onSocketOpen(function() {
      console.log('WebSocket连接已打开！')
    })

    wx.onSocketError(function() {
      console.log('onSocketError')
    })

    wx.onSocketMessage(function(data) {
      console.log(data)
    })

    wx.onSocketClose(function() {
      console.log("关闭")
    })


  }
})
