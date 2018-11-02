<template>
  <el-row class="warp">
    <!-- <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>图书库存</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col> -->

    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar top_toolbar">
        <el-form :inline="true" :model="filters" size='small' label-width="70px">
          <el-form-item class="demo-form-inline">
            <el-input  v-model="filters.name" placeholder="请输入书名\图书编码进行查询"  clearable></el-input>
          </el-form-item>
          <el-form-item label="图书类别" class="demo-form-inline">
                <el-select  v-model="filters.region" placeholder="请选择">
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="item in bookcategory" :value='item.id' :key="item.id" :label="item.mangeName">
                        {{item.mangeName}}
                    </el-option>
                </el-select>
          </el-form-item>
           <el-form-item class="demo-form-inline" label="出版社">
            <el-input  v-model="filters.press" placeholder="请输入出版社进行查询" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item label="图书状态:" class="demo-form-inline">
            <el-select v-model="filters.status" placeholder="请选择">
                <el-option label="请选择" value=" "></el-option>
                <el-option v-for="item in bookeStatus" :value='item.value' :key="item.index">
                </el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="出版日期" class="demo-form-inline">
              <el-date-picker type="date" placeholder="选择日期" v-model="filters.publicationDate1" ></el-date-picker>
              <span>—</span>
              <el-date-picker type="date" placeholder="选择日期" v-model="filters.publicationDate2" ></el-date-picker>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item style="float:right;">
            <el-button type="primary" @click="showAddDialog">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24" class="center_update">
        <el-button type="primary"  size="small" icon="el-icon-edit" :disabled="this.sels.length===0" 
        @click="batcheditbook">批量修改</el-button>
      </el-col>
      <!--图书列表-->
      <el-table :data="books" border highlight-current-row @selection-change="selsChange" style="width: 100%;">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column prop="bookUuid" label="图书编码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bookName" label="图书名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bookCategory" label="图书类别"></el-table-column>
        <el-table-column prop="bookPublisher" label="出版社"></el-table-column>
        <el-table-column prop="shelfName" label="书架" ></el-table-column>
        <el-table-column prop="bookPrice" label="单价" sortable></el-table-column>
        <el-table-column prop="bookRemain" label="库存数量" sortable></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button type="text"  size="small" @click="delBook(scope.$index,scope.row)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--表格分页工具条-->
      <el-col :span="24" class="toolbar">
        <!-- <el-button type="danger" :disabled="this.sels.length===0" @click="batchDeleteBook">批量删除</el-button> -->
        <el-pagination background layout="total,prev, pager, next,jumper"  :page-size="10" :total="total" @current-change="handleCurrentChange"
                       style="float:right;">
        </el-pagination>
      </el-col>
      <!-- 图书编辑弹框 -->
      <el-dialog center title="编辑图书" :visible.sync ="editFormVisible" :close-on-press-escape="true" :close-on-click-modal="false" width="30%" :before-close="closeDialog">
        <el-form :model="editForm" size="small" status-icon label-width="100px"  :rules="editFormRules" ref="editForm">
            <el-form-item label="图书编码" prop="bookUuid">
              <span>{{editForm.bookUuid}}</span>
            </el-form-item>
            <el-form-item label="图书名称" prop="bookName">
              <el-input v-model="editForm.bookName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="图书类别:" prop="bookCategory">
                  <el-select  style="width: 100%;" v-model="editForm.bookCategory" placeholder="请选择">
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="item in bookcategory" :value='item.id' :key="item.id" :label="item.mangeName">
                        {{item.mangeName}}
                    </el-option>
                  </el-select>
            </el-form-item>
            <el-form-item label="出版社:" prop="bookPublisher">
              <el-input v-model="editForm.bookPublisher" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="单价:" prop="bookPrice">
              <el-input v-model.number="editForm.bookPrice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="图书书架" prop="shelfName">
              <el-select  v-model="editForm.shelfName" placeholder="请选择" clearable>
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="item in bookshelfname" :value='item.id' :key="item.index" :label="item.shelfname">
                      {{item.shelfname}}
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="层数" prop="shelfNum">
              <el-select  v-model="editForm.shelfNum" placeholder="请选择" clearable>
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="item in bookshelfnum" :value='item.id' :key="item.index" :label="item.shelfnum">
                    {{item.shelfnum}}
                  </el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="resetForm('editForm')" size="small">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" size="small">提交</el-button>
        </div>
      </el-dialog>

      <!--图书新增弹框-->
      <el-dialog center title="新书上架" :visible.sync ="addFormVisible" :close-on-click-modal="false" width="30%">
        <el-form :model="addForm" size="small" label-width="100px" :rules="addFormRules" ref="addForm">
          <el-form-item label="图书编码" prop="bookUuid">
            <el-input v-model="addForm.bookUuid" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="图书名称" prop="bookName">
            <el-input v-model="addForm.bookName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="图书类别:" prop="bookCategory">
                <el-select  style="width: 100%;" v-model="addForm.bookCategory" placeholder="请选择">
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="item in bookcategory" :value='item.id' :key="item.id" :label="item.mangeName">
                        {{item.mangeName}}
                    </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="出版社:" prop="bookPublisher">
            <el-input v-model="addForm.bookPublisher" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="单价:" prop="bookPrice">
            <el-input v-model.number="addForm.bookPrice" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="图书书架" prop="shelfName">
            <el-select  v-model="addForm.shelfName" placeholder="请选择" clearable>
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in bookshelfname" :value='item.id' :key="item.index" :label="item.shelfname">
                    {{item.shelfname}}
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="层数" prop="shelfNum">
            <el-select  v-model="addForm.shelfNum" placeholder="请选择" clearable>
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in bookshelfnum" :value='item.id' :key="item.index" :label="item.shelfnum">
                  {{item.shelfnum}}
                </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click.native="addFormVisible = false">取消</el-button>
          <el-button size="small" type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>

      <!--图书处理弹框-->
      <el-dialog center title="图书处理" :visible.sync ="handleFormVisible" :close-on-click-modal="false" width="30%">
        <el-form :model="handleForm" size="small" label-width="100px" :rules="handleFormRules" ref="handleForm">
          <el-form-item label="" prop="bookName">
            图书<span style="color:red;font-size:16px;">{{handleForm.bookName}}</span>一共<span style="color:red;font-size:16px;">{{handleForm.bookStorage}}</span>本
          </el-form-item>
          <el-form-item label="处理类型:" prop="dealType">
                <el-select v-model="handleForm.dealType" placeholder="请选择">
                    <el-option label="请选择" value=""></el-option>
                   <el-option v-for="item in handlebooks" :value='item.val' :key="item.val" :label="item.name">
                        {{item.name}}
                    </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="处理本数:" prop="dealNum">
            <el-input-number v-model="handleForm.dealNum" :min="mindealNum" :max="maxdealNum"></el-input-number><span style="padding-left:10px">本</span>
          </el-form-item>
          <el-form-item label="备注:" prop="dealRemark">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="handleForm.dealRemark" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click.native="handleFormVisible = false">取消</el-button>
          <el-button size="small" type="primary" @click.native="dealSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>

      <!--批量修改书架/层数 弹框-->
      <el-dialog center title="批量修改" :visible.sync ="batchbookVisible" :close-on-click-modal="false" width="400px">
        <el-form :model="batchForm" size="small" label-width="100px"  ref="batchForm">
          <el-form-item label="图书书架" prop="shelfName">
            <el-select  v-model="batchForm.shelfName" placeholder="请选择" clearable>
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in bookshelfname" :value='item.id' :key="item.index" :label="item.shelfname">
                    {{item.shelfname}}
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="层数" prop="shelfNum">
            <el-select  v-model="batchForm.shelfNum" placeholder="请选择" clearable>
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in bookshelfnum" :value='item.id' :key="item.index" :label="item.shelfnum">
                  {{item.shelfnum}}
                </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click.native="batchbookVisible = false">取消</el-button>
          <el-button size="small" type="primary" @click.native="batchSubmit" >提交</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
