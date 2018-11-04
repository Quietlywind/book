<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../assets/logo.png" style="padding-left:8px;"></a>
      </div>
      <div class="topbar-logos" v-show="collapicon">
        <a href="/"><img src="../assets/logotxt.png"></a>
      </div>
      <div class="topbar-title">
        <span style="font-size: 18px;color: #fff;">图书管理系统</span>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i>您好！{{nickname}}
          <i class="iconfont icon-down"></i></span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>
              <div @click="jumpTo('/user/profile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>
            </el-dropdown-item> -->
            <!-- @click="jumpTo('/user/changepwd')" -->
            <el-dropdown-item>
              <div @click="editpassDialog"><span style="color: #555;font-size: 14px;">修改密码</span></div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="topbar-account topbar-bell" @click="overdueNotice" style="cursor: pointer;">
         <i class="el-icon-bell"></i><span>逾期通知</span>
       <!-- 逾期通知 -->
      </div>
    </el-col>

    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}">
        <!--展开折叠开关-->
        <div class="menu-toggle" @click.prevent="collapse">
          <i class="iconfont icon-menufold" v-show="!collapsed"></i>
          <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
        </div>
        <!--导航菜单-->
        <el-menu :default-active="$route.path" router :collapse="collapsed" @select="handleSelect">
          <template v-for="(item,index) in $router.options.routes"  v-if="item.menuShow">
            <el-submenu v-if="!item.leaf" :index="index+''">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow"
                            :class="$route.path==term.path?'is-active':''">
                <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path"
                          :class="$route.path==item.children[0].path?'is-active':''">
              <i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </aside>

      <!--右侧内容区-->
      <section class="content-container" ref="sectionWhole">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
          <!-- 逾期通知界面 -->
          <el-dialog title="" fullscreen :visible.sync ="overdueVisible" :close-on-click-modal="false" style="width:100%;">
              <overduenotice></overduenotice>
          </el-dialog>
          <!-- 修改密码弹框 -->
          <el-dialog id="editpassDiv" custom-class="editpassdiv" center title="修改密码" :visible.sync ="eidtpassVisible" :close-on-click-modal="false" >
              <el-form style="text-align:center;"  :model="ruleForm" size="small" :inline="true" hide-required-asterisk status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                  <el-form-item label="旧密码" prop="oldPass">
                    <el-input class="lg0" type="password" v-model="ruleForm.oldPass" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="新密码" prop="nowPass">
                    <el-input class="lg0" type="password" v-model="ruleForm.nowPass" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checkPass">
                    <el-input class="lg0" type="password" v-model="ruleForm.checkPass" clearable></el-input>
                  </el-form-item>
                  <el-form-item style="padding-top:10px;">
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  </el-form-item>
              </el-form>
          </el-dialog>
        </div>
      </section>
    </el-col>

  </el-row>
</template>

