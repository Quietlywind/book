<template>
  <div class="wrapper">
      <el-row :gutter="20">
        <el-col :md="24" style="margin-bottom:20px;text-align: right;padding-right:40px;">
            <el-button size="small" type="primary" style="float:left;" @click="returnback">返回</el-button>
            <el-button size="small" type="primary" @click="onexport">导出</el-button>
        </el-col>
        <el-table :data="finebooks" border size="small" highlight-current-row style="width: 100%;" v-loading="loading" element-loading-text="拼命加载中">
            <el-table-column prop="val3" label="图书名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="val1" label="读者编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="val10" label="读者姓名"></el-table-column>
            <el-table-column prop="val15" label="读者电话"></el-table-column>
            <el-table-column prop="val5" label="借阅日期"></el-table-column>
            <!-- <el-table-column prop="bookshelf" label="缴纳金额" sortable></el-table-column> -->
            <!-- <el-table-column prop="price" label="是否已通知" sortable></el-table-column> -->
            <el-table-column label="是否已通知" align="center">
                    <template slot-scope="scope">
                      <el-switch @change="delchange(scope.$index,scope.row)" 
                       active-text="是" inactive-text="否" active-color="#409EFF" inactive-color="#dadde5" 
                       v-model="scope.row.val16">
                      </el-switch>
                    </template>
                  </el-table-column>
        </el-table>
        <!--表格分页工具条-->
        <el-col :span="24" v-show="this.finebooks.length !=0">
            <el-pagination background layout="total,prev, pager, next,jumper"  :page-size="10" :total="total" 
            @current-change="handleCurrentChange" style="float:right;">
            </el-pagination>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import util from '../../common/util';
import API from '../../api/api_book';
import axios from 'axios'
export default {
  components:{},
  props:{},
  data(){
    return {
      page:1,
      total:0,
      finebooks:[],
      loading:false,
      inputVal:11, 
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
          money:1,
      };
        that.loading=true;
        that.loading=false;
        API.borrowrecordList(params).then((result)=>{
            that.loading=false;
            if(result && result.status === "101"){
                that.total= result.data.count;
                that.finebooks=result.data.data;
            }
        },(err)=>{
            that.loading=false;
            that.$message.error({showClose:true,message:err.toString(),duration:2000});
        }).catch((error)=>{
            that.loading=false;
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        })
    },
    //导出按钮
    onexport(){
       window.location='/info/record/exportOver';
       this.$message.success({showClose:true,message:"导出逾期通知成功",duration:2000});
    },
    //是否通知开关事件
    delchange(index,row){
        if(!row.val16){
           row.val16=true; 
        }else{
            let that=this;
            let params={
                id: row.val17,
                isNotify:row.val16
            }
            API.recordback(params).then((result)=>{
                if(result && result.status === "101") {
                that.$message.success({showClose:true,message:"通知成功",duration:2000});
                    that.search();
                }else{
                that.$message.success({showClose:true,message:"通知失败",duration:2000});
                    that.search();
                }
                },(err)=>{
                    that.$message.error({showClose:true,message:err.toString(),duration:2000});
                }).catch((error)=>{
                    that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
            })
        }
    },
    returnback(){
        this.$emit('child-say')
    }
  },
  created(){},
  mounted(){
    this.search();
  }
}
</script>
<style lang="scss" scoped>
.wrapper{}
</style>