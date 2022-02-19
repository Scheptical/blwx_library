const util = require('../../../../../utils/util')

Page({
    data: {
        initTextareaHeight: 100,

        curDate: null,

        curCurrency: null,
        curPrice: null,
        CurrencyIndex: 0,
        CurrencyRange: ["人民币 ¥", "日元 J.¥", "港币 HK$", "美元 $", "欧元 €", "英镑 £"],

        DetailInfo: []
    },

    clearInput: function (e) {
        var self = this
        self.setData({
            "DetailInfo.detailContent": '',
            curPrice: ''
        })
    },

    ChangeDetailData: function (e) {
        var self = this

        self.setData({
            curPrice: parseFloat(e.detail.value),
            "DetailInfo.detailContent": e.detail.value,
        })
    },

    DateChange: function (e) {
        this.setData({
            "DetailInfo.detailContent": e.detail.value
        })
    },

    CurrencyChange: function (e) {
        this.setData({
            CurrencyIndex: e.detail.value,
        })

        var self = this
        var CurrencyStr = self.data.CurrencyRange[self.data.CurrencyIndex]
        var getCurrencyIndex = CurrencyStr.lastIndexOf(' ')
        var getCurrency = CurrencyStr.substring(getCurrencyIndex)
        self.setData({
            "DetailInfo.detailContent": getCurrency + " " + self.data.curPrice
        })
    },

    SaveDetailBack: function (e) {
        var that = this
        var Pages = getCurrentPages()
        var prevPage = Pages[Pages.length - 2]

        prevPage.setData({
            [`DetailSetMenu[${that.data.DetailInfo.detailId - 1}].detailContent`]: that.data.DetailInfo.detailContent
        })

        wx.navigateBack({
            delta: 1,
        })
    },

    onLoad: function (options) {
        var that = this
    
        //获取当前属性信息
        var DetailInfo_json = JSON.parse(decodeURI(options.curDetail))

        that.setData({
            DetailInfo: DetailInfo_json
        })

        if (DetailInfo_json.detailId == 3) {
            //获取价格：货币、价格
            var IndexSpace = DetailInfo_json.detailContent.lastIndexOf(' ')

            that.setData({
                curCurrency: DetailInfo_json.detailContent.substring(0, IndexSpace),
                curPrice: DetailInfo_json.detailContent.substring(IndexSpace),
            })

            //币种匹配（去空格），传参给CurrencyIndex，使其在页面上picker作为默认项显示
            var CurrencyRangeArr = that.data.CurrencyRange
            for (var i = 0; i < CurrencyRangeArr.length; i++) {
                var Currency_i = CurrencyRangeArr[i].substring(CurrencyRangeArr[i].lastIndexOf(' ')).replace(/\s+/g, "")
                var Currency_data = that.data.curCurrency.replace(/\s+/g, "")

                if (Currency_i == Currency_data) {
                    that.setData({
                        CurrencyIndex: i
                    })
                }
            }
        }

        //获取当前日期
        if (DetailInfo_json.detailId == 11) {
            var date = util.formatDate(new Date())
            that.setData({
                curDate: date
            })
        }
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