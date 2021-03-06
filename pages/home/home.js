
Page({

    data: {
        // 借还管理
        func_lib_LendReturn: [
            {
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
        // 内容管理
        func_lib_ContentManager: [{
                func_name: '公告',
                func_id: 4,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/home/ContentManager/anounce/anounce'
            },
            {
                func_name: '书单',
                func_id: 5,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/home/ContentManager/booklists/booklists'
            },
            {
                func_name: '书评',
                func_id: 6,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/home/ContentManager/comments/comments'
            }
        ]
    },

    // 查看借还管理信息
    openLendReturnMenu: function(e){
        const TabId = e.currentTarget.dataset.id;    // 获取用户点击功能的id
        wx.navigateTo({
          url: '/pages/home/Lend_Return/Lend_Return?TabId=' + TabId, // 跳转到借还页面，将id信息传递给借还页面
        })
    },

    onLoad: function (options) {

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