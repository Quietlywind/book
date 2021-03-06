/**
 * Created by jerry on 2017/11/13.
 * 用户相关api
 */
import * as API from './'

export default {
  // //登录
  // login: params => {
  //   return API.POST('/api/v1/users/login', params)
  // },
  // //登出
  // logout: params => {
  //   return API.GET('/api/v1/users/logout', params)
  // },
  // //修改个人信息
  // changeProfile: params => {
  //   return API.PATCH('/api/v1/users/profile', params)
  // },

  // //查询获取user列表(通过page分页)
  // findList: params => {
  //   return API.GET('/api/v1/users', params)
  // },

  // //修改个人密码信息
  // editPass: params =>{
  //   return API.POST('/info/user/edit', params)
  // }




  //登录
  login : params =>{
    return API.POST('/info/lib/login',params)
  },
  //登出
  logout : params =>{
    return API.POST('/info/lib/logout',params)
  },
  //修改个人密码信息
  editPass: params =>{
    return API.POST('/info/lib/updatePsd',params)
  },

  // //登录
  // login : params =>{
  //   return API.POST('/lib/login',params)
  // },
  // //登出
  // logout : params =>{
  //   return API.POST('/lib/logout',params)
  // },
  // //修改个人密码信息
  // editPass: params =>{
  //   return API.POST('/lib/updatePsd',params)
  // }
}
