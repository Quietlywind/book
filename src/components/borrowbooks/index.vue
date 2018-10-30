<template>
  <div>
    <el-row class="warp">
      <el-col :span="24" class="warp-breadcrum">  
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>借阅图书</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col  class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
        <el-col :span="14">
          <div class="method_wrap">
              <span class="title">读者信息</span>
              <el-form :inline="true" :model="readers" size='small' style="text-align: center;" lable-width="0px">
                <el-form-item label="读者编号">
                  <el-input  v-model="readers.readerId" placeholder="" ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleSearch">查看</el-button>
                </el-form-item>
              </el-form>
          </div>
          <div class="method_wrap" ref="method" style="margin-top:5%;min-height:385px;">
              <span class="title">借阅记录</span>
              <div v-show="borrowtableTrue">
                  <!--列表-->
                  <el-table :data="borrowsbook" border highlight-current-row empty-text="暂无记录"  style="width: 100%;">
                    <el-table-column prop="id" label="图书编码"></el-table-column>
                    <el-table-column prop="name" label="图书名称"></el-table-column>
                    <el-table-column prop="region" label="图书类别"></el-table-column>
                    <el-table-column prop="borrowDate" label="借阅日期" sortable></el-table-column>
                    <el-table-column prop="returnDate" label="归还日期" sortable></el-table-column>
                  </el-table>
                  <el-pagination background layout="prev, pager, next,jumper"  :page-size="10" :total="total">
                  </el-pagination>
              </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="method_wrap_right" style="min-height:500px;">
              <span class="title">图书信息</span>
              <el-form :inline="true" :model="books" size='small' style="margin: 5% 0;" class="input-form-inline" lable-width="0px">
                <el-form-item label="图书编码">
                  <el-input  style="width:140px;"  v-model="books.bookId" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="图书名称">
                  <el-input  style="width:140px;"  v-model="books.bookName" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="bookSearch">查询</el-button>
                </el-form-item>
              </el-form>
              <div v-show="booktableTrue">
                  <!--列表-->
                  <el-table :data="booksDetail" border highlight-current-row empty-text="暂无记录"  style="width: 100%;">
                    <el-table-column prop="bookid" label="图书编码"></el-table-column>
                    <el-table-column prop="bookname" label="图书名称"></el-table-column>
                    <el-table-column prop="stocknum" label="库存数量" sortable></el-table-column>
                    <el-table-column label="操作" width="150" align="center">
                      <template slot-scope="scope">
                        <el-button  type="text" @click="borrowDialog(scope.$index,scope.row)">借出</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination style="text-align:right;" background layout="prev, pager, next,jumper"  :page-size="10" :total="total">
                  </el-pagination>
              </div>
          </div>
        </el-col>
      </el-col>
    </el-row>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {

    return {
      total:0,
      page:1,
      limit:10,
      borrowsbook:[], //借阅记录数组
      booksDetail:[{
      bookid:'9787040396638',
      bookname:'小哇昂子',
      stocknum:5,
      },
      {
        bookid:'9787300104591',
        bookname:'小王子',
        stocknum:2,
      },{
        bookid:'9787559416568',
        bookname:'小青蛙啊',
        stocknum:5,
      }], //图书信息数组
      loading:false,
      borrowtableTrue:false,
      booktableTrue:false,
      //读者表单
      readers:{
        readerId:'',
      },
      //图书表单
      books:{
        bookId:'',
        bookName:'',
      }
    }
  },
  components: {

  },
  props:{},
  watch:{},
  computed:{},
  methods:{
    //读者信息查看按钮事件
    handleSearch(){
      this.total=0;
      this.page=1;
      if(this.readers.readerId ==""){
        this.$message.error({showClose:true,message:'请录入读者编号',duration:1500});
      }else{
        this.search();
        this.borrowtableTrue=true;
      }
    },
    //图书信息查看事件
    bookSearch(){
      this.booktableTrue=true;
    },
    search(){
      let that=this;
      let params={
        page:that.page,
        limit:10,
        name:that.readers.readerId
      };
    },
    //图书信息表格图书借出操作
    borrowDialog:function(index,row){
      console.log(row)
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
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
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
      left: 45%;
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
      left: 42%;
      line-height: 2em;
      padding: 0 0.5em;
      background-color: #ffffff;
  }
</style>
