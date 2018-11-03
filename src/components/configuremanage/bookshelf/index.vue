<template>
  <div class="wrapper">
      <el-row>
        <el-col style="padding-top:20px;" :span="24" v-loading="loading" element-loading-text="拼命加载中">
          <!-- :rules="editFormrules" -->
            <el-form :model="editForm" :inline="false" status-icon label-width="80px" ref="editForm">
              <el-col :span="14" style="float:none;margin:auto;">
                <el-form-item label="书架数量" prop="shelfName">
                  <el-input v-model.number="editForm.shelfName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14" style="float:none;margin:auto;">
                <el-form-item label="层数" prop="shelfNum">
                  <el-input v-model.number="editForm.shelfNum" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14" style="float:none;margin:auto;text-align:right;">
                <el-form-item>
                    <el-button size="small" type="primary" @click="editshelf">修改</el-button>
                </el-form-item>
              </el-col>
            </el-form>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import API from '../../../api/api_book'
export default {
  components:{},
  props:{},
  data(){
    return {
      loading:false,
      shielfs:'shelfs',
      editForm:{
        shelfName:'',
        shelfNum:'',
      },
      // editFormrules:{
      //   shelfName:[
      //       { required: true, message: '请输入书架数量', trigger: 'blur' },
      //       { type: 'number', message: '书架数量必须为数字值'}
      //     ],
      //     shelfNum:[
      //       { required: true, message: '请输入层数', trigger: 'blur' },
      //       { type: 'number', message: '层数必须为数字值'}
      //     ]
      // },
    }
  },
  watch:{},
  computed:{},
  methods:{
    //初始化图书书架数据
    search(){
      let that=this;
      that.loading=true;
      let params={
        mangeType:that.shielfs
      };
      API.setshelf(params).then((result)=>{
        that.loading=false;
        console.log(result)
        if (result && result.status === "101") {
            that.editForm.shelfName=result.data[0].mangeRemark1;
            that.editForm.shelfNum=result.data[0].mangeRemark2;
        } else {
          that.$message.error({showClose: true, message: '请求书架信息失败', duration: 2000});
        }
      },(err)=>{
        that.loading=false;
        that.$message.error({showClose:true,message:err.toString(),duration:2000});
      }).catch((error)=>{
        that.loading=false;
        that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
      })
    },
    //书架修改按钮事件
    editshelf(){
      let that=this;
      // that.loading=true;
      // that.$refs.editForm.validate((valid)=>{
      //     if(valid){
            
      //     }
      // })
      this.$confirm('是否更新图书书架设置?', '提示', {type: 'warning'}).then(() => {
          let para=Object.assign({},this.editForm);
            let params={
                mangeType:that.shielfs,
                mangeRemark1:para.shelfName,
                mangeRemark2:para.shelfNum
              };
            API.updateshelf(params).then((result)=>{
              that.loading=false;
              if(result && result.status === "101"){
                that.$message.success({showClose: true, message: '更新书架信息成功', duration: 2000});
                that.search();
              }else{
                that.$message.error({showClose: true, message: '更新书架信息失败', duration: 2000});
              }
            },(err)=>{
                that.loading=false;
              that.$message.error({showClose: true, message: err.toString(), duration: 2000});
            }).catch((err)=>{
              that.loading = false;
              that.$message.error({showClose: true, message: '更新书架请求出现异常', duration: 2000});
            })  
        }).catch(() => {
          
        });
    },
  },
  created(){},
  mounted(){
    this.search();
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
  border: 1px solid #7CB4EC;
  width: 50%;
  margin: auto;
}
</style>