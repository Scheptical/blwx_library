const The_App = getApp();
const library_db = wx.cloud.database();

Page({

    data: {
        curBooksInfo: [],
        curShelfBooksInfo: [],
        DetailIndex: ''
    },

    OpenBookDetail: function (e) {
        var curBookId = e.currentTarget.dataset.id
        wx.navigateTo({
          url: '../PageDetail/BookDetail/BookDetail?curBookId=' + curBookId,
        })
    },

    onLoad: function (options) {
        function ForwardRankingDate(data, p) {
            for (i = 0; i < data.length - 1; i++) {
                for (j = 0; j < data.length - 1 - i; j++) {
                    console.log(Date.parse(data[j][p]));
                    if (Date.parse(data[j][p]) > Date.parse(data[j + 1][p])) {
                        var temp = data[j];
                        data[j] = data[j + 1];
                        data[j + 1] = temp;
                    }
                }
            }
            return data;
        }

        var curBooksInfo = The_App.globalData.LibraryBooks_App
        var curShelfBooksInfo = The_App.globalData.ShelfBooks_App
        for (var i = 0; i < curShelfBooksInfo.length; i ++) {
            curBooksInfo[i].OnShelfDate = curShelfBooksInfo[i].OnShelfDate
        }

        this.setData({
            DetailIndex: options.DetailIndex,
            curBooksInfo: curBooksInfo,
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