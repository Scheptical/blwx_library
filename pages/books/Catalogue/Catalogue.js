const The_App = getApp()

Page({
    data: {
        addNew: 'cate',    // 跳转新建页面：传递参数“目录”，代表新建目录操作
        category_list: [],    // 从数据库：获取所有目录并存为列表
    },

    // 点击事件：跳转到新建页面并传入参数 addNew = 'cate' ，表明是新建目录操作
    AddNewCategory: function (e) {
        wx.navigateTo({
          url: '../NewCate_Shelf/NewCate_Shelf?addNew=' + this.data.addNew,
        })
    },

    // 点击事件：点击分类，进入分类详情查看该分类下的所有书籍
    OpenCategoryDetail: function (e) {
        var cate_info = e.currentTarget.dataset.info
        wx.navigateTo({
            url: '/pages/books/Catalogue/CatalogueDetail/CatalogueDetail?cate_info=' + JSON.stringify(cate_info),
        })
        
    },

    onLoad: function (options) {
        var self = this

        // 调用云函数CategorySet提取目录信息，对目录进行排序，并对目录中书本数进行统计
        // 调用数据库，请求数据：目录
        wx.cloud.callFunction({
            name: 'CategorySet',
            success: res_category => {
                // 封装好的自定义排序规则函数
                var objectArraySort = function (keyName) {
                    return function (objectN, objectM) {
                        var valueN = objectN[keyName][0]
                        var valueM = objectM[keyName][0]
                        if (valueN > valueM) {
                            return 1
                        } else if (valueN < valueM) {
                            return -1
                        } else {
                            return 0
                        }
                    }
                }
                // 按_id排序
                var categoryArr = res_category.result.list
                var categoryArrSorted = categoryArr.sort(objectArraySort('_id'))
                // 将排好序的分类信息传递给页面数据
                self.setData({
                    category_list: categoryArrSorted
                })
                // 将排好序的分类信息传递给全局数据
                The_App.globalData.categoryData = categoryArrSorted
            },
            fail: res_category => {
                console.log('error>>>', res_category)
            }
        })
    },

    onReady: function () {

    },

    onShow: function () {
        var self = this

        //调用云函数CategorySet提取目录信息，对目录进行排序，并对目录中书本数进行统计
        wx.cloud.callFunction({
            name: 'CategorySet',
            success: res_category => {

                //自定义排序规则函数
                var objectArraySort = function (keyName) {
                    return function (objectN, objectM) {
                        var valueN = objectN[keyName][0]
                        var valueM = objectM[keyName][0]
                        if (valueN > valueM) {
                            return 1
                        } else if (valueN < valueM) {
                            return -1
                        } else {
                            return 0
                        }
                    }
                }

                //按_id排序
                var categoryArr = res_category.result.list
                var categoryArrSorted = categoryArr.sort(objectArraySort('_id'))

                self.setData({
                    category_list: categoryArrSorted
                })

                The_App.globalData.categoryData = self.data.category_list

            },
            fail: res_category => {
                console.log('error>>>', res_category)
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