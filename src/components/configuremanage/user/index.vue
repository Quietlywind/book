<template>
  <div class="wrapper">
      <el-row :gutter="20">
        <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
            <el-col :span="24">
                <el-col :xl="4" :lg="5" :md="6" :sm="8">
                    <el-input size="small" placeholder="请输入读者编号/姓名" v-model="readerInput" clearable>
                    </el-input>
                </el-col>
                <span style="font-size:14px;line-height: 32px;float:left;padding-left: 10px;">所属部门</span>
                <el-col :xl="4" :lg="5" :md="6" :sm="8">
                    <el-input size="small" placeholder="请输入部门" v-model="readerdepartment" clearable>
                    </el-input>
                </el-col>
                <el-col :xl="2" :lg="2" :md="3" :sm="6">
                    <el-button size="small" type="primary" @click="handleSearch">查询</el-button>
                </el-col>
                <el-col :xl="13" :lg="10" :md="6" :sm="8" style="text-align:right;">
                    <el-button size="small" @click="addshowDiglog" type="primary">新增</el-button>
                    <el-button size="small" @click="batchimport" type="primary">批量导入</el-button>
                </el-col>
            </el-col>
            <el-col :span="24" style="margin-top:2%;" class="usertable">
                <!--列表-->
                <el-table :data="users" size="small" border style="width: 100%;">
                  <el-table-column prop="userid" label="读者编号"></el-table-column>
                  <el-table-column prop="username" label="读者姓名"></el-table-column>
                  <el-table-column label="读者性别">
                    <template slot-scope="scope">
                      <span v-if="scope.row.usersex==1">男</span>
                      <span v-else-if="scope.row.usersex==0" >女</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="userphone" label="读者电话" ></el-table-column>
                  <el-table-column prop="userdepartment" label="所属部门" ></el-table-column>
                  <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" @click="editshowDiglog(scope.$index,scope.row)">编辑</el-button>
                      <!-- <el-button type="text" @click="deluser(scope.$index,scope.row)">删除</el-button> -->
                      <el-switch style="padding-bottom:5px;" @change="delchange(scope.$index,scope.row)" 
                       active-text="启用" inactive-text="禁用" active-color="#409EFF" inactive-color="#dadde5" 
                       v-model="scope.row.userstatus">
                      </el-switch>
                    </template>
                  </el-table-column>
                </el-table>
                <!--表格分页工具条-->
                <el-col :span="24" v-show="this.users.length !=0">
                    <el-pagination background layout="total, prev, pager, next,jumper"  :page-size="10" :total="total" 
                    @current-change="handleCurrentChange" style="float:right;">
                    </el-pagination>
                </el-col>
            </el-col>
        </el-col>
        <!--用户新增弹框-->
          <el-dialog center class="userDialog" custom-class="userdialog" title="新增" :visible.sync ="adduserFormVisible" :close-on-click-modal="false" >
            <el-form :model="adduserForm" size="small" label-width="80px" :inline="false"  ref="adduserForm" :rules="adduserRules">
              <el-form-item label="读者编号" prop="userid">
                <el-col :span="20" style="padding-left:0px;">
                  <el-input v-model="adduserForm.userid" auto-complete="off" clearable></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="读者姓名" prop="username">
                <el-col :span="20" style="padding-left:0px;">
                  <el-input v-model="adduserForm.username" auto-complete="off" clearable></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="读者性别" prop="usersex">
                <el-col :span="20" style="padding-left:0px;">
                  <el-radio v-model="adduserForm.usersex" label="1">男</el-radio>
                  <el-radio v-model="adduserForm.usersex" label="0">女</el-radio>
                </el-col>
              </el-form-item>
              <el-form-item label="读者电话" prop="userphone">
                <el-col :span="20" style="padding-left:0px;">
                  <el-input v-model="adduserForm.userphone" auto-complete="off" clearable></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="所属部门" prop="userdepartment">
                <el-col :span="20" style="padding-left:0px;">
                  <el-input v-model="adduserForm.userdepartment" auto-complete="off" clearable></el-input>
                </el-col>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" @click.native="adduserFormVisible = false">取消</el-button>
              <el-button type="primary" size="small" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
          </el-dialog>
        <!--用户编辑弹框  -->
          <el-dialog center class="userDialog" custom-class="userdialog" title="编辑" :visible.sync ="edituserFormVisible" :close-on-click-modal="false" >
            <el-form :model="edituserForm" size="small" label-width="80px"  ref="edituserForm" :rules="edituserRules">
              <el-form-item label="读者编号" prop="userid">
                <el-col :span="20" style="padding-left:0px;">
                  <span>{{edituserForm.userid}}</span>
                </el-col>
              </el-form-item>
              <el-form-item label="读者姓名" prop="username">
                <el-col :span="20" style="padding-left:0px;">
                  <el-input v-model="edituserForm.username" auto-complete="off" clearable></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="读者性别" prop="usersex">
                <el-col :span="20" style="padding-left:0px;">
                  <el-radio v-model="edituserForm.usersex" label="1">男</el-radio>
                  <el-radio v-model="edituserForm.usersex" label="0">女</el-radio>
                </el-col>
              </el-form-item>
              <el-form-item label="读者电话" prop="userphone">
                <el-col :span="20" style="padding-left:0px;">
                  <el-input v-model="edituserForm.userphone" auto-complete="off" clearable></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="所属部门" prop="userdepartment">
                <el-col :span="20" style="padding-left:0px;">
                  <el-input v-model="edituserForm.userdepartment" auto-complete="off" clearable></el-input>
                </el-col>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" @click.native="edituserFormVisible = false">取消</el-button>
              <el-button type="primary" size="small" @click.native="editSubmit">提交</el-button>
            </div>
          </el-dialog>
           <!--批量导入用户信息弹框 :rules="edituserForm"-->
          <el-dialog center class="userDialog" custom-class="userdialog" title="批量导入用户" :close-on-press-escape="true" :visible.sync ="batchimportVisible" :close-on-click-modal="false" :before-close="closeDialog">
            <div style="width: 80%;margin:auto;text-align: center;">
                <span style="float:left;line-height:40px;padding-right: 25px;">文件上传</span>
                <el-upload style="padding-right: 80px;margin-bottom: 10px;" ref="upload" accept=".xls,.xlsx" class="upload-demo" action="/userinfo/uploadUsers" 
                :on-change="uploadChange" :on-success="uploadsuccess" :limit="1" :before-upload="uploadbefore">
                  <el-button  type="primary" icon="el-icon-upload">点击上传</el-button>
                </el-upload>
                <a href="../../../../static/userModule.xls" download="用户批量导入表">点击下载导入模板</a>
                <div v-show="chongfu1" style="text-align: left;padding:2px 0;">
                  <span>库中有重复数据</span>
                </div>
                <div v-show="chongfu2" style="text-align: left;padding:2px 0;">
                  <span>导入表中有重复数据</span>
                </div>
                <div v-show="zhengque" style="text-align: left;padding:2px 0;">
                  <span>正确数据{{filereal}}条</span>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click.native="batchqxdialog">取消</el-button>
                <el-button type="primary" size="small" @click.native="uploadSubmit">提交</el-button>
              </div>
          </el-dialog>
      </el-row>
  </div>
