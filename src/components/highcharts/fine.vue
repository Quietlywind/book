<template>
  <div class="wrapper">
      <el-row :gutter="20">
        <el-col :md="24">
            <el-form :model="fines" ref="fines" :inline="true" size="small">
                <el-form-item>
                    <el-input v-model="fines.bookname" placeholder="请输入书名/读者编号/姓名/电话进行查询" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="罚金类型" >
                    <el-select v-model="fines.finetype" placeholder="请选择罚金类型">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="item in finestype" :value='item.value' :key="item.index" :label="item.name">
                            {{item.name}}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="缴纳日期">
                    <el-col :span="8">
                        <el-date-picker type="date" placeholder="选择日期" v-model="fines.paydate1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="8">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="fines.paydate1" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table :data="finebooks" border size="small" highlight-current-row style="width: 100%;" v-loading="loading" element-loading-text="拼命加载中">
            <el-table-column prop="id" label="图书名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="读者编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="region" label="读者姓名"></el-table-column>
            <el-table-column prop="press" label="读者电话"></el-table-column>
            <el-table-column prop="publishAt" label="罚金类型"></el-table-column>
            <el-table-column prop="bookshelf" label="缴纳日期" sortable></el-table-column>
            <el-table-column prop="price" label="缴纳金额" sortable></el-table-column>
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
        total:0,
        page:1,
        limit:10,
        loading:false,
        fines:{
            bookname:'',
            userid:'',
            username:'',
            userphone:'',
            finetype:'',
            paydate1:'',
            paydate2:'',
        },
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
        finebooks:[],
    }
  },
  watch:{},
  computed:{},
  methods:{
      //分页改变事件
      handleCurrentChange(val){
        this.page=val;
        this.search();
      },
      //罚金详情查询按钮
      onSubmit(){
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
            bookname:this.fines.bookname,
            userid:this.fines.bookname,
            username:this.fines.bookname,
            userphone:this.fines.bookname,
            finetype:this.fines.finetype,
            paydate1:this.fines.paydate1,
            paydate2:this.fines.paydate2,
        };
        // that.loading=true;
        that.loading=false;
        API.finduser(params).then((result)=>{
            that.loading=false;
            if(result && result.data){
                that.total= result.count;
                that.users=result.data;
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
      this.onSubmit();
  }
}
</script>
<style lang="scss" scoped>
.wrapper{}
</style>