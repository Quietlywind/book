<template>
  <div class="wrapper">
      <el-row>
        <el-col :span="24">
            <table class="finestandard" style="width:100%;" >
              <thead>
                <tr>
                  <th style="width:10%;">罚金类型</th>
                  <th style="text-align:center;">罚金标准</th>
                  <th style="width:10%;text-align:center;">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="text-align:center;">逾期罚金</td>
                  <td>
                     <el-col :span="24" style="padding: 5px;">
                       <span>逾期天数&lt;=</span>
                       <el-input size="mini" style="width:40px;padding:0px;color:red;" v-model="commonly.overdueday"></el-input>
                       <span>天，逾期罚金=逾期天数*</span>
                       <el-input size="mini" style="width:40px;" v-model="commonly.overduerate1"></el-input>
                       <span>%，其余 逾期罚金=逾期天数*</span>
                       <el-input size="mini" style="width:40px;" v-model="commonly.overduerate2"></el-input>
                       <span>%</span>
                     </el-col>
                     <el-col :span="24" style="padding:5px;">
                       <span>最高罚金&lt;书的价格</span>
                     </el-col>
                  </td>
                  <td style="text-align:center;">
                    <el-button type="text" @click="overdue">修改</el-button>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">损坏罚金</td>
                  <td>
                    <el-col :span="24" style="padding: 5px;">
                       <span>一般损坏(书面不整洁),损坏罚金=</span>
                       <el-input size="mini" style="width:40px;" v-model="serious.damagemin"></el-input>
                       <span>&lt;损坏罚金&lt;</span>
                       <el-input size="mini" style="width:40px;" v-model="serious.damagemax"></el-input>
                     </el-col>
                     <el-col :span="24" style="padding: 5px;">
                       <span>严重损坏(页数缺少/页面乱涂),损坏罚金=书籍的价格，</span>
                       <span>根据管理员自行判断</span>
                     </el-col>
                  </td>
                  <td style="text-align:center;">
                    <el-button type="text" @click="damage">修改</el-button>
                  </td>
                </tr>
              </tbody>
            </table>
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
      //逾期罚金类型
      commonly:{
        overdueday:'',
        overduerate1:'',
        overduerate1:''
      },
      //损坏罚金
      serious:{
        damagemin:'',
        damagemax:''
      },

    }
  },
  watch:{},
  computed:{},
  methods:{

    //罚金标准初始化请求事件
    search(){
      let that=this;
      that.loading=true;
      let params={
        mangeType:"attaint_overdue"
      };
      API.setshelf(params).then((result)=>{
        that.loading=false;
        console.log(result)
        if (result && result.status === "101") {
            that.commonly.overdueday=result.data[0].mangeRemark1;
            that.commonly.overduerate1=result.data[0].mangeRemark2;
            that.commonly.overduerate2=result.data[0].mangeRemark3;
            that.serious.damagemin=result.data[0].mangeRemark4;
            that.serious.damagemax=result.data[0].mangeRemark5;
        }
      },(err)=>{
        that.loading=false;
        that.$message.error({showClose:true,message:err.toString(),duration:2000});
      }).catch((error)=>{
        that.loading=false;
        that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
      })
    },

    //逾期罚金标准修改事件
    overdue(){
        let that = this;
        this.$confirm('是否修改逾期罚金标准?', '提示', {type: 'warning'}).then(() => {
          that.loading=true;
          let params={
            mangeType:"attaint_overdue",
            mangeRemark1:that.commonly.overdueday,
            mangeRemark2:that.commonly.overduerate1,
            mangeRemark3:that.commonly.overduerate2,
          };
          API.updateshelf(params).then((result)=>{
            that.loading=false;
          if(result && result.status === "101"){
            that.$message.success({showClose: true, message: '修改成功', duration: 2000});
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
        }).catch(() => {
          
        });
      },

    //逾期罚金标准修改事件
    // overdue(){
    //   let that=this;
    //   that.loading=true;
    //       let params={
    //         mangeType:"attaint_overdue",
    //         mangeRemark1:that.commonly.overdueday,
    //         mangeRemark2:that.commonly.overduerate1,
    //         mangeRemark3:that.commonly.overduerate2,
    //       };
    //       API.updateshelf(params).then((result)=>{
    //         that.loading=false;
    //       if(result && result.status === "101"){
    //         that.$message.success({showClose: true, message: '修改成功', duration: 2000});
    //       }else{
    //         that.$message.error({showClose: true, message: '修改失败', duration: 2000});
    //       }
    //       },(err)=>{
    //         that.loading=false;
    //         that.$message.error({showClose: true, message: err.toString(), duration: 2000});
    //       }).catch((err)=>{
    //         that.loading = false;
    //       that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
    //       })
    // },
    //损坏罚金标准修改事件
    // damage(){
    //   let that=this;
    //   that.loading=true;
    //        let para=Object.assign({},this.editForm);
    //        let params={
    //           mangeType:"attaint_overdue",
    //           mangeRemark4:that.serious.damagemin,
    //           mangeRemark5:that.serious.damagemax,
    //         };
    //        API.updateshelf(params).then((result)=>{
    //          that.loading=false;
    //         if(result && result.status === "101"){
    //           that.$message.success({showClose: true, message: '修改成功', duration: 2000});
    //         }else{
    //           that.$message.error({showClose: true, message: '修改失败', duration: 2000});
    //         }
    //        },(err)=>{
    //           that.loading=false;
    //          that.$message.error({showClose: true, message: err.toString(), duration: 2000});
    //        }).catch((err)=>{
    //          that.loading = false;
    //         that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
    //        })
    // },
  //损坏罚金标准修改事件
    damage(){
        let that = this;
        this.$confirm('是否修改损坏罚金标准?', '提示', {type: 'warning'}).then(() => {
          that.loading=true;
           let params={
              mangeType:"attaint_overdue",
              mangeRemark4:that.serious.damagemin,
              mangeRemark5:that.serious.damagemax,
            };
           API.updateshelf(params).then((result)=>{
             that.loading=false;
            if(result && result.status === "101"){
              that.$message.success({showClose: true, message: '修改成功', duration: 2000});
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
<style lang="scss" >
// scoped
// .finestandard tr td,.finestandard tr th{
//   border: 1px solid #333;
// }
// .finestandard .el-input__inner{
//     padding:0px;
//     color:red;
//     border-color:#999;
// }
  table.finestandard{
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
  }
  table.finestandard thead th{
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
  }
  table.finestandard tbody td{
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
  }
  .finestandard .el-input__inner{
    padding:0 0 0 5px;
    color:red;
    font-size: 16px;
  }
</style>