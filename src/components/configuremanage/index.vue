<template>
  <div class="page">
      <!-- <el-row class="warp">
        <el-col :span="24" class="warp-breadcrum">  
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
            <el-breadcrumb-item>配置管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row> -->
      <el-row class="setmanange">
        <ul>
          <li @click="toggleTab(index,tab.path)" v-for="(tab,index) in tabs" :key="index" :class="{active:active === index}">
              {{tab.name}}
          </li>
        </ul>
        <div class="categoryBox">
          <transition name="fade" mode="out-in" appear>
            <component :is="currentTab"></component>
          </transition>
        </div>
      </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import bookcategory from './bookcategory/index';
import bookshelf from './bookshelf/index';
import fineStandard from './fineStandard/index';
import user from './user/index';
export default {
  data() {
    return {
      active:0,
      currentTab:'bookcategory',
      tabs:[
        {
          name:'图书类别设置',
          path:'bookcategory',
        },
        {
          name:'图书书架设置',
          path:'bookshelf',
        },
        {
          name:'罚金标准设置',
          path:'fineStandard',
        },
        {
          name:'用户管理',
          path:'user',
        }
      ]
    }
  },
  components: {
    bookcategory,
    bookshelf,
    fineStandard,
    user
  },
  props:{},
  watch:{},
  computed:{},
  methods:{
    toggleTab(i,v){
      this.active=i;
      this.currentTab=v;
    },
  },
  created(){},
  mounted(){}
}
</script>

<style scoped>
.page{}
.setmanange ul{
  height: 40px;
  margin-bottom:0px;
  text-align: center;
  margin-top:0px;
}
.setmanange ul li{
  float: left;
  margin-right: 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 700;
  width: 140px;
  height: 40px;
  line-height:40px;
  cursor: pointer;
  color: #fff;
  background-color: #999999;
}
.setmanange ul li.active{
  background-color: #108EE9;
  color: #fff;
}
.categoryBox{
  padding:30px;
  margin: 30px 10% 30px 40px;
  box-shadow: 2px 1px 10px 1px rgba(0,0, 0, .4);
}
</style>
