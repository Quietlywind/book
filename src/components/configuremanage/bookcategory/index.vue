<template>
  <div class="wrapper">
      <el-row>
        <el-col :xs="24" :sm="24" :md="24">
          <el-tag style="margin:5px 5px;" :key="tag.index" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag.id)">
            {{tag.mangeName}}
          </el-tag>
          <el-input style="width:80px;" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" 
            @keyup.enter.native="handleInputConfirm" >
          </el-input>
          <el-button v-else size="small" @click="showInput">+ 新增类别</el-button>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import API from '../../../api/api_book'
import axios from 'axios'
export default {
  components:{},
  props:{},
  data(){
    return {

      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  watch:{},
  computed:{},
  methods:{
    //初始化图书类别数据
    search(){
      let that=this;
      let params={
        mangeType:"book_type"
      };
      API.setshelf(params).then((result)=>{
        if (result && result.status === "101") {
            that.dynamicTags=result.data;
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

    //关闭tag事件
    handleClose(tag) {
      let that=this;
      this.$confirm('是否删除该图书类别?', '提示', {type: 'warning'}).then(() => {
          let params={
            mangeType:"book_type",
            id:tag
          }
        API.delshelfcategory(params).then((result)=>{
          if(result && result.status === "101"){
            that.$message.error({showClose:true,message:"删除图书类别成功",duration:2000});
            that.search();
          }
        },(err)=>{
          that.loading=false;
          that.$message.error({showClose:true,message:err.toString(),duration:2000});
        }).catch((error)=>{
          that.loading=false;
          that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        })
      })
    },
    //显示新增文本框
    showInput(){
      this.inputVisible=true;
      this.$nextTick(_ =>{
        this.$refs.saveTagInput.$refs.input.focus();
      })
    },
            // inputValue@blur="handleInputConfirm"
    //确认新增文本框
    handleInputConfirm(){
      let inputValue=this.inputValue;
      let that=this;
      if(inputValue !=""){
        axios.post('/info/mange/insert',{
            mangeType:"book_type",
            mangeName:inputValue
        }).then((res)=>{
            if(res.data && res.data.status === "101"){
              that.$message.success({showClose:true,message:"图书类别新增成功",duration:2000});
              that.inputVisible=false;
              that.inputValue="";
              that.search();
            }
        }).catch((err)=>{  
          
        })
      }else{
        that.inputVisible=false;
        that.inputValue="";
      }
      
    },
    insertregion(){
      // API.insertregion(params).then((result)=>{
      //   console.log(result)
      //   if(result && result.status === "101"){
      //     that.$message.error({showClose:true,message:"图书类别新增成功",duration:2000});
      //   }
      // },(err)=>{
      //   that.loading=false;
      //   that.$message.error({showClose:true,message:err.toString(),duration:2000});
      // }).catch((error)=>{
      //   that.loading=false;
      //   that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
      // })
    }
  },
  created(){},
  mounted(){
    this.search();
  }
}
</script>
<style lang="scss" scoped>
.wrapper{}
</style>