const The_App = getApp()

Page({

    data: {
        addNew: 'shelf',
        shelf_list: []
    },

    AddNewCategory: function (e) {
        wx.navigateTo({
          url: '../NewCate_Shelf/NewCate_Shelf?addNew=' + this.data.addNew,
        })
    },

    OpenShelfDetail: function (e) {
        var shelf_info = e.currentTarget.dataset.info
        wx.navigateTo({
          url: '../book-shelf/book-shelfDetail/book-shelfDetail?shelf_info=' + JSON.stringify(shelf_info),
        })
    },
    
    onLoad: function (options) {
        var self = this

        wx.cloud.callFunction({
            name: "ShelfSet",
            success: res_shelf => {
                //封装好的自定义排序规则函数
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
                var shelfArr = res_shelf.result.list
                var shelfArrSorted = shelfArr.sort(objectArraySort('_id'))

                self.setData({
                    shelf_list: shelfArrSorted
                })
                The_App.globalData.ShelfData = shelfArrSorted
            },
            fail: res_shelf => {
                console.log('error>>>', res_shelf)
            }
            
        })
    },

    onReady: function () {

    },

    onShow: function () {
        var self = this

        wx.cloud.callFunction({
            name: "ShelfSet",
            success: res_shelf => {
                //封装好的自定义排序规则函数
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
                var shelfArr = res_shelf.result.list
                var shelfArrSorted = shelfArr.sort(objectArraySort('_id'))

                self.setData({
                    shelf_list: shelfArrSorted
                })
                The_App.globalData.ShelfData = shelfArrSorted
            },
            fail: res_shelf => {
                console.log('error>>>', res_shelf)
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