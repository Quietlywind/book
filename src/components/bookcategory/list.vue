<template>
 <div>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>图书管理</el-breadcrumb-item>
        <el-breadcrumb-item>图书分类</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <h2>神马也没有！</h2>
      <input id="Button1" type="button" value="读   卡" @click="Button1_onclick" />
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24" class="warp-main">
      <OBJECT classid="clsid:10946843-7507-44FE-ACE8-2B3483D179B7"
	      id="CVR_IDCard" name="CVR_IDCard" width="0" height="0" >
      </OBJECT>
    </el-col>
    <el-col :span="24">
      <table style="width: 638px; height: 273px; border-top-style: groove; border-right-style: groove; border-left-style: groove; background-color: transparent; border-bottom-style: groove;">
         <tr>
             <td style="width: 98px">
                 姓名：</td>
             <td style="text-align: left" colspan="3">
                 <input id="Text1" type="text" style="width: 155px" name="Name" /></td>
             <td style="width: 138px; text-align: left;" rowspan="3">
                 <img  src="" style="width: 91px; height: 108px" name="pic"/></td>
         </tr>
         <tr>
             <td style="width: 98px">
                 性别：</td>
             <td style="width: 80px">
                 <input id="Text2" type="text" name="Sex" style="width: 154px" /></td>
             <td style="width: 58px">
                 民族：</td>
             <td style="width: 59px">
                 <input id="Text3" type="text" name="Nation" style="width: 94px" /></td>
         </tr>
         <tr>
             <td style="width: 98px">
                 出生日期：</td>
             <td style="text-align: left;" colspan="3">
                 <input id="Text4" type="text" style="width: 151px" name="Born" /></td>
         </tr>
         <tr>
             <td style="width: 98px">
                 地址：</td>
             <td colspan="4" style="text-align: left">
                 <input id="Text5" style="width: 505px" type="text" name="Address" /></td>
         </tr>
         <tr>
             <td style="width: 98px">
                 身份号码：</td>
             <td colspan="4" style="text-align: left">
                 <input id="Text6" style="width: 506px" type="text" name="CardNo" /></td>
         </tr>
         <tr>
             <td style="width: 98px">
                 签发机关：</td>
             <td colspan="4" style="text-align: left">
                 <input id="Text7" style="width: 505px" type="text" name="IssuedAt" /></td>
         </tr>
         <tr>
             <td style="width: 98px">
                 有效期限：</td>
             <td colspan="4" style="text-align: left">
                 <input id="Text8" style="width: 163px" type="text" name="EffectedDate" />至<input id="Text10" style="width: 163px" type="text" name="ExpiredDate" /></td>
         </tr>
         <tr>
             <td style="width: 98px; text-align: left;">
                 模块号码：</td>
             <td colspan="4" style="text-align: left">
                 <input id="Text9" style="width: 506px" type="text" name="SAMID" /></td>
         </tr>
         <tr>
             <td style="width: 98px; text-align: left; height: 136px;">
                 照片编码：</td>
             <td colspan="4" style="text-align: left; height: 136px;">
                 <textarea id="TextArea1" name="Picture" style="width: 509px; height: 115px"></textarea></td>
         </tr>
         <tr>
             <td style="width: 98px; text-align: left">
                 编码长度：</td>
             <td colspan="4" style="text-align: left">
                 <input id="Text11" style="width: 508px" type="text" name="PictureLen"/></td>
         </tr>
     </table>
    </el-col>
  </el-row>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    methods:{
      ClearForm(){
                       document.all['Name'].value = ""; 
                       document.all['Sex'].value = ""; 
                       document.all['Nation'].value = ""; 
                       document.all['Born'].value = ""; 
                       document.all['Address'].value = ""; 
                       document.all['CardNo'].value = ""; 
                       document.all['IssuedAt'].value = ""; 
                       document.all['EffectedDate'].value = ""; 
                       document.all['ExpiredDate'].value = ""; 
                       document.all['SAMID'].value = ""; 
                       document.all['pic'].src = ""; 
                       document.all['Picture'].value = "";  
                       document.all['PictureLen'].value = "";     
                       return true;
      },
      Button1_onclick(){
        //this.ClearForm();
        let CVR_IDCard = document.getElementById("CVR_IDCard");
        let strReadResult =CVR_IDCard.ReadCard();
        if(strReadResult=="0"){
          this.ClearForm()
          document.all['Name'].value = CVR_IDCard.Name;  
          document.all['Sex'].value = CVR_IDCard.Sex;    
          document.all['Nation'].value = CVR_IDCard.Nation; 
          document.all['Born'].value = CVR_IDCard.Born;     
          document.all['Address'].value = CVR_IDCard.Address; 
          document.all['CardNo'].value = CVR_IDCard.CardNo; 
          document.all['IssuedAt'].value = CVR_IDCard.IssuedAt;  
          document.all['EffectedDate'].value = CVR_IDCard.EffectedDate;  
          document.all['ExpiredDate'].value = CVR_IDCard.ExpiredDate;
          document.all['SAMID'].value = CVR_IDCard.SAMID;
          document.all['pic'].src = CVR_IDCard.Pic;
          document.all['Picture'].value = CVR_IDCard.Picture;  
          document.all['PictureLen'].value = CVR_IDCard.PictureLen  
        }else{
          this.ClearForm();
          alert(strReadResult)
        }
      },
    }
  }
</script>
