const The_App = getApp()

Page({

    data: {
        curBookIndex: null,
        curBookId: null,
        curBookCate: null,
        categoryList: [],

        selected_hidden: null,
    },

    CateRadioChange: function (e) {
        var curCateId = e.currentTarget.dataset.id
        this.setData({
            selected_hidden: curCateId,
            curBookCate: this.data.categoryList[curCateId]._id
        })
    },

    SetNewCategory: function (e) {
        var that = this
        wx.cloud.callFunction({
            name: 'UpdateBookCategory',
            data: {
                itemId: that.data.curBookId,
                book_category: that.data.curBookCate
            },
            success: res_update => {
                console.log('res_update>>>', res_update)
                The_App.globalData.App_book_in_cate[that.data.curBookIndex].book_category = that.data.curBookCate
                wx.navigateBack({
                    delta: 1,
                  })
            },
            fail: res_update => {
                wx.showToast({
                    title: '失败',
                    icon: 'error'
                })
                console.error('error>>>', res_update)
            }
        })
    },

    onLoad: function (options) {
        this.setData({
            categoryList: The_App.globalData.categoryData,
            curBookIndex: options.curBookIndex,
            curBookId: The_App.globalData.App_book_in_cate[options.curBookIndex]._id,
            curBookCate: The_App.globalData.App_book_in_cate[options.curBookIndex].book_category
        })
    },

    onReady: function () {

    },

    onShow: function () {
        this.setData({
            curBookCate: The_App.globalData.App_book_in_cate[this.data.curBookIndex].book_category
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})