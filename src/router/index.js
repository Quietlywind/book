import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'

import hight from '@/components/highcharts/index'

import BookList from '@/components/book/list'
import BookCategoryList from '@/components/bookcategory/list'

import UserList from '@/components/user/list'
import UserChangePwd from '@/components/user/changepwd'
import UserProfile from '@/components/user/profile'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)  //登录
const addbook = resolve => require(['@/components/book/addbook'], resolve) //归还图书
const BookStock = resolve => require(['@/components/bookStock/list'], resolve) //图书库存
const borrowRecord = resolve => require(['@/components/borrowRecord/list'], resolve) //记录查询
const borrowbooks = resolve => require(['@/components/borrowbooks/index'], resolve) //借阅图书
const backbooks = resolve => require(['@/components/backbooks/index'], resolve) //归还图书
const configuremanage = resolve => require(['@/components/configuremanage/index'], resolve) //配置管理

Vue.use(Router)

let router = new Router({
// mode: 'history',
  mode:'history',
  base:'',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/dashboard', component: Dashboard, name: '首页', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '新书上架',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/book/addbook', component: addbook, name: '新书上架', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '图书库存',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/bookStock/list', component: BookStock, name: '图书库存', menuShow: true,iconCls: 'iconfont icon-books'},
        // {path: '/book/category', component: BookCategoryList, name: '图书分类', menuShow: true,iconCls: 'iconfont icon-books'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '借阅图书',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/borrowbooks/index', component: borrowbooks, name: '借阅图书', menuShow: true},
        //{path: '/user/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '归还图书',
      menuShow: true,
      leaf: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/backbooks/index', component: backbooks, name: '归还图书', menuShow: true},
      ]
    },
    {
      path: '/',
      component: Home,
      name: '记录查询',
      menuShow: true,
      leaf: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        // {path: '/bookcategory/list', component: BookCategoryList, name: '借还记录', menuShow: true},
        {path: '/borrowRecord/list', component: borrowRecord, name: '记录查询', menuShow: true},
      ]
    },
    {
      path: '/',
      component: Home,
      name: '配置管理',
      menuShow: true,
      leaf: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/configuremanage/index', component: configuremanage, name: '配置管理', menuShow: true},
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router
