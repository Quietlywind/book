<template>
  <div>
    <!-- <el-row class="warp">
      <el-col :span="24" class="warp-breadcrum">  
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>借阅图书</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row> -->
    <el-row :gutter="20">
      <el-col  class="warp-main">
        <el-col :span="14">
          <div class="method_wrap">
              <span class="title">读者信息</span>
              <el-form :inline="true" :model="readers" size='small' style="text-align: center;" lable-width="0px">
                <el-form-item label="读者编号">
                  <el-input  v-model="readers.readerId" placeholder="" clearable></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="readerSearch">查看</el-button>
                </el-form-item>
              </el-form>
          </div>
          <div class="method_wrap" ref="method" style="margin-top:30px;min-height:395px;" v-loading="loading" element-loading-text="拼命加载中">
              <span class="title">借阅记录</span>
              <div v-show="borrowtableTrue">
                  <!--借阅记录列表-->
                  <el-table :data="borrowsbook" size="small" border highlight-current-row empty-text="暂无记录"  style="width: 100%;">
                    <el-table-column prop="val2" label="图书编码" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="val3" label="图书名称"></el-table-column>
                    <el-table-column prop="val4" label="图书类别"></el-table-column>
                    <el-table-column prop="val5" label="借阅日期" sortable></el-table-column>
                    <el-table-column prop="val7" label="归还日期" sortable></el-table-column>
                  </el-table>
                  <el-pagination style="text-align: right;" @current-change="borrowCurrentChange" background layout="prev, pager, next,jumper"  :page-size="10" :total="total1">
                  </el-pagination>
              </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="method_wrap_right" style="min-height:518px;">
              <span class="title">图书信息</span>
              <el-form :inline="true" :model="books" size='small' style="margin: 15px 0;" class="book-form-inline" label-width="69px">
                <el-form-item label="图书编码">
                  <el-input  style="width:130px;"  v-model="books.bookid" placeholder="" clearable></el-input>
                </el-form-item>
                <el-form-item label="图书名称">
                  <el-input  style="width:130px;"  v-model="books.bookname" placeholder="" clearable></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="bookerSearch">查询</el-button>
                </el-form-item>
              </el-form>
              <div v-show="booktableTrue">
                  <!--图书信息列表-->
                  <el-table :data="booksDetail" size="small" border highlight-current-row empty-text="暂无记录"  style="width: 100%;">
                    <el-table-column prop="bookUuid" label="图书编码" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bookName" label="图书名称"></el-table-column>
                    <el-table-column prop="bookRemain" label="库存数量" sortable></el-table-column>
                    <el-table-column label="操作" width="60" align="center">
                      <template slot-scope="scope" v-if="scope.row.bookRemain">
                        <el-button  type="text" @click="borrowDialog(scope.$index,scope.row)">借出</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination style="text-align:right;" @current-change="bookCurrentChange"
                   background layout="prev, pager, next,jumper"  :page-size="10" :total="total2">
                  </el-pagination>
              </div>
          </div>
        </el-col>
        <!--图书借出弹框 :rules="edituserForm"-->
          <el-dialog center title="选择归还日期" :visible.sync ="lendFormVisible" :close-on-click-modal="false" width="400px">
            <el-form :model="lendform" size="small" label-width="80px"  ref="lendform"  :rules="lendrules">
              <el-form-item label="借阅日期" prop="nowdate">
                <el-col :md="20" style="padding-right:0px;padding-left:0px;">
                  <span>{{lendform.nowdate}}</span>
                </el-col>
              </el-form-item>
              <el-form-item label="归还日期" prop="backdate">
                <el-col :md="20" style="padding-right:0px;padding-left:0px;">
                  <el-date-picker type="date" placeholder="选择日期" v-model="lendform.backdate"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="借阅数量" prop="bookstock">
                <el-col :md="20" style="padding-right:0px;padding-left:0px;">
                  <el-input-number v-model="lendform.bookstock" @change="lengnumChange" :min="stockmin" :max="stockmax" label="描述文字"></el-input-number>
                </el-col>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" @click.native="lendFormVisible = false">取消</el-button>
              <el-button type="primary" size="small" @click.native="lendSubmit">提交</el-button>
            </div>
          </el-dialog>
      </el-col>
    </el-row>
</div>
</template>

