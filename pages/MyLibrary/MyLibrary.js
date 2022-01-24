// pages/MyLibrary/MyLibrary.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        func_set_category: [
            {
                name: '书馆信息',
                id: 'func_set_001',
                url: '/pages/MyLibrary/MyLibInfo/MyLibInfo'
            },
            {
                name: '书馆码',
                id: 'func_set_002',
                url: '/pages/MyLibrary/MyLibQR/MyLibQR'
            },
            {
                name: '书馆公告',
                id: 'func_set_003',
                url: '/pages/ContentManager/anounce/anounce'
            },
            {
                name: '关于',
                id: 'func_set_004',
                url: '/pages/MyLibrary/MyLibAbout/MyLibAbout'
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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