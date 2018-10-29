/**
 * 初始化图书(book)模拟数据
 *
 * Created by jerry on 2017/11/13.
 */
const Mock = require('mockjs');

const Books = [];
// for (let i = 0; i < 100; i++) {
//   Books.push(Mock.mock({
//     id: Mock.Random.guid(),
//     name: Mock.Random.ctitle(2, 12),
//     author: Mock.Random.cname(),
//     description: Mock.Random.csentence(180, 500),
//     publishAt: Mock.Random.date()
//   }))
// }
const category1 =['小说','军事','心理','儿童','文艺','哲学'];
const press1=['人民教育出版社','中国画报出版社','人民出版社','华夏出版社','经济日报出版社','中国少年儿童出版社','时事出版社','印刷工业出版社','解放军文艺出版社','北京教育出版社','高等教育出版社','人民美术出版社','语文出版社','现代出版社'];
const status1=['在库','变卖','遗失']
for (let i = 0; i < 100; i++) {
  Books.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.ctitle(2, 12),
    region:category1[Math.floor((Math.random()*category1.length))],
    press:press1[Math.floor((Math.random()*press1.length))],
    publishAt: Mock.Random.date(),
    bookshelf:"第"+Math.ceil(Math.random()*30)+"个书架",
    price:Math.ceil(Math.random()*500)+".0",
    status:status1[Math.floor((Math.random()*status1.length))],
    stocknum:Math.ceil(Math.random()*100),
  }))
}

module.exports = Books;
