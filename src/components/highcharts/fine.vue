<template>
  <div class="wrapper">
      <el-row :gutter="20">
        <el-col :span="24" class="toolbar_top11" style="margin-bottom:20px;">
            <el-form :model="fines" ref="fines" :inline="true" size="small" label-position='left' label-width="80px">
                <el-form-item prop="bookname">
                    <el-input style="width:150px;" v-model="fines.bookname" placeholder="请输入书名" @keyup.enter.native="onSubmit"></el-input>
                </el-form-item>
                <el-form-item label="图书类型" prop="bookCategory">
                    <el-select style="width:150px;" v-model="fines.bookCategory" placeholder="请选择图书类型">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="item in bookCategory" :value='item.id' :key="item.id" :label="item.mangeName">
                            {{item.mangeName}}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="处理类型" prop="dealType">
                    <el-select style="width:150px" v-model="fines.dealType" placeholder="请选择">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="item in handlebooks" :value='item.val' :key="item.val" :label="item.name">
                            {{item.name}}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="处理时间" prop="paydate1">
                    <el-date-picker  type="date" placeholder="选择日期" v-model="fines.paydate1" style="width:140px;"></el-date-picker>
                    <span>-</span>
                    <el-date-picker type="date" placeholder="选择时间" v-model="fines.paydate2" style="width:140px;"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <div v-loading="loading" element-loading-text="拼命加载中">
            <el-table :data="finebooks" border size="small" highlight-current-row style="width: 100%;" >
                <el-table-column prop="val1" label="图书编码" show-overflow-tooltip></el-table-column>
                <el-table-column prop="val2" label="图书名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="val3" label="图书类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="val4" label="出版社"></el-table-column>
                <el-table-column prop="val5" label="书架">
                    <template slot-scope="scope">
                        <span >第{{scope.row.val5}}个书架</span>
                    </template>
                </el-table-column>
                <el-table-column prop="val6" label="单价"></el-table-column>
                <el-table-column prop="val7" label="处理数量">
                    <template slot-scope="scope">
                        <span >{{scope.row.val7}}本</span>
                    </template>
                </el-table-column>
                <el-table-column prop="val8" label="处理时间" sortable></el-table-column>
                <el-table-column prop="val9" label="处理类型" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.val9==1">下架</span>
                        <span v-else-if="scope.row.val9==2">遗失</span>
                        <span v-else-if="scope.row.val9==3">变卖</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
            bookCategory:'',
            paydate1:'',
            paydate2:'',
            dealType:'',
        },
        finebooks:[], //处理列表数组
        //模拟下拉数据-罚金类型
        bookCategory:[],
        //处理类型数组
        handlebooks:[
          {
            val:1,
            name:'下架'
          },
          {
            val:2,
            name:'遗失'
          },
          {
            val:3,
            name:'变卖'
          },
        ],
    }
  },
  watch:{
  },
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
            bookName:that.fines.bookname,
            bookCategory:that.fines.bookCategory,
            dealStart:that.fines.paydate1,
            dealEnd:that.fines.paydate2,
            dealType:that.fines.dealType,
        };
        params.dealStart = (!params.dealStart || params.dealStart === '') ? '' : util.formatDate.format(new Date(params.dealStart), 'yyyy-MM-dd');
        params.dealEnd = (!params.dealEnd || params.dealEnd === '') ? '' : util.formatDate.format(new Date(params.dealEnd), 'yyyy-MM-dd');
        that.loading=true;
        API.dealtipList(params).then((result)=>{
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

      //记录查询页请求图书类别
    searchbookcategory(){
      let that=this;
      let params={
        mangeType:"book_type"
      };
      API.setshelf(params).then((result)=>{
        if (result && result.status === "101") {
            that.bookCategory=result.data;
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
    
    fineDeal(){
        let that=this;
        this.$nextTick(function() {
            that.fines.paydate2="";
            that.$refs.fines.resetFields();
        })
    },
  },
  created(){
  },
  mounted(){
    let that=this;
    this.onSubmit();
    this.searchbookcategory();
  }
}
</script>
<style lang="scss" scoped>

.wrapper .toolbar_top11{
    box-shadow: 1px 1px 5px 0 rgba(0,0, 0, .3);
    padding:10px;
    background-color:#fff;
 }
 .toolbar_top11 .el-form-item--mini.el-form-item,.toolbar_top11 .el-form-item--small.el-form-item{
     margin-bottom: 0px;
 }
</style>