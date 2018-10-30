<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>记录查询</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar top_toolbar1">
        <el-form :inline="true" :model="borrow" size='small' lable-width="0px">
          <el-form-item class="demo-form-inline">
              <!-- @keyup.enter.native="handleSearch" -->
            <el-input  v-model="borrow.name" placeholder="请输入读者编号\书名进行查询" ></el-input>
          </el-form-item>
          <el-form-item label="图书类别" class="demo-form-inline">
                <el-select  v-model="borrow.region" placeholder="请选择">
                    <el-option label="请选择" value=" "></el-option>
                    <el-option v-for="item in bookCategory" :value='item.value' :key="item.index">
                        {{item.name}}
                    </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="借阅日期" class="demo-form-inline">
              <el-date-picker type="date" placeholder="选择日期" v-model="borrow.borrowDate1" ></el-date-picker>
              <span>—</span>
              <el-date-picker type="date" placeholder="选择日期" v-model="borrow.borrowDate2" ></el-date-picker>
          </el-form-item>
          <el-form-item label="归还日期" class="demo-form-inline">
              <el-date-picker type="date" placeholder="选择日期" v-model="borrow.returnDate1" ></el-date-picker>
              <span>—</span>
              <el-date-picker type="date" placeholder="选择日期" v-model="borrow.returnDate2" ></el-date-picker>
          </el-form-item>
          <el-form-item label="罚金类型" class="demo-form-inline">
            <el-select v-model="borrow.fineType" placeholder="请选择">
                <el-option label="请选择" value=" "></el-option>
                <el-option v-for="item in finestype" :value='item.value' :key="item.index">
                    {{item.name}}
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table :data="borrowBooks" highlight-current-row  style="width: 100%;">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="userId" label="读者编号"></el-table-column>
        <el-table-column prop="userId" label="图书编码"></el-table-column>
        <el-table-column prop="name" label="图书名称"></el-table-column>
        <el-table-column prop="region" label="图书类别"></el-table-column>
        <!-- <el-table-column prop="press" label="出版社"></el-table-column> -->
        <el-table-column prop="borrowDate" label="借阅日期" sortable></el-table-column>
        <el-table-column prop="returnDate" label="归还日期" ></el-table-column>
        <el-table-column prop="fineType" label="罚金类型" sortable></el-table-column>
        <el-table-column prop="price" label="罚金（单位/元）"></el-table-column>
      </el-table>  
      <!--表格分页工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination background style="float:right;" layout="total, prev, pager, next,jumper"  :page-size="10" :total="total" @current-change="handleCurrentChange">
        </el-pagination>
      </el-col>
    </el-col>
    
  </el-row> 
</template>

<script>
import API from '../../api/api_book';
export default {
  components:{},
  props:{},
  data(){

    return {
        borrow:{
            name:'',
            region:'',
            borrowDate1:'',
            borrowDate2:'',
            returnDate1:'',
            returnDate2:'',
            fineType:'',
        },
        borrowBooks:[],
        total:0,
        page:1,
        limit:10,
        loading:false,

        //模拟下拉数据-图书类别
        bookCategory:[
            {
            name:'小说',
            value:'小说'
            },
            {
            name:'军事',
            value:'军事'
            },
            {
            name:'心理',
            value:'心理'
            },
            {
            name:'儿童',
            value:'儿童'
            },
            {
            name:'文艺',
            value:'文艺'
            },
            {
            name:'哲学',
            value:'哲学'
            },
        ],
        //模拟下拉数据-罚金类型
        finestype:[
            {
            name:'逾期罚款',
            value:'逾期罚款'
            },
            {
            name:'损坏罚款',
            value:'损坏罚款'
            }
        ],
    }
  },
  watch:{},
  computed:{},
  methods:{
    handleCurrentChange(val){
        this.page=val;
        this.search();
    },
    handleSearch(){
        this.total=0;
        this.page=1;
        this.search();
    },
    //查询事件
    search(){
      let that=this;
      let params={
        page:that.page,
        limit:10,
        name:that.borrow.name,
      };
      that.loading=true;
      API.findRecord(params).then((result)=>{
        that.loading=false;
        if(result && result.Records){
          that.total= result.total;
          that.borrowBooks=result.Records;
        }
      },(err)=>{
        that.loading=false;
        that.$message.error({showClose:true,message:err.toString(),duration:2000});
      }).catch((error)=>{
        that.loading=false;
        that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
      })
    },
  },
  created(){},
  mounted(){
    this.handleSearch()
  }
}
</script>
<style lang="scss">
// scoped 
.top_toolbar1{
    box-shadow: 1px 1px 5px 0 rgba(0,0, 0, .3);
    margin-bottom: 10px;
    padding:10px;background-color:#fff;
 }
 .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
     margin-bottom: 0px;
 }
 .demo-form-inline .el-form-item__content .el-input{
    max-width: 140px;
 }
.wrapper{}
</style>