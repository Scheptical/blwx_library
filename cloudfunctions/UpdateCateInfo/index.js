// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const library_db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    try {
        return await library_db.collection('LibraryBooksInfo').where({
            _openid: 'obesM5vW-COYe6BcoPQqVTHkUjDs',
            book_category: event.oldCate
        }).update({
            data: {
                book_category: event.newCate
            }
        })
    } catch (e) {
        console.error(e)
    }
}