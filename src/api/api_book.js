/**
 * Created by jerry on 2017/11/13.
 * 图书相关api
 */
import * as API from './'

export default {

  //查询配置管理/用户管理获取user列表(通过page分页)
  finduser:params =>{
    return API.POST('/info/userinfo/list',params)
  },
  //查询配置管理/用户管理新增用户
  adduser:params =>{
    return API.POST('/info/userinfo/add',params)
  },
  //查询配置管理/用户管理编辑用户
  edituser:params =>{
    return API.POST('/info/userinfo/update',params)
  },
  //查询配置管理/用户管理删除用户
  deluser:params =>{
    return API.POST('/info/userinfo/delete',params)
  },
  //查询配置管理/用户管理批量导入
  batchimportantuser:params =>{
    return API.POST('/info/userinfo/insertUsers',params)
  },

  //查询配置管理/图书书架和罚金标准共用设置获取数据
  setshelf:params =>{
    return API.POST('/info/mange/list',params)
  },
  //查询配置管理/图书书架设置修改和罚金标准共用设置修改数据
  updateshelf:params =>{
    return API.POST('/info/mange/update',params)
  },
  //查询配置管理/图书类别删除类别
  delshelfcategory:params =>{
    return API.POST('/info/mange/delete',params)
  },
  //查询配置管理/图书类别删除类别
  insertregion:params =>{
    return API.POST('/info/mange/insert',params)
  },
  
  //查询记录查询获取列表(通过page分页)
  recordList: params => {
    return API.POST('/info/record/list', params)
  },

  //归还图书查询记录借书信息列表(通过page分页)
  backbookList: params => {
    return API.POST('/info/record/list', params)
  },
  //归还图书查询记录还书信息列表(通过page分页)
  backbookrecord: params => {
    return API.POST('/info/record/list', params)
  },
  //归还图书页面罚金缴纳归还按钮
  recordback: params => {
    return API.POST('/info/record/back', params)
  },

  //借阅图书页面查询读者借阅记录信息列表(通过page分页)
  borrowrecordList: params => {
    return API.POST('/info/record/list', params)
  },
  //借阅图书页面查询图书信息列表(通过page分页)
  borrowbookList: params => {
    return API.POST('/info/books/list', params)
  },
  //借阅图书页面借出操作
  lendbook: params => {
    return API.POST('/info/record/lend', params)
  },
  //图书库存页面查询图书库存列表信息(通过page分页)
  stockbookList: params => {
    return API.POST('/info/books/list', params)
  },
  //图书库存页面新增图书数据
  addbookstock: params => {
    return API.POST('/info/books/add', params)
  },
  //图书库存页面修改图书数据
  editbookstock: params => {
    return API.POST('/info/books/update', params)
  },
  //图书库存页面处理图书数据
  bookdeal: params => {
    return API.POST('/info/bookDeal/add', params)
  },
  //图书库存页面批量修改图书数据
  bookbatch: params => {
    return API.POST('/info/books/updates', params)
  },
  //首页图书处理弹框列表数据信息
  dealtipList : params =>{
    return API.POST('/info/bookDeal/list',params)
  },
  //首页列表选项数据信息
  indextabList : params =>{
    return API.POST('/info/report/libInfoSort',params)
  },
  //首页数据展示请求
  indexlibinfo : params =>{
    return API.POST('/info/report/libInfo',params)
  },






  //查询获取book列表(通过page分页)
  findList: params => {
    return API.GET('/api/v1/books', params)
  },
  //查询获取归还记录列表(通过page分页)
  findRecord: params => {
    return API.GET('/api/v1/books/Record', params)
  },
  //查询获取一条book信息
  findById: id => {
    return API.GET(`/api/v1/books/${id}`)
  },

  add: params => {
    return API.POST(`/api/v1/books`, params)
  },
  update: (id, params) => {
    return API.PUT(`/api/v1/books/${id}`, params)
  },

  //单个删除book
  remove: id => {
    return API.DELETE(`/api/v1/books/${id}`)
  },

  //批量删除，传ids数组
  removeBatch: (ids) => {
    return API.DELETE(`/api/v1/books/batch/${ids}`)
  }

}
