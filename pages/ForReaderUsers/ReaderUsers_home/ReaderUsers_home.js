const library_db = wx.cloud.database();
const The_App = getApp();

var menus = require('../../../utils/customTabBar');

Page({

  data: {
    //绘制底部tabBar
    menus: {},
    PageCur: 'user_home',
    isAdmin: '',

    //页面内容
    curBookList: [],
  },

  options: {
    addGlobalClass: true
  },

  NavChange: function (e) {
    console.log(e)
    var cur = e.currentTarget.dataset.cur;

    if (cur) {
      this.setData({
        PageCur: cur,
        "menus.activeUrl": cur
      })
    }
  },

  OpenPageDetail: function (e) {
    var DetailIndex = e.currentTarget.dataset.more
    wx.navigateTo({
      url: '../ReaderUsers_home/PageDetail/PageDetail?DetailIndex=' + DetailIndex,
    })
  },

  onLoad: function (options) {
    this.setData({
      menus: menus.userMenuData
    })

    // 从LibBooksCopy获取当前上架书籍的副本信息
    library_db.collection('LibBooksCopy').where({
      copy_id: 1 // （copy_id: 1，保证每本书对应1本副本）
    }).limit(20).get({
      success: res_book => {
        // 将书籍副本信息传入全局变量
        The_App.globalData.ShelfBooks_App = res_book.data;
        // 提取ISBN并整合成Array
        var ISBNs = []
        for (var i = 0; i < res_book.data.length; i++) {
          ISBNs[i] = res_book.data[i].ISBN
        };

        wx.cloud.callFunction({
          name: 'GetBookCopy',
          data: {
            arrayISBN: ISBNs // 将得到的Array传递给云函数
          },
          success: res_OnShelfCopy => {
            // 云函数从LibraryBooksInfo返回书籍基本信息
            this.setData({
              curBookList: res_OnShelfCopy.result.data
            })
            // 将书籍基本信息存入全局变量
            The_App.globalData.LibraryBooks_App = res_OnShelfCopy.result.data
          },
          fail: res_fail => {
            console.log('res_fail>>>', res_fail)
          }
        })
        /*
        this.setData({
          curBookList: res_bookBasic.data
        })
        The_App.globalData.LibraryBooks_App = res_bookBasic.data
        */
      },
      fail: res_fail => {
        console.log('res_fail>>>', res_fail)
      }
    })
    /*
    if (options.isAdmin == 0) {
      this.setData({
        isAdmin: options.isAdmin,
        menus: menus.userMenuData
      })
    } else {
      this.setData({
        isAdmin: options.isAdmin,
        menus: menus.adminMenuData
      })
    }
    */
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})