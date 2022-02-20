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
                ISBN: event.ISBN,
                artist: event.artist,
                author: event.author,
                translator: event.translator,
                book_cover: event.book_cover,
                book_desc: event.book_desc,
                book_title: event.book_title,
                book_content: event.book_content,
                original_price: event.original_price,
                publication_date: event.publication_date,
                publisher: event.publisher
            }
        })
    } catch (e) {
        console.error(e)
    }
}