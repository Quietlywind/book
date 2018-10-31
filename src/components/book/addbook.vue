<template>
  <div >
    <el-row>
        <el-col :md="24" class="warp-breadcrum">  
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
            <el-breadcrumb-item>新书上架</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
    </el-row>
    <el-row style="width:100%">
      <div class="wrap-center" style="width:50%;margin:0 auto;">
          <div style="padding:10px 0px;border-bottom: 1px solid #ccc;width:100%;font-size:18px;text-align:center;">
            <span>新书上架</span>
          </div>
          <el-form style="padding:20px 0;" status-icon :rules="newbookRules" :model="newbook" ref="newbook" size='small' label-width="80px">
              <el-col :md="16" class="newbookdiv">
                <el-form-item label="图书编码" prop="bookid">
                  <el-input v-model="newbook.bookid" placeholder="请输入图书编码" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="16" class="newbookdiv">
                <el-form-item label="图书名称" prop="bookname">
                  <el-input v-model="newbook.bookname" placeholder="请输入图书名称" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="16" class="newbookdiv">
                <el-form-item label="图书类别" prop="bookregion">
                  <el-select style="width:100%;" v-model="newbook.bookregion" placeholder="请选择">
                      <el-option label="请选择" value=" "></el-option>
                      <el-option v-for="item in bookCategory" :value='item.value' :key="item.index">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="16" class="newbookdiv" >
                <el-form-item label="出版社" prop="bookpress">
                  <el-input v-model="newbook.bookpress" placeholder="请输入出版社" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="16" class="newbookdiv">
                <el-form-item label="单价" prop="bookprice">
                  <el-input v-model.number="newbook.bookprice" placeholder="请输入单价" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="16" class="newbookdiv">
                  <div style="width:50%;display: inline-block;">
                    <el-form-item label="图书书架" prop="bookshelf">
                      <el-select  v-model="newbook.bookshelf" placeholder="请选择">
                          <el-option label="请选择" value=" "></el-option>
                          <el-option v-for="item in bookCategory" :value='item.value' :key="item.index">
                          </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div style="width:50%;float: left;">
                    <el-form-item label="层数" prop="bookshelfnum">
                      <el-select  v-model="newbook.bookshelfnum" placeholder="请选择">
                          <el-option label="请选择" value=" "></el-option>
                          <el-option v-for="item in bookCategory" :value='item.value' :key="item.index">
                          </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
              </el-col>
              <el-col :md="16" class="newbookdiv" style="text-align:right;">
                <el-button size="small" @click="addbook" type="primary">保存</el-button>
              </el-col>
          </el-form>
      </div>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import API from '../../api/api_book';
export default {
  data() {
    return {

        newbook:{
          bookid:'',
          bookname:'',
          bookregion:'',
          bookpress:'',
          bookprice:'',
          bookshelf:'',
          bookshelfnum:''
        },
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
        ],

        newbookRules:{
          bookid:[
            {required:true,message:"请输入图书编号",trigger:'blur'}
          ],
          bookname:[
            {required:true,message:"请输入图书名称",trigger:'blur'}
          ],
          bookregion:[
            {required:true,message:"请选择图书类型",trigger: 'change'}
          ],
          bookpress:[
            {required:true,message:"请输入出版社名称",trigger:'blur'}
          ],
          bookprice:[
            {required:true,message:"请输入单价"},
            { type: 'number', message: '单价必须为数字值'}
          ],
          bookshelf:[
            {required:true,message:'请选择图书书架',trigger:'change'}
          ],
          bookshelfnum:[
            {required:true,message:'请选择层数',trigger:'change'}
          ]
        },
    }
  },
  components: {

  },
  props:{},
  watch:{},
  computed:{},
  methods:{
    //新书上架保存按钮
    addbook(){
      let that=this;
      that.$refs.newbook.validate((valid)=>{
        if(valid){
          let para=Object.assign({},this.newbook);
          API.addbook(para).then((result)=>{
              console.log(result)
              if(result && result.status === "101"){
                that.$message.success({showClose: true, message: '保存成功', duration: 2000});
                that.$refs['newbook'].resetFields();
              }else{
                that.$message.error({showClose: true, message: '保存失败', duration: 2000});
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
    }
  },
  created(){},
  mounted(){

  }
}
</script>

<style scoped>
.wrap-center{
  border: 1px solid #9ED8D3;
  border-radius: 10px;
}
.newbookdiv{
  float:none;
  margin:auto !important;
}
</style>
