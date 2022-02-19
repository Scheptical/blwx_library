// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let library_db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    const $ = library_db.command
    try {
        return await library_db.collection('LibraryBooksInfo').where({
            ISBN: $.in(event.arrayISBN)
        }).get()
    } catch (e) {
        console.log(e)
    }
}