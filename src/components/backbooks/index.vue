<template>
  <div class="page">
    <!-- <el-row class="warp">
      <el-col :span="24" class="warp-breadcrum">  
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>归还图书</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row> -->
    <el-row :gutter="20">
      <el-col  class="warp-main">
        <el-col :span="14">
          <fieldset class="finepayment" style="min-height:400px;background-color:#fff;"> 
              <legend class="finepayment_title" align="center">归还登记</legend>
              <el-form class="form_top" :inline="true" :model="readers" ref="readers" :rules="readersrules" size='small' style="text-align: center;margin-bottom:5%;" label-width="80px">
                <el-form-item label="读者编号" prop="readerId">
                  <el-input  v-model="readers.readerId" placeholder="" clearable></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleSearch">查找</el-button>
                </el-form-item>
              </el-form>
              <div style="width:100%;" v-show="borrowtableTrue" v-loading="loading" element-loading-text="拼命加载中">
                  <el-table :data="pollbooks"  border size="mini" highlight-current-row empty-text="暂无记录"  style="width: 100%;">
                    <el-table-column prop="val2" label="图书编码" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="val3" label="图书名称" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="val11" label="出版社" align="center"></el-table-column>
                    <el-table-column label="操作" width="150" align="center">
                      <template slot-scope="scope">
                        <el-button  type="text" @click="backDialog(scope.$index,scope.row)">查看</el-button>
                        <!-- <el-button  type="text" @click="lossDialog(scope.$index,scope.row)">遗失</el-button> -->
                      </template>
                    </el-table-column> 
                  </el-table>
                  <el-pagination style="text-align:right;" background layout="prev, pager, next,jumper"  :page-size="10" :total="total1"
                  @current-change="borrowCurrentChange">
                  </el-pagination>
              </div>
          </fieldset>   
          <!-- <div class="method_wrap">
              <span class="title">归还登记</span>
              
          </div> -->
        </el-col>
        <!-- 罚金缴纳 -->
        <el-col :span="10">
          <fieldset class="finepayment" v-show="finetableTrue" style="background-color:#fff;"> 
              <legend class="finepayment_title" align="center">罚金缴纳</legend>
              <el-form :inline="true" :model="finebooks" ref="finebooks" :rules="finebooksRules" size='small' style="margin-top:5%;" class="finepayment-form" lable-width="0px">
                <el-col :span="10">
                  <el-form-item label="图书名称：" >
                      <span>{{finebooks.finebookname}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="14">
                  <el-form-item label="读者编号：">
                    <span>{{finebooks.fineuserid}}</span>
                  </el-form-item>
                </el-col>  
                <el-col :span="10">
                  <el-form-item label="借书日期：">
                    <span>{{finebooks.fineborrowdate}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="14">
                  <el-form-item label="当前日期：">
                    <span>{{finebooks.finenewdate}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="归还数量：" prop="finenum">
                    <el-input-number v-model.number="finebooks.finenum" @change="backnumChange" :min="backbookMin" :max="backbookMax" ></el-input-number>
                    <!-- <el-input style="width:80%;" v-model.number="finebooks.finenum" clearable></el-input> -->
                  </el-form-item>
                </el-col>
              </el-form>
              <el-col :span="24">
                  <fieldset class="duefine">
                    <legend class="duefine_title">逾期罚金</legend>
                      <el-form :inline="true" size='small' class="overduefine_form" lable-width="90px">
                        <el-col :span="12">
                          <el-form-item label="逾期天数：">
                              <span style="color:red;">{{overdueDay}}</span>天
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="金额缴纳：">
                            <span style="color:red;">{{overduemoney}}</span>元
                          </el-form-item>
                        </el-col>  
                      </el-form>
                      <!-- <el-col :span="12">
                        逾期天数：<span>{{overdueDay}}</span>天
                      </el-col>
                      <el-col :span="12">
                        金额缴纳：<span>{{overduemoney}}</span>￥
                      </el-col> -->
                  </fieldset>
              </el-col>
              <el-col :span="12">
                  <fieldset class="duefine">
                    <legend class="duefine_title">损坏罚金</legend>
                      <div style="padding: 19px 0px;">
                        <span style="font-size:14px;padding-left:10px;">金额缴纳：</span>
                        <el-input style="width:48%;" size='mini' @change="demageChange" v-model="damagebooks.damagemoney1"></el-input> 
                      </div>
                  </fieldset> 
              </el-col>
              <el-col :span="12">
                  <fieldset class="duefine">
                    <legend class="duefine_title">遗失罚金</legend>
                      <el-col :span="24" style="padding-bottom:10px;">
                        <span class="damagefinetext">金额：</span>
                        <el-input style="width:60%;" size='mini' v-model="damagebooks.damagemoney2" @change="yishimoneyChange"></el-input>
                      </el-col>
                      <el-col :span="24">
                        <span class="damagefinetext">数量：</span>
                        <el-input-number style="width:60%;" size='mini' @change="yishinnumChange" v-model.number="damagebooks.damagenum" :min="0" :max="backbookMax" ></el-input-number>
                        <!-- <el-input style="width:50%;" size='mini' v-model="damagebooks.damagenum"></el-input> -->
                      </el-col>
                  </fieldset>
              </el-col>
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
    <!-- 读者归还记录 -->
    <el-row v-show="borrowrecordTrue" v-loading="loading1" element-loading-text="拼命加载中">
      <div class="line-content" >
        <div>归还记录</div>
      </div>
      <div style="margin-top:3%;padding: 0 10px;">
          <el-table :data="borrowrecord"  size="mini" border highlight-current-row empty-text="暂无记录"  style="width: 100%;">
              <el-table-column prop="val3" label="图书书名">
                <template slot-scope="scope">
                  <el-button  type="text" @click="checkpunish(scope.$index,scope.row)">{{scope.row.val3}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="val4" label="图书类别"></el-table-column>
              <el-table-column prop="val11" label="出版社"></el-table-column>
              <el-table-column prop="val5" label="借阅日期" sortable></el-table-column>
              <el-table-column prop="val7" label="归还日期" sortable></el-table-column>
              <el-table-column prop="val8" label="罚金类型"></el-table-column>
              <el-table-column prop="val9  " label="罚金缴纳(单位/元)" sortable></el-table-column>
          </el-table>
              <el-pagination style="text-align: right;" background layout="prev, pager, next,jumper"  :page-size="10" :total="total2"
              @current-change="returnCurrentChange">
          </el-pagination>
      </div>
    </el-row>
    <!-- 归还记录查看个人详情 -->
    <el-dialog center title="归还详情" :visible.sync ="checkdetailVisible" :close-on-press-escape="true" :close-on-click-modal="false" >
      <el-row>
        <el-col :span="4">
          <span style="font-size:16px;font-weight:700;display:block;width:20px;line-height:34px;margin:0 auto;">借还信息</span>
        </el-col>
        <el-col :span="20">
          <el-row style="padding-bottom:10px;">
              <el-col :span="12">
                <div class="borrow_right">图书名称：</div>
                <span>{{checkArr.bookname}}</span>
              </el-col>
              <el-col :span="12">
                <div class="borrow_right">读者编号：</div>
                <span>{{checkArr.userid}}</span>
              </el-col>
          </el-row>
          <el-row style="padding-bottom:10px;">
              <el-col :span="12">
                <div class="borrow_right">图书类别：</div>
                <span>{{checkArr.bookcategory}}</span>
              </el-col>
              <el-col :span="12">
                <div class="borrow_right">姓名：</div>
                <span>{{checkArr.username}}</span>
              </el-col>
          </el-row>
          <el-row style="padding-bottom:10px;">
              <el-col :span="12">
                <div class="borrow_right">出版社：</div>
                <span>{{checkArr.bookpress}}</span>
              </el-col>
              <el-col :span="12">
                <div class="borrow_right">性别：</div>
                <span>{{checkArr.usersex}}</span>
              </el-col>
          </el-row>
          <el-row style="padding-bottom:10px;">
              <el-col :span="12">
                <div class="borrow_right">单价：</div>
                <span>{{checkArr.bookprice}}￥</span>
              </el-col>
              <el-col :span="12">
                <div class="borrow_right">联系电话：</div>
                <span>{{checkArr.userphone}}</span>
              </el-col>
          </el-row>
          <el-row >
              <el-col :span="12">
                <div class="borrow_right">借阅日期：</div>
                <span>{{checkArr.borrowdate}}</span>
              </el-col>
              <el-col :span="12">
                <div class="borrow_right">归还日期：</div>
                <span>{{checkArr.backdate}}</span>
              </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div style="margin: 15px 0px;border: 1px solid #83CDC8;width:100%;"></div>
      <el-row>
        <el-col :span="20" style="font-weight:700;text-align:right;">
          <span>赔偿标准</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <span style="font-size:16px;font-weight:700;display:block;width:20px;line-height:34px;margin:0 auto;">罚金赔偿</span>
        </el-col>
        <el-col :span="20">
          <el-row style="padding-bottom:10px;">
            <el-col :span="12">
              <div style="display:inline-block;">逾期赔偿</div>
              <span style="color:red;font-size:16px;">{{checkArr.overduecom}}￥</span>
            </el-col>
            <el-col :span="12">
              <div>逾期赔偿：</div>
              <div>{{Penaltyindex.within}}天以内，赔偿金额=逾期天数*{{Penaltyindex.withinIndex}}%</div>
              <div>其余，赔偿金额=逾期天数*{{Penaltyindex.restIndex}}%</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div style="display:inline-block;">损坏赔偿</div>
              <span style="color:red;font-size:16px;">{{checkArr.damagecom}}￥</span>
            </el-col>
            <el-col :span="12">
              <div>损坏赔偿：</div>
              <span>根据管理员判断决定，赔偿金额最高书籍的单价</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click.native="checkdetailVisible=false" size="small">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" size="small">提交</el-button>
      </div> -->
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
import util from '../../common/util';
import API from '../../api/api_book.js';
export default {
  data() {
    // var checkfinenum=(rule,value,callback)=>{
    //     if (!value) {
    //       return callback(new Error('还书数量不能为空'));
    //     }
    // }
    var idCard=(rule,value,callback)=>{
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(value === ''){
          callback(new Error('读者编号不能为空'))
        }else if(!reg.test(value)){
          callback(new Error('请输入正确的读者编号'));
        }else{
          callback()
        }
    }
    return {
      total1:0,
      page1:1,
      limit1:10,
      total2:0,
      page2:1,
      limit2:10,
      pollbooks:[], //借阅记录数组
      borrowrecord:[], //归还记录数组
      loading:false,
      loading1:false,
      borrowrecordTrue:false, //归还记录表状态
      borrowtableTrue:false, //归还登记借阅图书表
      finetableTrue:false,  //罚金缴纳登记
      overduefine:false, //逾期罚金
      damagefine:false, //损坏罚金
      checkdetailVisible:false, //归还记录查看个人详情状态
      overdueDay:0,  //逾期天数
      overduemoney:0, //逾期罚金
      moneyTotal:0, //罚金总金额
      backbookMin:0, //归还图书已借出最小数量
      backbookMax:1, //归还图书已借出最大数量
      sunhuaiMin:0,  //损坏罚金标准最低
      sunhuaiMax:0,  //损坏罚金标准最高
      //损坏罚金数组
      damagebooks:{
        damagemoney1:0,
        damagemoney2:0,
        damagenum:0,
      },
      //读者编号  
      readers:{
        readerId:'',
      },
      readersrules:{
        readerId:[
          { validator: idCard,trigger: 'blur' },
        ]
      },
      //罚金缴纳图书信息
      finebooks:{
        finebookname:'',
        fineuserid:'',
        finebookid:'',
        fineborrowdate:'',
        finenewdate:'',
        finetype:'',
        finenum:'',
        fineid:'',
      },
      //罚金缴纳归还数量验证
      finebooksRules:{
        finenum:[
            // {validator: checkfinenum, trigger: 'blur'}
          ],
      },
      //查看归还记录个人详情信息
      checkArr:{
        bookname:'',
        bookid:'',
        bookcategory:'',
        bookpress:'',
        bookprice:'',
        userid:'',
        usersex:'',
        username:'',
        userphone:'',
        borrowdate:'',
        backdate:'',
        overduecom:'', //逾期赔偿
        damagecom:'',  //损坏赔偿
      },
      //罚金赔偿标准指数
      Penaltyindex:{
        within:0, 
        withinIndex:0,
        restIndex:0,
      }
    }
  },
  components: {

  },
  props:{},
  watch:{},
  computed:{},
  methods:{
    
    //归还登记分页
    borrowCurrentChange(val){
      this.page1=val;
      this.borrowsearch();
    },
    //归还记录分页
    returnCurrentChange(val){
      this.page2=val;
      this.returnsearch();
    },
    //读者信息查找按钮事件
    handleSearch(){
      let that=this;
      this.total1=0;
      this.page1=1;
      this.total2=0;
      this.page2=1;
      this.$refs.readers.validate((valid) => {
          if (valid) {
            this.borrowsearch();
            this.returnsearch();
            that.finetableTrue=false;
          }
        });
    },

    //归还登记查询未还书记录
    borrowsearch(){
      let that=this;
      let params={
        page:that.page1,
        limit:10,
        userid:that.readers.readerId,
        status:1
      };
      that.loading=true;
      API.backbookList(params).then((result)=>{
         that.loading=false;
         if(result && result.status === "101"){
          that.total1= result.data.count;
          that.pollbooks=result.data.data;
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
    //归还登记查询已还书记录
    returnsearch(){
      let that=this;
      let params={
        page:that.page2,
        limit:10,
        userid:that.readers.readerId,
        status:2
      };
      that.loading1=true;
      API.backbookrecord(params).then((result)=>{
        that.loading1=false;
        if(result && result.status === "101"){
          that.total2= result.data.count;
          that.borrowrecord=result.data.data;
          that.borrowrecordTrue=true;
         }
      },(err)=>{
        that.loading=false;
        that.$message.error({showClose:true,message:err.toString(),duration:2000});
      }).catch((error)=>{
        that.loading=false;
        that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
      })
    },

    //图书信息表格图书查看操作
    backDialog:function(index,row){
      row.val5 = (!row.val5 || row.val5 == '') ? '' : util.formatDate.format(new Date(row.val5), 'yyyy-MM-dd');
      this.finebooks.finebookname=row.val3;  //罚金缴纳图书名称
      this.finebooks.fineuserid=row.val1;  //罚金缴纳读者编号
      this.finebooks.fineborrowdate=row.val5;  //罚金缴纳借书日期
      this.finebooks.finenewdate=util.formatDate.format(new Date(), 'yyyy-MM-dd'); //罚金缴纳当前日期
      this.finebooks.finenum=row.val12; //罚金缴纳归还数量
      this.backbookMax=Number(row.val12); //罚金缴纳归还数量最大值
      this.finebooks.finebookid=row.val2;  //罚金缴纳图书编号
      this.finebooks.fineid=row.val17;  //罚金缴纳图书id
      this.finetableTrue=true;
      this.damagebooks.damagemoney1=0;
      this.damagebooks.damagemoney2=0;
      this.damagebooks.damagenum=0;
      this.getDays(util.formatDate.format(new Date(row.val6), 'yyyy-MM-dd'),util.formatDate.format(new Date(), 'yyyy-MM-dd'))
      this.finemodel(); //调用罚金标准计算公式
    },
    //图书信息表格图书遗失操作
    // lossDialog:function(index,row){
    //   this.editForm.bookname=row.bookname;
    //   this.editForm.price=12;
    //   this.lossVisible=true;
    // },
    //取消关闭图书信息表格遗失对话框
    // resetForm(formName){
    //   this.lossVisible=false;
    // },
    // editSubmit(){
    //   let para = Object.assign({}, this.editForm);
    //   console.log(para)
    //   this.lossVisible=false;
    // },

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
      let that=this;
      let params={
         idCard:that.finebooks.fineuserid,
         bookUuid:that.finebooks.finebookid,
         fine:that.moneyTotal,
         attaintMoney:that.damagebooks.damagemoney1,
         overdueMoney:that.overduemoney,
         loseMoney:that.damagebooks.damagemoney2,
         loseNum:that.damagebooks.damagenum,
         backNum:that.finebooks.finenum,
         id:that.finebooks.fineid
      }
      this.$confirm('是否归还图书?', '提示', {type: 'warning'}).then(() => {
          API.recordback(params).then((result)=>{
          if(result && result.status === "101") {
            that.$message.success({showClose:true,message:"还书成功",duration:2000});
            that.borrowsearch();
            that.returnsearch();
            that.finetableTrue=false;
          }else{
            that.$message.success({showClose:true,message:"还书失败",duration:2000});
            that.borrowsearch();
            that.returnsearch();
          }
        },(err)=>{
          that.$message.error({showClose:true,message:err.toString(),duration:2000});
        }).catch((error)=>{
          that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        })    
      }).catch(() => {
        
      });
      
    },

    //计算两个日期相差多少天
    getDays(date1,date2){
			var date1Str = date1.split("-");//将日期字符串分隔为数组,数组元素分别为年.月.日
			//根据年 . 月 . 日的值创建Date对象
			var date1Obj = new Date(date1Str[0],(date1Str[1]-1),date1Str[2]);
			var date2Str = date2.split("-");
			var date2Obj = new Date(date2Str[0],(date2Str[1]-1),date2Str[2]);
			var t1 = date1Obj.getTime();
			var t2 = date2Obj.getTime();
			var dateTime = 1000*60*60*24; //每一天的毫秒数
      var minusDays = Math.floor(((t2-t1)/dateTime));//计算出两个日期的天数差
      if(minusDays>0){
        this.overdueDay=minusDays;
      }else{
        this.overdueDay=0;
      }
    },

    //罚金标准初始化请求事件
    finemodel(){
      let that=this;
      let params={
        mangeType:"attaint_overdue"
      };
      API.setshelf(params).then((result)=>{
        if (result && result.status === "101") {
          that.Penaltyindex={
            within:result.data[0].mangeRemark1,
            withinIndex:result.data[0].mangeRemark2,
            restIndex:result.data[0].mangeRemark3,
          }
          that.sunhuaiMin=result.data[0].mangeRemark4; //损坏罚金最低标准
          that.sunhuaiMax=result.data[0].mangeRemark5; //损坏罚金最高标砖
          if(that.overdueDay>0){
            if(that.overdueDay <= result.data[0].mangeRemark1){
                that.overduemoney=that.overdueDay*result.data[0].mangeRemark2;
                that.moneyTotal=that.overduemoney;
            }else{
                that.overduemoney=that.overdueDay*result.data[0].mangeRemark3;
                that.moneyTotal=that.overduemoney;
            }
          }else{
            that.overduemoney=0;
            that.moneyTotal=that.overduemoney;
          }
        }
      },(err)=>{
        that.$message.error({showClose:true,message:err.toString(),duration:2000});
      }).catch((error)=>{
        that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
      })
    },

    //查看个人归还图书归还记录详情
    checkpunish(index,row){
      this.checkdetailVisible=true;
      console.log(row)
      this.checkArr={
        bookname:row.val3,
        bookid:row.val2,
        bookcategory:row.val4,
        bookpress:row.val11,
        bookprice:row.val14,
        userid:row.val1,
        usersex:row.val6,
        username:row.val10,
        userphone:row.val15,
        borrowdate:row.val5,
        backdate:row.val7,
        overduecom:row.val18,
        damagecom:row.val19,
      };
    },

    //归还数量判断
    backnumChange(val){
      let that=this;
      if(this.damagebooks.damagenum !=0){
        that.damagebooks.damagenum=that.damagebooks.damagenum-1;
      }
      // this.damagebooks.damagenum=Number(this.backbookMax)-Number(this.damagebooks.damagenum);
    },

    //遗失罚金数量判断
    yishinnumChange(val){
      let that=this;
      if(this.finebooks.finenum !=0){
        that.finebooks.finenum=that.finebooks.finenum-1;
      }
    },
    
    //遗失罚金金额判断
    yishimoneyChange(){
      this.moneyTotal=Number(this.damagebooks.damagemoney1)+Number(this.damagebooks.damagemoney2)+Number(this.overduemoney);
    },
    //损坏罚金判断
    demageChange(val){
      let that=this;
      if(Number(val) >= that.sunhuaiMin && Number(val) <= that.sunhuaiMax){
        that.damagebooks.damagemoney1=val;
        that.moneyTotal=Number(val)+that.overduemoney+Number(that.damagebooks.damagemoney2);
      }else{
        that.$message.error({showClose:true,message:"请输入大于等于"+that.sunhuaiMin+"到小于等于"+that.sunhuaiMax+"之间的数字",duration:2000});
        that.damagebooks.damagemoney1=0;
        that.moneyTotal=0+Number(this.overduemoney)+Number(that.damagebooks.damagemoney2);
      }
    },
  },
  created(){},
  mounted(){
    this.finemodel();
  }
}
</script>

<style  lang="scss">
// scoped
.finepayment-form .el-form-item__label{
    padding:0px;
}
.finepayment-form .el-form-item--mini.el-form-item,.finepayment-form .el-form-item--small.el-form-item{
  margin-bottom:10px;
}
.overduefine_form .el-form-item--mini.el-form-item,.overduefine_form .el-form-item--small.el-form-item{
  margin-bottom:0px;
}
.form_top .el-form-item--mini.el-form-item,.form_top .el-form-item--small.el-form-item{
    margin-bottom:0px;
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
  .line-content{
    position: absolute;
    text-align: center;
    width:100%;
  }
  .line-content div {
      font: 700 16px Helvetica, Arial, sans-serif;
      color:#666;
      // line-height: 20px;
  }
  .line-content div:after, .line-content div:before {
    background: #19BD96;
    content: "";
    height: 1px;
    position: absolute;
    top: 50%;
    width: 45%;
  }
  .line-content div:before {
    left: 10px;
  }

  .line-content div:after {
    right: 12px;
  }
  .damagefinetext{
    font-size:14px;
    float:left;
    line-height:28px;
  }
  .borrow_right{
    display:inline-block;
    width:70px;
    text-align: right;
  }
</style>
