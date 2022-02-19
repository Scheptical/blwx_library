// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let shelf_db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    const $ = shelf_db.command.aggregate
    try {
        return await shelf_db.collection('LibBooksCopy').aggregate().group({
            _id: '$OnShelfPos',
            num: $.sum(1)
        }).end()
    } catch (e) {
        console.error(e)
    }
}