<script>
  import {bus} from '../bus.js'
  import API from '../api/api_user';
  import overduenotice from './highcharts/overduenotice'
  export default {
    name: 'home',
    components: {
      overduenotice
    },
    created(){
      bus.$on('setNickName', (text) => {
        this.nickname = text; 
      })
      bus.$on('goto', (url) => {
        if (url === "/login") {
          localStorage.removeItem('access-user');
        }
        this.$router.push(url);
      })
    },
    data () {
      var validatePass = (rule,value,callback) =>{
          if(value ===""){
            callback(new Error('请输入新密码'));
          }else{
            if(this.ruleForm.checkPass !==''){
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
      }
      var validatePass2 = (rule,value,callback) =>{
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.nowPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return {
        defaultActiveIndex: "0",
        nickname: '',
        collapsed: false,
        collapicon:false, 
        overdueVisible:false, //逾期通知界面弹框
        eidtpassVisible:false, //修改密码弹框状态
        ruleForm:{
          oldPass:'',
          nowPass:'',
          checkPass:'',
        },
        rules:{
          oldPass:[
            { required: true, message: '请输入旧密码', trigger: 'blur' },
          ],
          nowPass:[
            {required:true, validator: validatePass, trigger: 'blur' }
          ],
          checkPass:[
            {required:true, validator: validatePass2, trigger: 'blur' }
          ],
        },
      }
    },
    methods: {
      handleSelect(index){
        this.defaultActiveIndex = index;
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      jumpTo(url){
        this.defaultActiveIndex = url;
        this.$router.push(url); //用go刷新
      },
      logout(){ 
        let that = this;
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonClass: 'el-button--warning',
          type: 'warning'
        }).then(() => {
          //确认
          that.loading = true;
          API.logout().then(function (result) {
            that.loading = false;
            localStorage.removeItem('access-user');
            that.$router.go('/login'); //用go刷新
          }, function (err) {
            that.loading = false;
            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
          }).catch(function (error) {
            that.loading = false;
            console.log(error);
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          });
        }).catch(() => {});
      },
      overdueNotice(){
        this.overdueVisible=true;
      },
      //修改密码弹框
      editpassDialog(){
        let that=this
        this.eidtpassVisible=true;
        this.ruleForm={
          oldPass:'',
          nowPass:'',
          checkPass:'',
        };
        this.$nextTick(function() {
          that.$refs.ruleForm.resetFields();
        })
      },
      //修改密码确认提交
      submitForm(ruleForm) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
           
          } else {
            
            return false;
          }
        });
      },
      resetForm(ruleForm) {
        this.$refs.ruleForm.resetFields();
      }
    },
    mounted() {
      let user = localStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.nickname = user.nickname || '';
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .topbar-wrap {
      height: 50px;
      line-height: 50px;
      background: #404446;
      padding: 0px;

      .topbar-btn {
        color: #fff;
      }
      /*.topbar-btn:hover {*/
      /*background-color: #4A5064;*/
      /*}*/
      .topbar-logo {
        float: left;
        width: 59px;
        line-height: 26px;
      }
      .topbar-logos {
        float: left;
        width: 120px;
        line-height: 26px;
      }
      .topbar-logo img, .topbar-logos img {
        height: 40px;
        margin-top: 5px;
        margin-left: 2px;
      }
      .topbar-title {
        float: left;
        text-align: left;
        width: 200px;
        padding-left: 10px;
        // border-left: 1px solid #000;
      }
      .topbar-account {
        float: right;
        padding-right: 12px;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        padding-left: 10px;
      }
      .topbar-bell{
        
        color:#fff;
      }
    }
    .main {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      top: 50px;
      bottom: 0px;
      overflow: hidden;
    }

    aside {
      min-width: 50px;
      background: #333744;
      &::-webkit-scrollbar {
        display: none;
      }

      &.showSidebar {
        overflow-x: hidden;
        overflow-y: auto;
      }

      .el-menu {
        height: 100%; /*写给不支持calc()的浏览器*/
        height: -moz-calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: calc(100% - 80px);
        border-radius: 0px;
        background-color: #333744;
        border-right: 0px;
      }

      .el-submenu .el-menu-item {
        min-width: 60px;
      }
      .el-menu {
        width: 180px;
      }
      .el-menu--collapse {
        width: 60px;
      }

      .el-menu .el-menu-item, .el-submenu .el-submenu__title {
        height: 56px;
        line-height: 56px;
      }

      .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
         background-color: #7ed2df;
        // background-color: #00c1de;
      }
      .el-menu-item:hover .iconfont, .el-submenu .el-menu-item:hover .iconfont, .el-submenu__title:hover .iconfont{
        // background-color: #7ed2df;
         color:#fff;
      }
    }

    .menu-toggle {
      background: #4A5064;
      text-align: center;
      color: white;
      height: 26px;
      line-height: 30px;
    }

    .content-container {
      // background: #fff;
      background-color: #f4f4f4;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      padding-top:20px;
      padding-bottom: 1px;
      .content-wrapper {
        // background-color: #fff;
        box-sizing: border-box;
      }
    }
    // .el-menu .iconfont{
    //   font-size: 1.375rem;
    // }
    .el-menu .iconfont{
      font-size: .95rem;
    }
    // .el-menu-item.is-active{
    //   background-color: #9DD9D5;
    // }
  }
</style>
<style lang="scss">
  .content-container  #editpassDiv .editpassdiv{
      width:450px;
      text-align: center;
  }
   #editpassDiv .editpassdiv .el-form .lg0{
      width:222px;
    }
</style>