</template>

<script>
import util from '../../../common/util';
import API from '../../../api/api_book';
export default {
  components:{},
  props:{},
  data(){
    const idCard=(rule,value,callback)=>{
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(value === ''){
          callback(new Error('读者编号不能为空'))
        }else if(!reg.test(value)){
          callback(new Error('请输入正确的读者编号'));
        }else{
          callback()
        }
    }
    const phoneNumber=(rule,value,callback)=>{
      if(value === ''){
        callback(new Error('手机号码不能为空'))
      }else if (value && (!(/^[1][34578]\d{9}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)) {
          callback(new Error('手机号码不符合规范'))
      } else {
        callback()
      }
    }

    return {
      users:[],
      total:0,
      page:1,
      limit:10,
      loading:false,
      readerInput:'', //用户管理查询值
      readerdepartment:'', //用户管理所属部门查询值
      batchimportVisible:false, //批量导入界面是否显示
      //编辑用户数据
      edituserFormVisible:false,//编辑用户界面是否显示
      edituserForm:{
          id:0,
          username:'',
          userid:'',
          usersex:'',
          userphone:'',
          userdepartment:''
      },
      edituserRules:{
        // userid:[
        //   {required: true, validator: idCard,trigger: 'blur' },
        // ],
        username:[
          { required: true, message: '请输入读者姓名', trigger: 'blur' },
        ],
        userphone:[
          {required: true, validator: phoneNumber,trigger: 'blur' },
        ],
        userdepartment:[
          { required: true, message: '请输入所属部门', trigger: 'blur' },
        ]
      },
      //新增用户数据
      adduserFormVisible:false,//新增界面是否显示
      addLoading:false,
      adduserForm:{
        userid:'',
        username:'',
        usersex:'',
        userphone:'',
        userdepartment:''
      },
      adduserRules:{
        userid:[
          { required: true,validator: idCard,trigger: 'blur' },
        ],
        username:[
          { required: true, message: '请输入读者姓名', trigger: 'blur' },
        ],
        userphone:[
          { required: true,validator: phoneNumber,trigger: 'blur' },
        ],
        userdepartment:[
          { required: true,required: true, message: '请输入所属部门', trigger: 'blur' },
        ]
      },
      fileList:[], //文件上传临时数组
      filerror:'', //文件上传错误数组
      filerror1:'', //文件上传错误数组
      filereal:0,
      chongfu1:false,
      chongfu2:false,
      zhengque:false,
    }
  },
  watch:{},
  computed:{},
  methods:{
    //表格分页事件
    handleCurrentChange(val){
      this.page=val;
      this.search();
    },
    //用户列表查询事件
    handleSearch(){
      this.total=0;
      this.page=1;
      this.search();
    },
    //搜索事件
    search(){
      let that=this;
      let params={
        page:that.page,
        limit:10,
        userid:that.readerInput,
        userdepartment:that.readerdepartment,
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
    //批量导入事件
    batchimport(){
      this.batchimportVisible=true;
    },
    //文件上传changge
    uploadChange(file,fileList){

    },
    //文件上传成功时的钩子
    uploadsuccess :function(response,file,fileList){
      let that=this;
      that.zhengque=true;
      that.filereal=response.data.realList.length;
      that.fileList=response.data.realList;
      if(response.data.errorForDbList>0){
        that.chongfu1=true;
      }
      if(response.data.errorForExcelList>0){
        that.chongfu2=true;
      }
      // this.filerror= response.data.errorForDbList;
      // this.filerror=response.data.errorForDbList;
    },
    //文件上传之前的钩子判断
    uploadbefore(file){
    },
    //文件上传提交按钮
    uploadSubmit(){
      let that=this;
      if(this.fileList.length > 0){
        let params={
          arrs:JSON.stringify(this.fileList)
        }
        that.loading=true;
        API.batchimportantuser(params).then((result)=>{
            that.loading=false;
            if(result && result.status === "101"){
              that.$message.success({showClose: true, message: '文件上传成功', duration: 2000});
              that.batchimportVisible = false;
              this.chongfu1=false;
              this.chongfu2=false;
              this.zhengque=false;
              that.fileList=[];
              this.$refs.upload.clearFiles()
              that.search();
            }else if(result && result.status === "102"){
              that.$message.error({showClose: true, message: '文件上传失败,请重新上传', duration: 2000});
              that.fileList=[];
            }
           },(err)=>{
              that.loading=false;
              that.$message.error({showClose: true, message: err.toString(), duration: 2000});
           }).catch((err)=>{
              that.loading = false;
              that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
           })
      }else{
        that.$message.error({showClose: true, message: '无正确数据请修改后再上传', duration: 2000});
      }
      
    },
    //关闭上传文件弹框的回调
    closeDialog(){
      this.batchimportVisible=false;
      this.chongfu1=false;
      this.chongfu2=false;
      this.zhengque=false;
      this.$refs.upload.clearFiles()
    },
    //批量导入文件取消对话框事件
    batchqxdialog(){
      this.batchimportVisible=false;
      this.chongfu1=false;
      this.chongfu2=false;
      this.zhengque=false;
      this.$refs.upload.clearFiles()
    },
    //显示用户编辑界面
    editshowDiglog:function(index,row){
      let that=this;
      this.edituserFormVisible=true;
      this.edituserForm=Object.assign({},row);
      this.$nextTick(function() {
          that.$refs.edituserForm.clearValidate();
      })
    },
    //用户编辑界面提交
    editSubmit:function(){
      let that=this;
        this.$refs.edituserForm.validate((valid)=>{
         if(valid){
           this.loading=true;
           let para=Object.assign({},this.edituserForm);
           API.edituser(para).then((result)=>{
             that.loading=false;
            if(result && result.status === "101"){
              that.$message.success({showClose: true, message: '用户信息修改成功', duration: 2000});
              that.$refs.edituserForm.resetFields();
              that.edituserFormVisible = false;
              that.search();
            }else{
              that.$message.error({showClose: true, message: '用户信息修改失败', duration: 2000});
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
    //显示用户新增界面
    addshowDiglog:function(){
      let that=this;
      this.adduserFormVisible = true;
        this.adduserForm = {
          userid:'',
          username:'',
          usersex:'1',
          userphone:'',
          userdepartment:''
        };
        this.$nextTick(function() {
          that.$refs.adduserForm.clearValidate();
        })
        
    },
    //用户新增界面提交
    addSubmit:function(){
      let that = this;
      this.$refs.adduserForm.validate((valid) => {
          if(valid){
            that.loading=true;
            let para=Object.assign({},this.adduserForm);
            let params={
              userid:para.userid,
              username:para.username,
              usersex:para.usersex,
              userphone:para.userphone,
              userdepartment:para.userphone
            };
            API.adduser(params).then((result)=>{
              that.loading=false;
              if (result && result.status === "101") {
                that.$message.success({showClose: true, message: '新增成功', duration: 2000});
                that.$refs['adduserForm'].resetFields();
                that.adduserFormVisible = false;
                that.search();
              } else if(result && result.status === "108"){
                that.$message.error({showClose: true, message: '读者编号重复或已存在', duration: 2000});
              }else if(result && result.status === "102"){
                that.$message.error({showClose: true, message: '新增失败', duration: 2000});
              }
            },(err)=>{
              that.loading=false;
              that.$message.error({showClose:true,message:err.toString(),duration:2000});
            }).catch((error)=>{
              that.loading=false;
              that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
            })
          }
      })
    },
    //删除用户
    // deluser:function(index,row){
    //     let that = this;
    //     let para={
    //       id:row.id
    //     }
    //     this.$confirm('确认删除该用户吗?', '提示', {type: 'warning'}).then(() => {
    //       that.loading = true;
    //       API.deluser(para).then(function (result) {
    //         that.loading = false;
    //         if (result && result.status === "101") {
    //           that.$message.success({showClose: true, message: '删除成功', duration: 1500});
    //           that.search();
    //         }else if (result && result.status === "107"){
    //           that.$message.success({showClose: true, message: '该读者用户有未还书籍，不允许删除', duration: 1500});
    //           that.search();
    //         }
    //       }, function (err) {
    //         that.loading = false;
    //         that.$message.error({showClose: true, message: err.toString(), duration: 2000});
    //       }).catch(function (error) {
    //         that.loading = false;
    //         that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
    //       });
    //     }).catch(() => {
          
    //     });
    // },
    //禁用账户
    delchange:function(index,row){
        let that = this;
        if(row.userstatus){
          let para={
            id:row.id
          }
          API.deluser(para).then(function (result) {
            if (result && result.status === "101") {
              that.$message.success({showClose: true, message: '启用账户成功', duration: 1500});
            }
          }, function (err) {
            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
          }).catch(function (error) {
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          });
        }else{
          let para={
            id:row.id
          }
          API.deluser(para).then(function (result) {
            if (result && result.status === "101") {
              that.$message.success({showClose: true, message: '禁用账户成功', duration: 1500});
            }else if (result && result.status === "107"){
              that.$message.error({showClose: true, message: '该读者用户有未还书籍，不允许禁用', duration: 1500});
              that.search();
            }
          }, function (err) {
            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
          }).catch(function (error) {
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          });
        }
    }
  },
  created(){},
  mounted(){
    this.handleSearch();
  }
}
</script>
<style lang="scss">
.wrapper{}
.usertable .el-switch{
    padding-bottom: 4px;
  }
  ul,li{
    list-style: none;
  }
</style>
<style>
  .userDialog .userdialog{
    width: 400px;
  }
</style>
