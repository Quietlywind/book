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
  // finduser:params =>{
  //   return API.POST('/userinfo/list',params)
  // },
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