<script type="text/ecmascript-6">
import util from '../../common/util';
import API from '../../api/api_book';
export default {

  data() {

    return {
      total1:0,
      page1:1,
      total2:0,
      page2:1,
      limit:10,
      borrowsbook:[], //借阅记录数组
      booksDetail:[], //图书信息数组
      loading:false,
      borrowtableTrue:false, //借阅记录状态
      booktableTrue:false, //图书信息状态
      lendFormVisible:false, //借出弹框状态
      //读者表单
      readers:{
        readerId:'',
      },
      //图书表单
      books:{
        bookid:'',
        bookname:'',
      },
      lendform:{
        nowdate:'',
        backdate:'',
        bookstock:1,
        bookUuid:'',

      },
      //库存最大数和最小数
      stockmax:0,
      stockmin:1,
      lendrules:{
        backdate:[
          { type: 'date', required: true, message: '请选择归还日期', trigger: 'change' }
        ]
      }
    }
  },
  components: {},
  props:{},
  watch:{},
  computed:{},
  methods:{
    //借阅记录分页事件
    borrowCurrentChange(val){
      this.page1=val;
      this.recordsearch();
    },
    //图书信息记录分页事件
    bookCurrentChange(val){
      this.page2=val;
      this.booksearch();
    },

    //读者信息查看按钮事件
    readerSearch(){
      this.total1=0;
      this.page1=1;
      if(this.readers.readerId ==""){
        this.$message.error({showClose:true,message:'请录入读者编号进行查看',duration:1500});
        // this.recordsearch();
      }else{
        this.recordsearch();
      }
    },
    //借阅记录查询列表事件
    recordsearch(){
      let that=this;
      let params={
        page:that.page1,
        limit:10,
        userid:that.readers.readerId,
        type:true
      };
      that.loading=true;
      API.borrowrecordList(params).then((result)=>{
         that.loading=false;
         if(result && result.status === "101"){
          that.total1= result.data.count;
          that.borrowsbook=result.data.data;
          that.borrowtableTrue=true;
         }
      },(err)=>{
        that.loading=false;
        that.$message.error({showClose:true,message:err.toString(),duration:2000});
      }).catch((error)=>{
        that.loading=false;
        that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
      })
    },
    //图书信息查询列表事件
    bookerSearch(){
      this.total2=0;
      this.page2=1;
      if(this.books.bookid =="" ){
        this.$message.error({showClose:true,message:'请录入图书编码或图书名称进行查询',duration:1500});
        // this.recordsearch();
      }else{
         this.booksearch();
      }
     
    },
    //图书信息查询按钮事件
    booksearch(){
      let that=this;
      let params={
        page:that.page2,
        limit:10,
        bookUuid:that.books.bookid,
        bookName:that.books.bookname
      };
      API.borrowbookList(params).then((result)=>{
        console.log(result)
         if(result && result.status === "101"){
          that.total1= result.data.count;
          that.booksDetail=result.data.data;
          that.booktableTrue=true;
          // this.$message.success({showClose:true,message:'查找图书信息成功',duration:1500});
         }
      },(err)=>{
        that.$message.error({showClose:true,message:err.toString(),duration:2000});
      }).catch((error)=>{
        that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
      })
    },


    //图书信息表格打开图书借出操作
    borrowDialog:function(index,row){
      this.stockmax=row.bookRemain;
      this.lendform = {
          backdate:'',
          nowdate:util.formatDate.format(new Date(), 'yyyy-MM-dd'),
          bookstock:row.bookRemain,
          bookUuid:row.bookUuid
      };
      this.lendFormVisible=true;
    },
    //图书信息表格借出弹框提交按钮操作
    lendSubmit(){
      let that=this;
      this.$refs.lendform.validate((valid)=>{
        if(valid){
          let params={
            bookUuid:that.lendform.bookUuid,
            appointedDate:that.lendform.backdate,
            lendNum:that.lendform.bookstock,
            idCard:that.readers.readerId
          }
          params.appointedDate = (!params.appointedDate || params.appointedDate === '') ? '' : util.formatDate.format(new Date(params.appointedDate), 'yyyy-MM-dd');
          API.lendbook(params).then((result)=>{
            console.log(result)
            if(result && result.status === "101"){
              that.lendFormVisible=false;
              this.$message.success({showClose:true,message:'图书借出成功',duration:1500});
              that.readerSearch();
              that.bookerSearch();
            }
          },(err)=>{
            that.$message.error({showClose:true,message:err.toString(),duration:2000});
          }).catch((error)=>{
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          })
        }
      })
    },
    //图书借出数量改变
    lengnumChange(val){
      
    }
  },
  created(){
    
  },
  mounted(){
    // var heightCss = window.getComputedStyle(this.$refs.method).height; // ？px
    // console.log(heightCss)
    
  }
}
</script>

<style lang="scss" scoped>
  .book-form-inline .el-form-item--mini.el-form-item,.book-form-inline .el-form-item--small.el-form-item{
    margin-bottom:0px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .method_wrap{
    position: relative;
    border: 1px solid #19BD96;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .method_wrap .title{
      position: absolute;
      font-size: 16px;
      font-weight: 700;
      color: #666666;
      top: -1em;
      left: 44%;
      line-height: 2em;
      padding: 0 0.5em;
      background-color: #ffffff;
  }
  .method_wrap_right{
    position: relative;
    border: 1px solid #19BD96;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .method_wrap_right .title{
      position: absolute;
      font-size: 16px;
      font-weight: 700;
      color: #666666;
      top: -1em;
      left: 41%;
      line-height: 2em;
      padding: 0 0.5em;
      background-color: #ffffff;
  }
</style>
