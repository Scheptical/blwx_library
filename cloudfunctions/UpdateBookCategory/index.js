// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
let library_db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        return await library_db.collection("LibraryBooksInfo").where({
            _id: event.itemId,
            _openid: 'obesM5vW-COYe6BcoPQqVTHkUjDs'
        }).update({
            data: {
                book_category: event.book_category
            }
        })
    } catch (e) {
        console.error(e)
    }
}