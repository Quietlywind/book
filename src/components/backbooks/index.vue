<template>
  <div class="page">
    <el-row class="warp">
      <el-col :span="24" class="warp-breadcrum">  
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>归还图书</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col  class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
        <el-col :span="14">
          <div class="method_wrap">
              <span class="title">归还登记</span>
              <el-form :inline="true" :model="readers" size='small' style="text-align: center;margin-bottom:5%;" lable-width="0px">
                <el-form-item label="读者编号">
                  <el-input  v-model="readers.readerId" placeholder="" ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleSearch">查找</el-button>
                </el-form-item>
              </el-form>
              <div v-show="borrowtableTrue">
                  <el-table :data="pollbooks"  border size="mini" highlight-current-row empty-text="暂无记录"  style="width: 100%;">
                    <el-table-column prop="bookid" label="图书编码" align="center"></el-table-column>
                    <el-table-column prop="bookname" label="图书名称" align="center"></el-table-column>
                    <el-table-column prop="press" label="出版社" align="center"></el-table-column>
                    <el-table-column label="操作" width="150" align="center">
                      <template slot-scope="scope">
                        <el-button  type="text" @click="backDialog(scope.$index,scope.row)">查看</el-button>
                        <el-button  type="text" @click="lossDialog(scope.$index,scope.row)">遗失</el-button>
                      </template>
                    </el-table-column> 
                  </el-table>
                  <el-pagination style="text-align:right;" background layout="prev, pager, next,jumper"  :page-size="10" :total="total">
                  </el-pagination>
              </div>
          </div>
        </el-col>
        <el-col :span="10">
          <fieldset class="finepayment" v-show="finetableTrue">
              <legend class="finepayment_title" align="center">罚金缴纳</legend>
              <el-form :inline="true" :model="finebooks" ref="finebooks" size='small' style="margin-top:5%;" class="finepayment-form" lable-width="0px">
                <el-col :span="12">
                  <el-form-item label="图书名称：" >
                      <span>{{finebooks.finebookname}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="读者编号：">
                    <span>{{finebooks.finebookid}}</span>
                  </el-form-item>
                </el-col>  
                <el-col :span="12">
                  <el-form-item label="借书日期：">
                    <span>{{finebooks.fineborrowdate}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="当前日期：">
                    <span>{{finebooks.finenewdate}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="罚金类型：" >
                    <el-select size="mini" multiple  @change="getfineType()" v-model="finebooks.finetype" placeholder="请选择">
                      <el-option label="无" value="0"></el-option>
                      <el-option label="逾期罚金" value="1"></el-option>
                      <el-option label="损坏罚金" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-form>
              <fieldset class="duefine" v-show="overduefine">
                <legend class="duefine_title">逾期罚金</legend>
                  <el-form :inline="true" :model="finebooks" size='small' class="overduefine-form" lable-width="0px">
                <el-col :span="12">
                  <el-form-item label="逾期天数：">
                      <span style="color:red;">{{overdueDay}}</span>天
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="金额缴纳：">
                    <span>{{overduemoney}}</span>元
                  </el-form-item>
                </el-col>  
              </el-form>
              </fieldset>
              <fieldset class="duefine" v-show="damagefine">
                <legend class="duefine_title">损坏罚金</legend>
                  <el-form :inline="true" :model="damagebooks" size='small' class="input-form-inline" lable-width="0px">
                    <el-col :span="12">
                      <el-form-item label="损坏程度：">
                        <el-select style="width:130px;" size="mini" @change="getdamagefine()" v-model="damagebooks.damagetype" placeholder="请选择">
                          <el-option label="请选择" value=""></el-option>
                          <el-option label="一般损坏" value="1"></el-option>
                          <el-option label="严重损坏" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="金额缴纳：">
                        <el-input  style="width:40px;" size='mini' v-model="damagebooks.damagemoney" placeholder="" ></el-input>元
                      </el-form-item>
                    </el-col>  
                  </el-form>
              </fieldset>
              <el-col :span="24" style="margin:3% 0;">
                <el-col :span="12" style="font-size:14px;line-height: 32px;">
                  金额总计：<span style="color:red;">{{moneyTotal}}</span> 元
                </el-col>
                <el-col :span="12" style="text-align: right;">
                    <el-button type="primary" @click.native="backbooks" size="small">归还</el-button>
                </el-col>
              </el-col>
          </fieldset>
        </el-col>
      </el-col>
    </el-row>
    <el-row>
      <div>

      </div>
      <div style="margin-top:3%;" v-show="borrowrecordTrue">
          <el-table :data="borrowrecord"  size="mini" border highlight-current-row empty-text="暂无记录"  style="width: 100%;">
              <el-table-column prop="bookname" label="图书书名"></el-table-column>
              <el-table-column prop="region" label="图书类别"></el-table-column>
              <el-table-column prop="press" label="出版社"></el-table-column>
              <el-table-column prop="borrowDate" label="借阅日期" sortable></el-table-column>
              <el-table-column prop="returnDate" label="归还日期" sortable></el-table-column>
              <el-table-column prop="finetype" label="罚金类型"></el-table-column>
              <el-table-column prop="finepayment  " label="罚金缴纳(单位/元)" sortable></el-table-column>
          </el-table>
              <el-pagination style="text-align: right;" background layout="prev, pager, next,jumper"  :page-size="10" :total="total">
          </el-pagination>
      </div>
    </el-row>
    <!-- 图书遗失弹框 -->
      <el-dialog center title="" :visible.sync ="lossVisible" :close-on-press-escape="true" :close-on-click-modal="false" width="30%">
        <el-form :model="editForm" :inline="false" status-icon label-width="100px"  ref="editForm">
          <el-form-item label="图书名称：">
            <span>{{editForm.bookname}}</span>
          </el-form-item>
          <el-form-item label="赔偿金额：">
            <span>{{editForm.price}}</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="resetForm('editForm')" size="small">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" size="small">确认缴纳</el-button>
        </div>
      </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      total:0,
      page:1,
      limit:10,
      borrowrecord:[], //归还记录数组
      //借阅记录数组
      pollbooks:[
      {  
        bookid:'9787040396638',
        bookname:'小哇昂子',
        press:'大连出版社',
        borrowdate:'2018-09-30',
        newdate:'2018-10-30'
      },
      {
        bookid:'9787300104591',
        bookname:'小王子',
        press:'山东出版社',
        borrowdate:'2018-05-20',
        newdate:'2018-10-30'
      },{
        bookid:'9787559416568',
        bookname:'小青蛙啊',
        press:'青海出版社',
        borrowdate:'2018-08-17',
        newdate:'2018-10-30'
      }
      ],
      loading:false,
      borrowrecordTrue:false, //归还记录表状态
      borrowtableTrue:false, //归还登记借阅图书表
      finetableTrue:false,  //罚金缴纳登记
      overduefine:false, //逾期罚金
      damagefine:false, //损坏罚金
      lossVisible:false, //图书遗失状态
      overdueDay:0,
      overduemoney:0,
      moneyTotal:0, //罚金总金额
      //损坏罚金数组
      damagebooks:{
        damagetype:'',
        damagemoney:0,
      },
      //读者编号  
      readers:{
        readerId:'',
      },
      //罚金缴纳图书信息
      finebooks:{
        finebookname:'',
        finebookid:'',
        fineborrowdate:'',
        finenewdate:'',
        finetype:'',
      },
      //遗失图书数组
      editForm:{
        bookname:'',
        price:'',
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
        this.borrowrecordTrue=true;
      }
    },
    // 图书信息查看事件
    // bookSearch(){
    //   this.booktableTrue=true;
    //   this.borrowrecordTrue=true;
    // },
    search(){
      let that=this;
      let params={
        page:that.page,
        limit:10,
        name:that.readers.readerId
      };
    },
    //图书信息表格图书查看操作
    backDialog:function(index,row){
      this.finebooks.finebookname=row.bookname;
      this.finebooks.finebookid=row.bookid;
      this.finebooks.fineborrowdate=row.borrowdate;
      this.finebooks.finenewdate=row.newdate;
      this.finetableTrue=true;
    },
    //图书信息表格图书遗失操作
    lossDialog:function(index,row){
      this.editForm.bookname=row.bookname;
      this.editForm.price=12;
      this.lossVisible=true;
    },
    //取消关闭图书信息表格遗失对话框
    resetForm(formName){
      this.lossVisible=false;
      // this.$refs[formName].clearValidate();
    },
    editSubmit(){
      let para = Object.assign({}, this.editForm);
      console.log(para)
      this.lossVisible=false;
    },
    //罚金类型监听
    getfineType(){
      if(this.finebooks.finetype.length>0){
        for(var i=0;i<this.finebooks.finetype.length;i++){
         if(this.finebooks.finetype[i]==1){
            this.overduefine=true;
         }
         if(this.finebooks.finetype[i]==2){
            this.damagefine=true;
         }
        }
      }else{
        this.overduefine=false;
        this.damagefine=false;
      }
    },
    //罚金缴纳归还按钮事件
    backbooks(){
      let para = Object.assign({}, this.finebooks);
      para.overdueDay=this.overdueDay;
      para.overduemoney=this.overduemoney;
      para.moneyTotal=this.moneyTotal;
    }
  },
  created(){},
  mounted(){}
}
</script>

<style  lang="scss">
// scoped
.page{}
// .input-form-inline{
//   width: 70%;
//   margin: auto;
// }
.finepayment-form .el-form-item__label{
    padding:0px;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  margin-bottom:10px;
}
// .overduefine-form .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
//   margin-bottom:0px;
// }
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
  .finepayment{
    border: 1px solid #19BD96;
  }
  .finepayment .finepayment_title{
    text-align: center;
    margin: auto;
    padding: 0 0.5em;
    font-size: 16px;
    font-weight: 700;
    color: #666666;
  }
  .duefine{
    border: 1px solid #7CB5EC;
  }
  .duefine .duefine_title{
    text-align:left;
    padding: 0 0.5em;
    font-size: 14px;
    font-weight: 700;
    color: #666;
  }
</style>