import util from '../../common/util'
import API from '../../api/api_book';

export default {
  data() {
    // var validateName=(rule,value,callback)=>{
    //   if(value==""){
    //     callback(new Error("请输入图书名称"))
    //   }
    // }
    return {
      
        filters:{
            name:'',  //书名
            bookid:'', //图书编码
            region:'',  //图书类别
            press:'', //出版社
            status:'',  //图书状态
            publicationDate1:'',  //出版日期起始日期
            publicationDate1:'',  //出版日期结束日期
        },
        books:[],
        total:0,
        page:1,
        limit:10,
        loading:false,
        batchbookVisible:false, //批量修改状态
        sels:[],//列表选中列  
        ids:'',
        //编辑相关数据
        editFormVisible:false,//编辑界面是否显示
        editFormRules:{
          bookName:[
            {required:true,message:"请输入图书名称",trigger:'blur'}
          ],
          bookCategory:[
            {required:true,message:"请选择图书类别",trigger:'change'}
          ],
          bookPublisher:[
            {required:true,message:"请输入出版社名称",trigger:'blur'}
          ],
          bookPrice:[
            {required:true,message:"请输入单价"},
            { type: 'number', message: '单价必须为数字值'}
          ],
          shelfName:[
            {required:true,message:'请选择图书书架',trigger:'change'}
          ],
          shelfNum:[
            {required:true,message:'请选择图书书架',trigger:'change'}
          ],
        },
        editForm:{
            id:'',
            bookName:'',
            bookCategory:'',
            bookPublisher:'',
            bookPrice:'',
            shelfName:'',
            shelfNum:'',
        },

        //新增相关数据
        addFormVisible:false,//新增界面是否显示
        addLoading:false,
        addFormRules:{
          bookUuid:[
            {required:true,message:"请输入图书编码",trigger:'blur'}
          ],
          bookName:[
            {required:true,message:"请输入图书名称",trigger:'blur'}
          ],
          bookCategory:[
            {required:true,message:"请选择图书类别",trigger:'change'}
          ],
          bookPublisher:[
            {required:true,message:"请输入出版社名称",trigger:'blur'}
          ],
          bookPrice:[
            {required:true,message:"请输入单价"},
            { type: 'number', message: '单价必须为数字'}
          ],
          shelfName:[
            {required:true,message:'请选择图书书架',trigger:'change'}
          ],
          shelfNum:[
            {required:true,message:'请选择图书书架',trigger:'change'}
          ],
        },
        addForm:{
            bookUuid:'',
            bookName:'',
            bookCategory:'',
            bookPublisher:'',
            bookPrice:'',
            shelfName:'',
            shelfNum:'',
        },
        //处理相关数据
        handleFormVisible:false, //图书处理界面是否显示
        handleForm:{
          id:'', //图书id
          bookUuid:'', //图书编码
          bookName:'', //处理图书名称
          bookStorage:'', //库存
          dealNum:'',  //处理数量
          dealRemark:'', //处理备注
          dealType:'', //处理类型
        },
        maxdealNum:0,
        mindealNum:1,
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
        handleFormRules:{
          dealType:[
            {required:true,message:"请选择图书类别",trigger:'change'}
          ],
          dealNum:[
            {required:true,message:"请输入处理本数"},
            { type: 'number', message: '处理本数必须为数字'}
          ],
        },
        //批量修改
        batchForm:{
          shelfname:'',
          shelfnum:'',
        },

        //模拟下拉数据-图书状态
        bookeStatus:[],
        //模拟下拉数据-图书类别
        bookcategory:[],
        bookshelfname:[], //图书书架
        bookshelfnum:[],  //层数
    }
  },
  components: {

  },
  props:{},
  watch:{},
  computed:{},
  methods:{

    //表格分页事件
    handleCurrentChange(val){
      this.page=val;
      this.search();
    },
    //查询按钮事件
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
        bookName:that.filters.name,
        // bookUuid:that.filters.name,
        bookCategory:that.filters.region,
        bookPublisher:that.filters.press,
      };
      that.loading=true;
      API.stockbookList(params).then((result)=>{
        that.loading=false;
        if(result && result.data){
          that.total= result.data.count;
          that.books=result.data.data;
        }
      },(err)=>{
        that.loading=false;
        that.$message.error({showClose:true,message:err.toString(),duration:2000});
      }).catch((error)=>{
        that.loading=false;
        that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
      })
    },

    //批量修改选中数据
    selsChange:function(sels){
      this.sels=sels;
      this.ids = this.sels.map(item => item.id).toString();
    },

    //显示处理图书界面
    delBook:function(index,row){
        this.handleFormVisible=true;
        console.log(row)
        this.handleForm={
          id:row.id, //图书id
          bookUuid:row.bookUuid, //图书编码
          bookName:row.bookName, //图书名称
          bookStorage:row.bookStorage, //库存数量
          dealNum:row.bookStorage,  //处理数量
          dealRemark:'', //处理备注
          dealType:'', //处理类型
        };
        this.maxdealNum=row.bookStorage;
        // this.$refs['handleForm'].resetFields();
    },
    //图书处理界面提交
    dealSubmit(){
      let that=this;
      this.$refs.handleForm.validate((valid)=>{
        if(valid){
            that.loading=true;
            let para={
              id:that.handleForm.id,
              bookUuid:that.handleForm.bookUuid,
              dealType:that.handleForm.dealType,
              dealNum:that.handleForm.dealNum,
              dealRemark:that.handleForm.dealRemark,
            }
            API.bookdeal(para).then((result)=>{
              that.loading=false;
            if(result && result.status === "101"){
              that.$message.success({showClose: true, message: '处理图书成功', duration: 2000});
              that.$refs['handleForm'].resetFields();
              that.handleFormVisible = false;
              that.search();
            }else{
              that.$message.error({showClose: true, message: '修改失败', duration: 2000});
            }
            },(err)=>{
              that.loading=false;
              that.$message.error({showClose: true, message: err.toString(), duration: 2000});
            }).catch((err)=>{
              that.loading = false;
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
            })
        }
      }) 
    },

    //显示图书编辑界面
    showEditDialog:function(index,row){
      let that=this;
      that.editFormVisible=true;
      // this.editForm = Object.assign({}, row);
      that.editForm={
        id:row.id,
        bookName:row.bookName,
        bookCategory:String(row.bookCategory),
        bookPublisher:row.bookPublisher,
        bookPrice:row.bookPrice,
        shelfName:row.shelfName,
        shelfNum:row.shelfNum,
      };
      
      // this.$refs.editForm.clearValidate();
    },
    //关闭编辑对话框前的回调
    closeDialog(){
      this.editFormVisible=false;
      // this.resetForm('editForm')
      // this.$refs.editForm.clearValidate();
    },
    //取消关闭编辑对话框
    resetForm(formName){
      this.editFormVisible=false;
      // this.$refs.editForm.clearValidate();
      // this.$refs[formName].clearValidate();
    },  
    //图书编辑界面提交
    editSubmit:function(){
       let that=this;
       this.$refs.editForm.validate((valid)=>{
         if(valid){
           that.loading=true;
           let para=Object.assign({},this.editForm);
           API.editbookstock(para).then((result)=>{
             that.loading=false;
            if(result && result.status === "101"){
              that.$message.success({showClose: true, message: '修改成功', duration: 2000});
              that.$refs['editForm'].resetFields();
              that.editFormVisible = false;
              that.search();
            }else{
              that.$message.error({showClose: true, message: '修改失败', duration: 2000});
            }
           },(err)=>{
              that.loading=false;
             that.$message.error({showClose: true, message: err.toString(), duration: 2000});
           }).catch((err)=>{
             that.loading = false;
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
           })
         }
       }) 
    },

    //显示图书新增界面
    showAddDialog:function(){
      this.addFormVisible = true;
        this.addForm = {
          bookUuid:'',
          bookName:'',
          bookCategory:'',
          bookPublisher:'',
          bookPrice:'',
          shelfName:'',
          shelfNum:'',
        };
        // this.$nextTick(() => {
          
        // });
    },
    //图书新增界面提交
    addSubmit:function(){
        let that = this;
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            that.loading = true;
            let para = Object.assign({}, this.addForm);
            API.addbookstock(para).then(function (result) {
              that.loading = false;
              if (result && result.status === "101") {
                that.$message.success({showClose: true, message: '新书上架成功', duration: 2000});
                that.$refs['addForm'].resetFields();
                that.addFormVisible = false;
                that.search();
              } else {
                that.$message.error({showClose: true, message: '新书上架失败', duration: 2000});
              }
            }, function (err) {
              that.loading = false;
              that.$message.error({showClose: true, message: err.toString(), duration: 2000});
            }).catch(function (error) {
              that.loading = false;
              console.log(error);
              that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
            });
          }
        });
    },
    //批量删除图书
    batchDeleteBook:function(){
      let ids = this.sels.map(item => item.id).toString();
        let that = this;
        this.$confirm('确认删除选中图书吗？', '提示', {
          type: 'warning'
        }).then(() => {
          that.loading = true;
          API.removeBatch(ids).then(function (result) {
            that.loading = false;
            if (result && parseInt(result.errcode) === 0) {
              that.$message.success({showClose: true, message: '删除成功', duration: 1500});
              that.search();
            }
          }, function (err) {
            that.loading = false;
            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
          }).catch(function (error) {
            that.loading = false;
            console.log(error);
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          });
        }).catch(() => {

        });
    },
    //批量修改书架/层数
    batcheditbook(){
      this.batchbookVisible = true;
      this.batchForm={
          shelfName:'',
          shelfNum:'',
      };
    },
    //批量修改书架/层数页面提交
    batchSubmit(){
        let that = this;
        let para={
            ids:that.ids,
            shelfName:that.batchForm.shelfName,
            shelfNum:that.batchForm.shelfNum,
        };
        API.bookbatch(para).then(function (result) {
          that.loading = false;
          if (result && result.status === "101") {
            that.$message.success({showClose: true, message: '批量修改成功', duration: 2000});
            that.$refs['batchForm'].resetFields();
            that.batchbookVisible = false;
            that.search();
          } else {
            that.$message.error({showClose: true, message: '批量修改失败', duration: 2000});
          }
        }, function (err) {
          that.loading = false;
          that.$message.error({showClose: true, message: err.toString(), duration: 2000});
        }).catch(function (error) {
          that.loading = false;
          console.log(error);
          that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        });
    },

    //记录查询页请求图书类别
    searchbookcategory(){
      let that=this;
      let params={
        mangeType:"book_type"
      };
      API.setshelf(params).then((result)=>{
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
    //初始化图书书架数据
    searchbookshelf(){
      let that=this;
      let params={
        mangeType:"shelfs"
      };
      API.setshelf(params).then((result)=>{
        if (result && result.status === "101") {
            for(var i=0;i<result.data[0].mangeRemark1;i++){
              that.bookshelfname.push({
                id:(i+1),
                shelfname:"第"+(i+1)+"个书架"
              })
            }
            for(var j=0;j<result.data[0].mangeRemark2;j++){
              that.bookshelfnum.push({
                id:(j+1),
                shelfnum:"第"+(j+1)+"层"
              })
            }  
        } else {
          that.$message.error({showClose: true, message: '请求书架信息失败', duration: 2000});
        }
      },(err)=>{
        that.$message.error({showClose:true,message:err.toString(),duration:2000});
      }).catch((error)=>{
        that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
      })
    },
  },
  created(){

  },
  mounted(){
    this.handleSearch();
    this.searchbookcategory();
    this.searchbookshelf();
    // this.$nextTick(() => {
    //     this.$refs.editForm.clearValidate();
    // });
    
  }
}
</script>

<style>
 .top_toolbar{
    box-shadow: 1px 1px 5px 0 rgba(0,0, 0, .3);
    padding:10px;
    background-color:#fff;
 }
 .center_update{
   margin:10px 0px;
 }
 .center_update a{
   
 }
 .top_toolbar .el-form-item--mini.el-form-item,.top_toolbar .el-form-item--small.el-form-item{
     margin-bottom: 0px;
 }
 .demo-form-inline .el-form-item__content .el-input{
    max-width: 180px;
 }
</style>
