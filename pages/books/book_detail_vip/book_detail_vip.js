const library_db = wx.cloud.database()
const The_App = getApp()

Page({

    data: {
        // 详情页入口标识
        entrance: '',
        // 分类页面进入
        book_index: null,

        book_id: null,
        book_copies: {
            copyNum: null,
            copiesDetail: []
        },
        book_detail_vip: [],

        // 书架页面进入
        book_indexShelf: null,
        book_detail_vipShelf: [],

        // onShow控制器（控制onShow函数执行顺序）
        flag: false
    },

    // 查看封面大图
    PreviewCoverImg: function (e) {
        var that = this
        var coverImg_url = that.data.book_detail_vip[0].book_cover
        wx.previewImage({
            urls: [coverImg_url],
            current: coverImg_url
        })
    },

    // 跳转书籍详情设置页面
    SetBookDetail: function (e) {
        var self = this
        var curBookIndex = self.data.book_index
        var entrance = self.data.entrance
        wx.navigateTo({
            url: '/pages/books/book_detail_vip/SetBookDetail/SetBookDetail?curBookIndex=' + curBookIndex + '&entrance=' + entrance,
        })
    },

    // 跳转分类设置页面
    SetCategory: function (e) {
        var that = this
        var curCateId = that.data.book_detail_vip[0].book_category[0]
        var curBookIndex = that.data.book_index
        wx.navigateTo({
            url: '/pages/books/book_detail_vip/SetCategory/SetCategory?curCateId=' + curCateId + '&curBookIndex=' + curBookIndex,
        })
    },

    // 跳转借阅记录页面
    QueryBorrowRecord: function (e) {
        wx.navigateTo({
            url: '/pages/books/book_detail_vip/QueryBorrowRecord/QueryBorrowRecord',
        })
    },

    onLoad: function (options) {
        if (options.book_index) {
            /**********************/
            /*** 从分类页面进入 ***/
            /**********************/
            var self = this
            self.setData({
                entrance: 'category', // 页面入口标识
                book_index: options.book_index, // 接受上一页面传入的book_index
                book_detail_vip: The_App.globalData.App_book_in_cate[options.book_index], // 从全局数据获取当前书本信息
                book_id: The_App.globalData.App_book_in_cate[options.book_index]._id,
            })

            // 根据ISBN，从LibBooksCopy获取副本信息
            library_db.collection('LibBooksCopy').where({
                ISBN: self.data.book_detail_vip.ISBN
            }).get({
                success: res => {
                    self.setData({
                        "book_copies.copiesDetail": res.data,
                        "book_copies.copyNum": res.data.length
                    })
                },
                fail: res => {
                    console.log('resCopy_fail>>>', res)
                }
            })
        } else if (options.book_indexShelf) {
            /**********************/
            /*** 从书架页面进入 ***/
            /**********************/
            var self = this
            self.setData({
                entrance: 'shelf', // 页面入口标识
                book_indexShelf: options.book_indexShelf, // 接受上一页面传入的book_indexShelf
                book_detail_vipShelf: The_App.globalData.App_copy_in_shelf[options.book_indexShelf], // 获取当前副本信息
            })

            // 根据ISBN，从LibraryBooksInfo查询书籍基本信息
            library_db.collection('LibraryBooksInfo').where({
                ISBN: self.data.book_detail_vipShelf.ISBN
            }).get({
                success: res => {
                    self.setData({
                        book_detail_vip: res.data[0],
                        book_id: res.data[0]._id,
                        flag: true // data中设置完book_id，再赋值flag: true执行onShow函数
                    });
                    The_App.globalData.App_book_in_shelf = res.data[0]
                    // 此时data.flag为true，执行onShow函数
                    self.onShow()
                },
                fail: res => {
                    console.log('res_fail>>>', res)
                }
            })

            // 根据ISBN，从LibBooksCopy查询副本信息
            library_db.collection('LibBooksCopy').where({
                ISBN: self.data.book_detail_vipShelf.ISBN
            }).get({
                success: res => {
                    self.setData({
                        "book_copies.copiesDetail": res.data,
                        "book_copies.copyNum": res.data.length
                    })
                },
                fail: res => {
                    console.log('resCopy_fail>>>', res)
                }
            })
        }
    },

    onReady: function () {

    },

    onShow: function () {
        var self = this
        // 首次载入页面，flag为false，onShow函数先不执行；等到onLoad函数中改变flag为true后，在onLoad中调用onShow
        if (self.data.flag == true) {
            // 每次跳转至该页面，同步一次页面数据（请求数据库），并在全局数据中更新当前书籍信息
            library_db.collection("LibraryBooksInfo").where({
                _id: self.data.book_id
            }).get({
                success: res => {
                    self.setData({
                        book_detail_vip: res.data[0] // 同步页面数据
                    })

                    // 在全局数据中更新当前书籍信息
                    if (self.data.entrance == 'category') {
                        // 从分类页面进入
                        The_App.globalData.App_book_in_cate[book_index] = self.data.book_detail_vip
                    } else if (self.data.entrance == 'shelf') {
                        // 从书架页面进入
                        The_App.globalData.App_book_in_shelf = self.data.book_detail_vip
                    }
                }
            })
        }
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