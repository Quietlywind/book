<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>图书库存</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar top_toolbar">
        <el-form :inline="true" :model="filters" size='small' lable-width="0px">
          <el-form-item class="demo-form-inline">
              <!-- @keyup.enter.native="handleSearch" -->
            <el-input  v-model="filters.name" placeholder="请输入书名进行查询" ></el-input>
          </el-form-item>
          <el-form-item label="图书类型:" class="demo-form-inline">
                <el-select  v-model="filters.region" placeholder="请选择">
                    <el-option label="请选择" value=" "></el-option>
                    <el-option v-for="item in bookCategory" :value='item.value' :key="item.index">
                    </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="图书状态:" class="demo-form-inline">
            <el-select v-model="filters.status" placeholder="请选择">
                <el-option label="请选择" value=" "></el-option>
                <el-option v-for="item in bookeStatus" :value='item.value' :key="item.index">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出版日期" class="demo-form-inline">
              <el-date-picker type="date" placeholder="选择日期" v-model="filters.publicationDate1" ></el-date-picker>
              <span>—</span>
              <el-date-picker type="date" placeholder="选择日期" v-model="filters.publicationDate2" ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item style="float:right;">
            <el-button type="primary" @click="showAddDialog">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="books" highlight-current-row @selection-change="selsChange" style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="图书名称"></el-table-column>
        <el-table-column prop="region" label="图书类型" width="100"></el-table-column>
        <!-- width="100" -->
        <el-table-column prop="press" label="出版社"></el-table-column>
        <el-table-column prop="publishAt" label="出版日期" width="150" sortable></el-table-column>
        <el-table-column prop="bookshelf" label="书架" width="150"></el-table-column>
        <el-table-column prop="price" label="单价" width="150" sortable></el-table-column>
        <el-table-column prop="status" label="图书状态" width="150"></el-table-column>
        <el-table-column prop="stocknum" label="库存数量" width="150" sortable></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button type="danger"  size="small" @click="delBook(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--表格分页工具条-->
      <el-col :span="24" class="toolbar">
          <!--  @click="batchDeleteBook" -->
          <!-- @current-change="handleCurrentChange" -->
        <el-button type="danger" :disabled="this.sels.length===0" @click="batchDeleteBook">批量删除</el-button>
        <el-pagination background layout="prev, pager, next,jumper"  :page-size="10" :total="total" @current-change="handleCurrentChange"
                       style="float:right;">
        </el-pagination>
      </el-col>
      <!-- 图书编辑弹框 -->
      <el-dialog center title="编辑" :visible.sync ="editFormVisible" :close-on-press-escape="true" :close-on-click-modal="false" width="30%" :before-close="closeDialog">
        <el-form :model="editForm" status-icon label-width="100px" :rules="editFormRules" ref="editForm">
          <el-form-item label="图书名称" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="图书类型:" prop="region">
                <el-select  v-model="editForm.region" placeholder="请选择">
                    <el-option label="请选择" value=" "></el-option>
                    <el-option v-for="item in bookCategory" :value='item.value' :key="item.index">
                      {{item.name}}
                    </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="出版社:" prop="press">
            <el-input v-model="editForm.press" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出版日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.publishAt"></el-date-picker>
          </el-form-item>
          <el-form-item label="单价:" prop="price">
            <el-input v-model="editForm.price" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="图书状态:" prop="status">
            <el-select v-model="editForm.status" placeholder="请选择">
                <el-option label="请选择" value=" "></el-option>
                <el-option v-for="item in bookeStatus" :value='item.value' :key="item.index">
                  {{item.name}}
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
      <el-dialog title="新增" :visible.sync ="addFormVisible" :close-on-click-modal="false" width="30%">
        <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
          <el-form-item label="图书名称" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="图书类型:" prop="region">
                <el-select  v-model="addForm.region" placeholder="请选择">
                    <el-option label="请选择" value=" "></el-option>
                    <el-option v-for="item in bookCategory" :value='item.value' :key="item.index">
                      {{item.name}}
                    </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="出版社:" prop="press">
            <el-input v-model="addForm.press" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出版日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="addForm.publishAt"></el-date-picker>
          </el-form-item>
          <el-form-item label="单价:" prop="price">
            <el-input v-model="addForm.price" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="图书状态:" prop="status">
            <el-select v-model="addForm.status" placeholder="请选择">
                <el-option label="请选择" value=" "></el-option>
                <el-option v-for="item in bookeStatus" :value='item.value' :key="item.index">
                  {{item.name}}
                </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
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
            region:'',  //图书类别
            status:'',  //图书状态
            publicationDate1:'',  //出版日期起始日期
            publicationDate1:'',  //出版日期结束日期
        },
        books:[],
        total:0,
        page:1,
        limit:10,
        loading:false,
        sels:[],//列表选中列  

        //编辑相关数据
        editFormVisible:false,//编辑界面是否显示
        editFormRules:{
          name:[
            {required:true,message:"请输入图书名称",trigger:'blur'}
          ],
          // region:[
          //   {required:true,message:"请选择图书类型",trigger: 'change'}
          // ],
          press:[
            {required:true,message:"请输入出版社名称",trigger:'blur'}
          ],
          price:[
            {required:true,message:"请输入单价",trigger:'blur'}
          ],
          publishAt:[
            {type:'data',required:true,message:'请选择出版时间',trigger:' change'}
          ],
          status:[
            {required:true,message:'请选择图书状态',trigger:' change'}
          ]
        },
        editForm:{
            id:0,
            name:'',
            region:'',
            press:'',
            publishAt:'',
            price:'',
            status:'',
        },

        //新增相关数据
        addFormVisible:false,//新增界面是否显示
        addLoading:false,
        addFormRules:{

        },
        addForm:{

        },
        //模拟下拉数据-图书状态
        bookeStatus:[{
            name:'在库',
            value:'在库'
            },
            {
            name:'变卖',
            value:'变卖'
            },
            {
            name:'遗失',
            value:'遗失'
            }
        ],
        //模拟下拉数据-图书类别
        bookCategory:[
            {
            name:'小说',
            value:'小说'
            },
            {
            name:'军事',
            value:'军事'
            },
            {
            name:'心理',
            value:'心理'
            },
            {
            name:'儿童',
            value:'儿童'
            },
            {
            name:'文艺',
            value:'文艺'
            },
            {
            name:'哲学',
            value:'哲学'
            },
        ]
    }
  },
  components: {

  },
  props:{},
  watch:{},
  computed:{},
  methods:{
    handleCurrentChange(val){
      this.page=val;
      this.search();
    },
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
        name:that.filters.name
      };
      that.loading=true;
      API.findList(params).then((result)=>{
        that.loading=false;
        if(result && result.books){
          that.total= result.total;
          that.books=result.books;
        }
      },(err)=>{
        that.loading=false;
        that.$message.error({showClose:true,message:err.toString(),duration:2000});
      }).catch((error)=>{
        that.loading=false;
        that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
      })
    },
    
    selsChange:function(sels){
      this.sels=sels;
    },
    //删除单个图书
    delBook:function(index,row){
        let that = this;
        this.$confirm('确认删除该图书吗?', '提示', {type: 'warning'}).then(() => {
          that.loading = true;
          API.remove(row.id).then(function (result) {
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
    //显示图书编辑界面
    showEditDialog:function(index,row){
      this.editFormVisible=true;
      this.editForm=Object.assign({},row);
      this.$refs.editForm.clearValidate();
    },
    // //关闭对话框前的回调
    closeDialog(){
      this.editFormVisible=false;
      // this.resetForm('editForm')
    },
    //取消关闭编辑对话框
    resetForm(formName){
      this.editFormVisible=false;
      // this.$refs[formName].clearValidate();
    },  
    //图书编辑界面提交
    editSubmit:function(){
       let that=this;
       this.$refs.editForm.validate((valid)=>{
         if(valid){
           that.loading=true;
           let para=Object.assign({},this.editForm);
           para.publishAt = (!para.publishAt || para.publishAt == '') ? '' : util.formatDate.format(new Date(para.publishAt), 'yyyy-MM-dd');
           API.update(para.id,para).then((result)=>{
             that.loading=false;
            if(result && parseInt(result.status)===0){
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
          name:'',
          region:'',
          press:'',
          publishAt:'',
          price:'',
          status:'',
        };
    },
    //图书新增界面提交
    addSubmit:function(){
        let that = this;
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            that.loading = true;
            let para = Object.assign({}, this.addForm);
            para.publishAt = (!para.publishAt || para.publishAt === '') ? '' : util.formatDate.format(new Date(para.publishAt), 'yyyy-MM-dd');
            API.add(para).then(function (result) {
              that.loading = false;
              if (result && parseInt(result.errcode) === 0) {
                that.$message.success({showClose: true, message: '新增成功', duration: 2000});
                that.$refs['addForm'].resetFields();
                that.addFormVisible = false;
                that.search();
              } else {
                that.$message.error({showClose: true, message: '修改失败', duration: 2000});
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
    }
  },
  created(){

  },
  mounted(){
    this.handleSearch()
  }
}
</script>

<style>
 .top_toolbar{
    box-shadow: 1px 1px 5px 0 rgba(0,0, 0, .3);
    margin-bottom: 10px;
    padding:10px;background-color:#fff;
 }
 .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
     margin-bottom: 0px;
 }
 .demo-form-inline .el-form-item__content .el-input{
    max-width: 150px;
 }
</style>
