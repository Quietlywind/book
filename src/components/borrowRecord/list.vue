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
            <el-input  v-model="borrow.bookname" placeholder="请输入读者编号\书名进行查询" ></el-input>
          </el-form-item>
          <el-form-item label="图书类别" class="demo-form-inline">
                <el-select  v-model="borrow.region" placeholder="请选择">
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="item in bookcategory" :value='item.id' :key="item.id" :label="item.mangeName">
                        {{item.mangeName}}
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
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in finestype" :value='item.value' :key="item.index" :label="item.name">
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
      <el-table :data="borrowBooks" tooltip-effect="dark" border highlight-current-row  style="width: 100%;" empty-text="暂无记录">
        <el-table-column prop="val1" label="读者编号"></el-table-column>
        <el-table-column prop="val2" label="图书编码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="val3" label="图书名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="val4" label="图书类别"></el-table-column>
        <el-table-column prop="val5" label="借阅日期" sortable></el-table-column>
        <el-table-column prop="val7" label="归还日期" ></el-table-column>
        <el-table-column prop="val8" label="罚金类型" sortable></el-table-column>
        <el-table-column prop="val9" label="罚金（单位/元）"></el-table-column>
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
import util from '../../common/util';
import API from '../../api/api_book';
export default {
  components:{},
  props:{},
  data(){

    return {
        borrow:{
            userid:'', 
            bookname:'',
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

        //记录查询页下拉数据-图书类别
        bookcategory:[],
        //模拟下拉数据-罚金类型
        finestype:[
            {
            name:'逾期罚款',
            value:'1'
            },
            {
            name:'损坏罚款',
            value:'2'
            },
            {
            name:'遗失',
            value:'3'
            }
        ],
    }
  },
  watch:{},
  computed:{},
  methods:{
    //记录查询页分页事件
    handleCurrentChange(val){
        this.page=val;
        this.search();
    },
    //记录查询页查询按钮事件
    handleSearch(){
        this.total=0;
        this.page=1;
        this.search();
    },
    //记录查询页查询事件
    search(){
      let that=this;
      let params={
        page:that.page,
        limit:10,
        userid:that.borrow.bookname,
        bookName:that.borrow.bookname,
        bookCategory:that.borrow.region,
        backStart:that.borrow.returnDate1,
        backEnd:that.borrow.returnDate2,
        lendStart:that.borrow.borrowDate1,
        lendEnd:that.borrow.borrowDate2,
        money:that.borrow.fineType
      };
      that.loading=true;
      params.backStart = (!params.backStart || params.backStart == '') ? '' : util.formatDate.format(new Date(params.backStart), 'yyyy-MM-dd');
      params.backEnd = (!params.backEnd || params.backEnd == '') ? '' : util.formatDate.format(new Date(params.backEnd), 'yyyy-MM-dd');
      params.lendStart = (!params.lendStart || params.lendStart == '') ? '' : util.formatDate.format(new Date(params.lendStart), 'yyyy-MM-dd');
      params.lendEnd = (!params.lendEnd || params.lendEnd == '') ? '' : util.formatDate.format(new Date(params.lendEnd), 'yyyy-MM-dd');
      API.recordList(params).then((result)=>{
        console.log(result)
        that.loading=false;
        if(result && result.status === "101"){
          that.total= result.data.count;
          that.borrowBooks=result.data.data;
        }
      },(err)=>{
        that.loading=false;
        that.$message.error({showClose:true,message:err.toString(),duration:2000});
      }).catch((error)=>{
        that.loading=false;
        that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
      })
    },
    //记录查询页请求图书类别
    searchbookcategory(){
      let that=this;
      let params={
        mangeType:"book_type"
      };
      API.setshelf(params).then((result)=>{
        console.log(result)
        if (result && result.status === "101") {
            that.bookcategory=result.data;
        } else {
          that.$message.error({showClose: true, message: '暂无数据', duration: 2000});
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
    this.searchbookcategory()
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
 .top_toolbar1 .el-form-item--mini.el-form-item,.top_toolbar1 .el-form-item--small.el-form-item{
     margin-bottom: 10px;
 }
 .top_toolbar1 .demo-form-inline .el-form-item__content .el-input{
    max-width: 140px;
 }
.wrapper{}
</style>