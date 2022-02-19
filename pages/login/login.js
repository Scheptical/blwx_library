const db = wx.cloud.database();
const util = require('../../utils/util.js');
const app = getApp();

Page({
    data: {
        nickName: "", //保存昵称
        avatarUrl: "", //保存头像
        isAdmin: 0
    },

    onLoad: function (options) {

    },

    getUserInfo (e) {
        wx.cloud.callFunction({
            name: 'getopenid', //调用云函数获取用户唯一openid
            complete: res => {
                const openid = res.result.openid
                db.collection('LibraryUsers').where({
                    _openid: openid
                }).get().then(res => {
                    console.log(res)
                    //确保数据库只有一份该用户的信息
                    if (res.data == "") {
                        console.log("授权登录成功")
                        this.setData({
                            isFirstLogin: 1,
                        })
                        // 跳转到主界面
                        wx.navigateTo({
                            url: '/pages/ForReaderUsers/ReaderUsers_home/ReaderUsers_home',
                        })

                        db.collection('LibraryUsers').add({
                            data: {
                                nickName: e.detail.userInfo.nickName,
                                avatarUrl: e.detail.userInfo.avatarUrl,
                                time: util.formatTime(new Date()),
                                isAdmin: 0
                            }
                        })
                    } else {
                        console.log("已经登录过不用授权")
                        wx.navigateTo({
                            url: '/pages/ForReaderUsers/ReaderUsers_home/ReaderUsers_home?isAdmin=' + this.data.isAdmin,
                        })
                    }
                })
            }
        })
        this.setData({
            nickName: e.detail.userInfo.nickName,
            avatarUrl: e.detail.userInfo.avatarUrl,
        })
    },

    //用户登录授权
    getAdminInfo (e) {
        wx.cloud.callFunction({
            name: 'getopenid', //调用云函数获取用户唯一openid
            complete: res => {
                const openid = res.result.openid
                db.collection('LibraryUsers').where({
                    _openid: openid
                }).get().then(res => {
                    console.log(res)
                    //确保当前用户具有管理权限
                    if (res.data[0].isAdmin == "1") {
                        console.log("授权登录成功")
                        this.setData({
                            isAdmin: 1
                        })
                        // 跳转到主界面
                        wx.switchTab({
                            url: '/pages/home/home',
                        })

                        /*db.collection('LibraryUsers').add({
                            data: {
                                nickName: e.detail.userInfo.nickName,
                                avatarUrl: e.detail.userInfo.avatarUrl,
                                time: util.formatTime(new Date()),
                            }
                        })*/
                    } else {
                        console.log("未授权")
                        /*wx.switchTab({
                            url: '/pages/home/home',
                        })*/
                    }
                })
            }
        })
        this.setData({
            nickName: e.detail.userInfo.nickName,
            avatarUrl: e.detail.userInfo.avatarUrl
        })
    }
})