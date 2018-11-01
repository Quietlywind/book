<template>
  <div class="wrapper">
      <el-row :gutter="20">
        <el-col :md="24" style="margin-bottom:20px;text-align: right;padding-right:80px;">
            <el-button size="small" type="primary" @click="onexport">导出</el-button>
        </el-col>
        <el-table :data="finebooks" border size="small" highlight-current-row style="width: 100%;" v-loading="loading" element-loading-text="拼命加载中">
            <el-table-column prop="id" label="图书名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="读者编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="region" label="读者姓名"></el-table-column>
            <el-table-column prop="press" label="读者电话"></el-table-column>
            <el-table-column prop="publishAt" label="借阅日期"></el-table-column>
            <el-table-column prop="bookshelf" label="缴纳金额" sortable></el-table-column>
            <el-table-column prop="price" label="是否已通知" sortable></el-table-column>
        </el-table>
        <!--表格分页工具条-->
        <el-col :span="24" v-show="this.finebooks.length !=0">
            <el-pagination background layout="prev, pager, next,jumper"  :page-size="10" :total="total" 
            @current-change="handleCurrentChange" style="float:right;">
            </el-pagination>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import util from '../../common/util';
import API from '../../api/api_book';
export default {
  components:{},
  props:{},
  data(){
    return {
      page:1,
      total:0,
      finebooks:[],

    }
  },
  watch:{},
  computed:{},
  methods:{
    //逾期通知分页事件
    handleCurrentChange(val){
      this.page=val;
      this.search();
    },
    //查询事件
    search(){
      let that=this;
      let params={
          page:that.page,
          limit:10,
      };
        // that.loading=true;
        that.loading=false;
        API.finduser(params).then((result)=>{
            that.loading=false;
            if(result && result.data){
                that.total= result.count;
                that.finebooks=result.data;
            }
        },(err)=>{
            that.loading=false;
            that.$message.error({showClose:true,message:err.toString(),duration:2000});
        }).catch((error)=>{
            that.loading=false;
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        })

    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
.wrapper{}
</style>