const library_db = wx.cloud.database()
const The_App = getApp()

Page({

    data: {
        originalCate: [],
        curCate: [],
        book_in_Cate: []
    },

    OpenBookDetail: function (e) {
        var book_index = e.currentTarget.dataset.index
        wx.navigateTo({
            url: '/pages/books/book_detail_vip/book_detail_vip?book_index=' + book_index,
        })
    },

    SaveCateInfo: function (e) {
        var self = this

        var App_cateData = The_App.globalData.categoryData
        var cateIdArr = []
        for (var i = 0; i < App_cateData.length; i++) {
            cateIdArr[i] = App_cateData[i]._id[0]
        };
        cateIdArr.push(self.data.curCate[0])

        var that = this
        if ((new Set(cateIdArr)).size == cateIdArr.length || that.data.curCate[0] == that.data.originalCate[0]) {
            
            wx.cloud.callFunction({
                name: 'UpdateCateInfo',
                data: {
                    oldCate: that.data.originalCate,
                    newCate: that.data.curCate
                },
                success: res_update => {
                    console.log('res_update>>>', res_update)
                    that.setData({
                        originalCate: that.data.curCate
                    });

                    library_db.collection('LibraryBooksInfo').where({
                        book_category: {
                            0: that.data.originalCate[0]
                        }
                    }).get({
                        success: res => {
                            that.setData({
                                book_in_Cate: res.data
                            })
                            The_App.globalData.App_book_in_cate = res.data
                            console.log('App_book_in_cate>>>', The_App.globalData.App_book_in_cate)

                            wx.showToast({
                                title: '更新成功',
                                icon: 'success',
                                duration: 2000
                            })
                        }
                    })
                }
            })
        } else if ((new Set(cateIdArr)).size != cateIdArr.length && that.data.curCate[0] != that.data.originalCate[0]) {
            console.log('有重复分类ID！')
            wx.showToast({
                title: '重复ID！',
                icon: 'error',
                duration: 2000
            })
        }
        
    },

    ChangeCateName: function (e) {
        this.setData({
            'curCate[1]': e.detail.value
        })
    },

    ChangeCateId: function (e) {
        this.setData({
            'curCate[0]': e.detail.value
        })
    },

    onLoad: function (options) {
        this.setData({
            originalCate: JSON.parse(options.cate_info),
            curCate: JSON.parse(options.cate_info)
        })

        var self = this
        //首次载入页面，从数据库获取当前分类下所有书籍信息
        library_db.collection("LibraryBooksInfo").where({
            book_category: {
                0: self.data.originalCate[0]
            }
        }).get({
            success: res => {
                self.setData({
                    book_in_Cate: res.data
                })
                The_App.globalData.App_book_in_cate = res.data //将当前分类下所有书籍信息传入App.js/globalData.App_App_book_in_cate
            }
        })
    },

    onReady: function () {

    },

    //每次跳转至该页面，同步一次页面数据（请求数据库），并更新该分类下的所有书籍信息（App.js/globalData.App_book_in_cate）
    onShow: function () {
        var self = this
        library_db.collection("LibraryBooksInfo").where({
            book_category: {
                0: self.data.originalCate[0]
            }
        }).get({
            success: res => {
                self.setData({
                    book_in_Cate: res.data
                })
                The_App.globalData.App_book_in_cate = res.data
            }
        })
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