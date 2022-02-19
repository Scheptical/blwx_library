const The_App = getApp()
const library_db = wx.cloud.database()

Page({

    data: {
        entrance: '',

        curBookIndex: null,
        curBookId: null,
        curBookDetail: [],
        DetailSetMenu: []
    },

    //更换封面
    ChangeCover: function (e) {
        var self = this
        wx.chooseImage({
            count: 1,    //默认9
            sizeType: ['original', 'compressed'],    // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'],    // 从相册选择，拍照
            success: (res) => {
                self.setData({
                    "DetailSetMenu[0].detailContent": res.tempFilePaths
                })
            }
        });
    },

    //打开信息设定详情页面，并传入当前信息内容
    OpenDetailSetting: function (e) {
        var that = this
        var curDetailId = e.currentTarget.dataset.id
        var curDetail = that.data.DetailSetMenu[(curDetailId - 1)]
        wx.navigateTo({
            url: '/pages/books/book_detail_vip/SetBookDetail/DetailSetting/DetailSetting?curDetail=' + encodeURI(JSON.stringify(curDetail)),
        })
    },

    // 更新数据库
    SaveDetailToServer: function (e) {
        var that = this
        // 调用云函数UpdateBookDetail，更新数据库中记录
        wx.cloud.callFunction({
            name: 'UpdateBookDetail',
            data: {
                itemId: that.data.curBookDetail._id,
                book_cover: that.data.DetailSetMenu[0].detailContent,
                book_title: that.data.DetailSetMenu[1].detailContent,
                original_price: that.data.DetailSetMenu[2].detailContent,
                ISBN: that.data.DetailSetMenu[3].detailContent,
                author: that.data.DetailSetMenu[4].detailContent,
                artist: that.data.DetailSetMenu[5].detailContent,
                translator: that.data.DetailSetMenu[6].detailContent,
                book_content: that.data.DetailSetMenu[7].detailContent,
                book_desc: that.data.DetailSetMenu[8].detailContent,
                publisher: that.data.DetailSetMenu[9].detailContent,
                publication_date: that.data.DetailSetMenu[10].detailContent,
            },
            success: res_update => {
                console.log('res_update>>>', res_update)
                //若更新成功，则再次请求数据库，更新当前书籍信息（App.js/globalData.App_book_in_cate[index]）
                library_db.collection('LibraryBooksInfo').where({
                    _id: that.data.curBookDetail._id
                }).get({
                    success: res => {
                        if (that.data.entrance == 'category') {
                            // 从分类页进入，更新App_book_in_cate
                            The_App.globalData.App_book_in_cate[that.data.curBookIndex] = res.data[0]
                        } else if (that.data.entrance == 'shelf') {
                            // 从书架页进入，更新App_book_in_shelf
                            The_App.globalData.App_book_in_shelf = res.data[0]
                        }
                        // 显示更新成功
                        wx.showToast({
                            title: '已更新',
                            icon: 'success',
                            duration: 2000,
                            success: res => {
                                // 跳转到上一页面
                                wx.navigateBack({
                                    delta: 1,
                                })
                            }
                        })
                    }
                })
            },
            fail: res_update => {
                wx.showToast({
                    title: '更新失败',
                    icon: 'error'
                })
                console.log('更新失败>>>', res_update)
            }
        })
    },

    onLoad: function (options) {
        var self = this
        if (options.entrance == 'category') {
            // 从分类页面进入
            // 继承上一页面书籍index信息
            self.setData({
                curBookIndex: options.curBookIndex,
                entrance: options.entrance    // 标记entrance
            });
            // 根据index在全局数据中查询该书籍信息
            var curBookInfo_App = The_App.globalData.App_book_in_cate[options.curBookIndex]
        } else if (options.entrance == 'shelf') {
            // 从书架页面进入
            // 标记entrance
            self.setData({
                entrance: options.entrance
            })
            // 直接从全局数据中查询该书籍信息
            var curBookInfo_App = The_App.globalData.App_book_in_shelf
        }

        self.setData({
            // 将该书籍信息保存到本地以供渲染
            curBookDetail: curBookInfo_App,
            // 定义书籍信息设置菜单，便于展示、修改和数据库更新
            DetailSetMenu: [{
                    detailName: '书籍封面',
                    detailId: 1,
                    detailContent: curBookInfo_App.book_cover
                },
                {
                    detailName: '书名',
                    detailId: 2,
                    detailContent: curBookInfo_App.book_title
                },
                {
                    detailName: '价格',
                    detailId: 3,
                    detailContent: curBookInfo_App.original_price
                },
                {
                    detailName: 'ISBN',
                    detailId: 4,
                    detailContent: curBookInfo_App.ISBN
                },
                {
                    detailName: '作者',
                    detailId: 5,
                    detailContent: curBookInfo_App.author
                },
                {
                    detailName: '绘者',
                    detailId: 6,
                    detailContent: curBookInfo_App.artist
                },
                {
                    detailName: '译者',
                    detailId: 7,
                    detailContent: curBookInfo_App.translator
                },
                {
                    detailName: '目录',
                    detailId: 8,
                    detailContent: curBookInfo_App.book_content
                },
                {
                    detailName: '书籍简介',
                    detailId: 9,
                    detailContent: curBookInfo_App.book_desc
                },
                {
                    detailName: '出版社',
                    detailId: 10,
                    detailContent: curBookInfo_App.publisher
                },
                {
                    detailName: '出版时间',
                    detailId: 11,
                    detailContent: curBookInfo_App.publication_date
                },
            ]
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