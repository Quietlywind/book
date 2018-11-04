<template>
  <div >
    <!-- <el-row>
        <el-col :md="24" class="warp-breadcrum">  
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
            <el-breadcrumb-item>新书上架</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
    </el-row> -->
    <el-row style="width:100%">
      <div class="wrap-center" style="width:50%;margin:0 auto;background-color:#fff;">
          <div style="padding:10px 0px;border-bottom: 1px solid #ccc;width:100%;font-size:18px;text-align:center;">
            <span>新书上架</span>
          </div>
          <el-form style="padding:20px 0;" status-icon :rules="newbookRules" :model="newbook" ref="newbook" size='small' label-width="80px">
              <el-col :md="16" class="newbookdiv">
                <el-form-item label="图书编码" prop="bookid">
                  <el-input v-model="newbook.bookid" placeholder="请输入图书编码" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="16" class="newbookdiv">
                <el-form-item label="图书名称" prop="bookname">
                  <el-input v-model="newbook.bookname" placeholder="请输入图书名称" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="16" class="newbookdiv">
                <el-form-item label="图书类别" prop="bookregion">
                  <el-select style="width:100%;" v-model="newbook.bookregion" placeholder="请选择" clearable>
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="item in bookcategory" :value='item.id' :key="item.id" :label="item.mangeName">
                        {{item.mangeName}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="16" class="newbookdiv" >
                <el-form-item label="出版社" prop="bookpress">
                  <el-input v-model="newbook.bookpress" placeholder="请输入出版社" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="16" class="newbookdiv">
                <el-form-item label="单价" prop="bookprice">
                  <el-input v-model.number="newbook.bookprice" placeholder="请输入单价" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="16" class="newbookdiv">
                  <div style="width:50%;display: inline-block;">
                    <el-form-item label="层数" prop="bookshelfnum">
                      <el-select  v-model="newbook.bookshelfnum" placeholder="请选择" clearable>
                          <el-option label="请选择" value=""></el-option>
                          <el-option v-for="item in bookshelfnum" :value='item.id' :key="item.index" :label="item.shelfnum">
                            {{item.shelfnum}}
                          </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div style="width:50%;float: left;">
                    <el-form-item label="图书书架" prop="bookshelf">
                      <el-select  v-model="newbook.bookshelf" placeholder="请选择" clearable>
                          <el-option label="请选择" value=""></el-option>
                          <el-option v-for="item in bookshelfname" :value='item.id' :key="item.index" :label="item.shelfname">
                              {{item.shelfname}}
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
        bookcategory:[],
        bookshelfname:[], //图书书架
        bookshelfnum:[],  //层数
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

    //新书上架保存提交
    addbook:function(){
        let that = this;
        this.$refs.newbook.validate((valid) => {
          if (valid) {
            let para = {
              bookUuid:that.newbook.bookid,
              bookName:that.newbook.bookid,
              bookCategory:that.newbook.bookregion,
              bookPublisher:that.newbook.bookpress,
              bookPrice:that.newbook.bookprice,
              shelfName:that.newbook.bookshelf,
              shelfNum:that.newbook.bookshelfnum,
            }
            API.addbookstock(para).then(function (result) {
              if (result && result.status === "101") {
                that.$message.success({showClose: true, message: '新书上架成功', duration: 2000});
                that.$refs['newbook'].resetFields();
              } else {
                that.$message.error({showClose: true, message: '新书上架失败', duration: 2000});
              }
            }, function (err) {
              that.$message.error({showClose: true, message: err.toString(), duration: 2000});
            }).catch(function (error) {
              console.log(error);
              that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
            });
          }
        });
    },

    //查询图书类别
    //新书上架页请求图书类别
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
  created(){},
  mounted(){
    this.searchbookcategory();
    this.searchbookshelf();
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
.el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
