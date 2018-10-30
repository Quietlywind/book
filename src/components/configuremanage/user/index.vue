<template>
  <div class="wrapper">
      <el-row :gutter="20">
        <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
            <el-col :span="24">
                <el-col :span="6">
                    <el-input size="small" placeholder="请输入读者编号/姓名" v-model="readerInput" clearable>
                    </el-input>
                </el-col>    
                <el-col :span="6">
                    <el-button size="small" type="primary" @click="handleSearch">查询</el-button>
                </el-col>
                <el-col :span="12" style="text-align:right;">
                    <el-button size="small" @click="addshowDiglog" type="primary">新增</el-button>
                    <el-button size="small" @click="batchimport" type="primary">批量导入</el-button>
                </el-col>
            </el-col>
            <el-col :span="24" style="margin-top:3%;">
                <!--列表-->
                <el-table :data="users" size="small" border style="width: 100%;">
                  <el-table-column prop="userId" label="读者编号"></el-table-column>
                  <el-table-column prop="username" label="读者姓名"></el-table-column>
                  <el-table-column label="读者性别">
                    <template slot-scope="scope">
                      <span v-if="scope.row.usersex==1">男</span>
                      <span v-else >女</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="userphone" label="读者电话" ></el-table-column>
                  <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" @click="editshowDiglog(scope.$index,scope.row)">编辑</el-button>
                      <el-button type="text" @click="deluser(scope.$index,scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!--表格分页工具条-->
                <el-col :span="24" v-show="this.users.length !=0">
                    <el-pagination background layout="prev, pager, next,jumper"  :page-size="10" :total="total" 
                    @current-change="handleCurrentChange" style="float:right;">
                    </el-pagination>
                </el-col>
            </el-col>
        </el-col>
        <!--图书新增弹框-->
          <el-dialog center title="新增" :visible.sync ="adduserFormVisible" :close-on-click-modal="false" width="30%">
            <el-form :model="adduserForm" size="small" label-width="80px" :rules="adduserForm" ref="adduserForm">
              <el-form-item label="读者编号" prop="userId">
                <el-col :span="20">
                  <el-input v-model="adduserForm.userId" auto-complete="off"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="读者姓名" prop="username">
                <el-col :span="20">
                  <el-input v-model="adduserForm.username" auto-complete="off"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="读者性别" prop="usersex">
                <el-col :span="20">
                  <el-radio v-model="adduserForm.usersex" label="1">男</el-radio>
                  <el-radio v-model="adduserForm.usersex" label="2">女</el-radio>
                </el-col>
              </el-form-item>
              <el-form-item label="读者电话" prop="userphone">
                <el-col :span="20">
                  <el-input v-model="adduserForm.userphone" auto-complete="off"></el-input>
                </el-col>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" @click.native="adduserFormVisible = false">取消</el-button>
              <el-button type="primary" size="small" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
          </el-dialog>
          <!--图书编辑弹框-->
          <el-dialog center title="编辑" :visible.sync ="edituserFormVisible" :close-on-click-modal="false" width="30%">
            <el-form :model="edituserForm" size="small" label-width="80px" :rules="edituserForm" ref="edituserForm">
              <el-form-item label="读者编号" prop="userId">
                <el-col :span="20">
                  <el-input v-model="edituserForm.userId" auto-complete="off"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="读者姓名" prop="username">
                <el-col :span="20">
                  <el-input v-model="edituserForm.username" auto-complete="off"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="读者性别" prop="usersex">
                <el-col :span="20">
                  <el-radio v-model="edituserForm.usersex" label="1">男</el-radio>
                  <el-radio v-model="edituserForm.usersex" label="2">女</el-radio>
                </el-col>
              </el-form-item>
              <el-form-item label="读者电话" prop="userphone">
                <el-col :span="20">
                  <el-input v-model="edituserForm.userphone" auto-complete="off"></el-input>
                </el-col>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" @click.native="edituserFormVisible = false">取消</el-button>
              <el-button type="primary" size="small" @click.native="editSubmit">提交</el-button>
            </div>
          </el-dialog>
      </el-row>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      users:[],
      total:0,
      page:1,
      limit:10,
      loading:false,
      readerInput:'',

      //编辑用户数据
      edituserFormVisible:false,//编辑用户界面是否显示
      edituserForm:{
          id:0,
          username:'',
          userId:'',
          usersex:'',
          userphone:''
      },

      //新增用户数据
      adduserFormVisible:false,//新增界面是否显示
      addLoading:false,
      adduserForm:{
        userId:'',
        username:'',
        usersex:'',
        userphone:''
      },
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

    },
    //搜索事件
    search(){
      let that=this;
      let params={
        page:that.page,
        limit:10,
        name:that.readerInput
      };
      // that.loading=true;
    },
    //批量导入事件
    batchimport(){
      
    },
    //显示用户编辑界面
    editshowDiglog:function(index,row){
      this.edituserFormVisible=true;
      this.edituserForm=Object.assign({},row);
      this.$refs.edituserForm.clearValidate();
    },
    //用户编辑界面提交
    editSubmit:function(){

    },
    //显示用户新增界面
    addshowDiglog:function(){
      this.adduserFormVisible = true;
        this.adduserForm = {
          userId:'',
          username:'',
          usersex:'',
          userphone:'',
        };
    },
    //用户新增界面提交
    addSubmit:function(){
      let that = this;
      let para=Object.assign({},this.adduserForm);
      this.users.push({
        userId:para.userId,
        username:para.username,
        userphone:para.userphone,
        usersex:para.usersex
      })
      this.adduserFormVisible = false;
    },
    //删除用户
    deluser:function(index,row){

    },
  },
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
.wrapper{}
</style>