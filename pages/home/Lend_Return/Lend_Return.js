Page({
  data: {
    TabCur: 0,
    scrollLeft: 0,
    func_lib_LendReturn: [{
        func_name: '在借',
      },
      {
        func_name: '已还',
      },
      {
        func_name: '逾期',
      },
      {
        func_name: '预约',
      }
    ]
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  onLoad: function (options) {
    this.setData({
      TabCur: options.TabId,
      scrollLeft: (options.TabId - 1) * 60
    })
  },
})