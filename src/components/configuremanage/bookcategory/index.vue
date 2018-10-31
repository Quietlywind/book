<template>
  <div class="wrapper">
      <el-row>
        <el-col :xs="20" :sm="20" :md="20">
          <el-tag style="margin:0 5px;" :key="tag.index" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input style="width:80px;" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" 
            @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
          </el-input>
          <el-button v-else size="small" @click="showInput">+ 新增类别</el-button>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  watch:{},
  computed:{},
  methods:{
    //关闭tag事件
    handleClose(tag) {
        console.log(tag)
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    //
    showInput(){
      this.inputVisible=true;
      this.$nextTick(_ =>{
        this.$refs.saveTagInput.$refs.input.focus();
      })
    },

    //
    handleInputConfirm(){
      let inputValue=this.inputValue;
      if(inputValue){
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible=false;
      this.inputValue="";
    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
.wrapper{}
</style>