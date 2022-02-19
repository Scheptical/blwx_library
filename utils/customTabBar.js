var userMenus = {
    activeUrl: 'user_home',
    list: [{
            currentUrl: "user_home",
            "pagePath": "/pages/ForReaderUsers/ReaderUsers_home/ReaderUsers_home",
            "text": "首页",
            "iconPath": "/images/book.png",
            "selectedIconPath": "/images/book_selected.png"
        },
        {
            currentUrl: "rentBook",
            "pagePath": "/pages/ForReaderUsers/ReaderUsers_Rentbooks/ReaderUsers_Rentbooks",
            "text": "借还",
            "iconPath": "/images/book.png",
            "selectedIconPath": "/images/book_selected.png"
        },
        {
            currentUrl: "MyInfo",
            "pagePath": "/pages/ForReaderUsers/ReaderUsers_MyInfo/ReaderUsers_MyInfo",
            "text": "我的",
            "iconPath": "/images/book.png",
            "selectedIconPath": "/images/book_selected.png"
        }
    ]
}
/*
var adminMenus = {
    activeUrl: 'admin_home',
    list: [{
            currentUrl: "admin_home",
            "pagePath": "/pages/home/home",
            "text": "首页",
            "iconPath": "/images/home.png",
            "selectedIconPath": "/images/home_selected.png"
        },
        {
            currentUrl: "books",
            "pagePath": "/pages/books/books",
            "text": "书籍",
            "iconPath": "/images/book.png",
            "selectedIconPath": "/images/book_selected.png"
        },
        {
            currentUrl: "members",
            "pagePath": "pages/members/members",
            "text": "成员",
            "iconPath": "images/man.png",
            "selectedIconPath": "images/man_selected.png"
        },
        {
            currentUrl: "settings",
            "pagePath": "pages/MyLibrary/MyLibrary",
            "text": "设置",
            "iconPath": "images/setting.png",
            "selectedIconPath": "images/setting_selected.png"
        },
    ]
}
*/
module.exports = {
    userMenuData: userMenus,
    //adminMenuData: adminMenus
}