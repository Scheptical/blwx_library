App({
  onLaunch() {
    var that = this

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cloud1-5gp4crtid00951da',
        traceUser: true,
      })
    }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    /* 管理版 */
    categoryData: [],    // 目录数据，包括目录名，目录id，目录内书籍数
    App_book_in_cate: [],    // 当前目录下所有书籍信息
    ShelfData: [],    // 书架数据
    App_copy_in_shelf: [],    //
    App_book_in_shelf: [],

    /* 读者版 */
    LibraryBooks_App: [],
    ShelfBooks_App: []
  }
})