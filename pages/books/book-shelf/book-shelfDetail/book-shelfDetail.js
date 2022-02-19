const shelf_db = wx.cloud.database()
const The_App = getApp()

Page({

    data: {
        originalShelf: [],
        curShelf: [],
        book_in_shelf: []
    },

    ChangeShelfName: function (e) {
        this.setData({
            'curShelf[1]': e.detail.value
        })
    },

    ChangeShelfId: function (e) {
        this.setData({
            'curShelf[0]': e.detail.value
        })
    },

    OpenBookDetail: function (e) {
        var book_indexShelf = e.currentTarget.dataset.index
        wx.navigateTo({
          url: '/pages/books/book_detail_vip/book_detail_vip?book_indexShelf=' + book_indexShelf,
        })
    },

    SaveShelfInfo: function (e) {

    },

    onLoad: function (options) {
        this.setData({
            originalShelf: JSON.parse(options.shelf_info),
            curShelf: JSON.parse(options.shelf_info)
        });

        var self = this
        shelf_db.collection("LibBooksCopy").where({
            OnShelfPos: {
                0: self.data.originalShelf[0]
            }
        }).get({
            success: res => {
                self.setData({
                    book_in_shelf: res.data
                })
                The_App.globalData.App_copy_in_shelf = res.data    //将当前分类下所有书籍信息传入App.js/globalData.App_App_book_in_cate
            }
        })
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