Page({

    data: {
        func_lib_bookShift: [
            {
                func_name: '扫码录书',
                func_id: 0,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/books/Scan-book/Scan-book'
            },
            {
                func_name: '手动录书',
                func_id: 1,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/books/Mannual-book/Mannual-book'
            },
            {
                func_name: '上架',
                func_id: 2,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/books/put-on-shelf/put-on-shelf'
            },
            {
                func_name: '下架',
                func_id: 3,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/books/off-the-shelf/off-the-shelf'
            }
        ],
        func_lib_bookViewer: [{
                func_name: '分类',
                func_id: 4,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/books/Catalogue/Catalogue'
            },
            {
                func_name: '书架',
                func_id: 5,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/books/book-shelf/book-shelf'
            },
            {
                func_name: '读者荐购',
                func_id: 6,
                func_imgSrc: '/images/book_selected.png',
                func_url: '/pages/books/reader-recomme/reader-recomme'
            }
        ]
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