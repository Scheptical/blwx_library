// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        func_lib_LendReturn: [{
                func_name: '在借',
                func_id: 0,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/Lend_Return/Lend_Return'
            },
            {
                func_name: '已还',
                func_id: 1,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/Lend_Return/Lend_Return'
            },
            {
                func_name: '逾期',
                func_id: 2,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/Lend_Return/Lend_Return'
            },
            {
                func_name: '预约',
                func_id: 3,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/Lend_Return/Lend_Return'
            }
        ],
        func_lib_ContentManager: [{
                func_name: '公告',
                func_id: 4,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/ContentManager/anounce/anounce'
            },
            {
                func_name: '书单',
                func_id: 5,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/ContentManager/booklists/booklists'
            },
            {
                func_name: '书评',
                func_id: 6,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/ContentManager/comments/comments'
            }
        ]
    },
    openLendReturnMenu: function(e){
        const TabId = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: '/pages/Lend_Return/Lend_Return?TabId='+TabId,
        })
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