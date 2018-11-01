<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
      <section class="chart-container">
        <el-row>
          <el-col :md="14" style="padding-top:0px;">
               <el-row>
                  <el-card :body-style="{ padding: '00px' }">
                    <el-col :md="8">
                      <div class="orange">
                        <p style="margin:0px;padding: 5px 0px 5px 5px;">当前图书总量</p>
                        <div class="booktotal" style="text-align:center;font-weight:bold;">
                          <span style="font-size:35px;">{{currentbook.total}}</span>本
                        </div>
                        <div class="right_text" style="font-size: 14px;text-align: right;">
                          <span>共{{Total}}本</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :md="8">
                      <div class="green">
                        <p style="margin:0px;padding: 5px 0px 5px 5px;">已借阅图书</p>
                        <div class="booktotal" style="text-align:center;font-weight:bold;">
                          <span style="font-size:35px;">{{borrowedbook.total}}</span>本
                        </div>
                        <div class="right_text" style="font-size: 14px;text-align: right;">
                          <span>共{{Total}}本</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :md="8">
                      <div class="blue">
                        <p style="margin:0px;padding: 5px 0px 5px 5px;">逾期未还图书</p>
                        <div class="booktotal" style="text-align:center;font-weight:bold;">
                          <span style="font-size:35px;">{{overduebook.total}}</span>本
                        </div>
                        <div class="right_text" style="font-size: 14px;text-align: right;">
                          <span>共{{Total}}本</span>
                        </div>
                      </div>
                    </el-col>
                  </el-card>
               </el-row>
               <el-row>
                    <el-col :md="12" style="padding:0px;padding-top:30px;">
                      <el-card :body-style="{ padding: '00px' }" style="padding:0px !important;">
                        <div class="float_text">
                          <div class="rectangle"></div>
                          <span>图书类别占比</span>
                        </div>
                        <x-charts :id="id1" :option="option1"></x-charts>
                      </el-card>
                    </el-col>
                    <el-col :md="12" style="padding:0px;padding-top:30px;">
                      <el-card :body-style="{ padding: '00px' }" style="padding:0px !important;">
                          <div class="float_text">
                            <div class="rectangle"></div>
                            <span>罚金统计</span>
                          </div>
                          <div class="float_right" @click="fineDetail">
                            <a href="JavaScript:;">罚金详情<i class="el-icon-d-arrow-right"></i></a>
                          </div>
                        <x-charts :id="id2" :option="option2"></x-charts>
                      </el-card>
                    </el-col>
               </el-row>
          </el-col>
          <el-col :md="10" style="padding-top:0px;">
            <el-card :body-style="{ padding: '00px' }" style="padding: 20px 70px;">
                <el-tabs v-model="activeName2" type="card" stretch @tab-click="handleClick">
                  <el-tab-pane label="图书借阅榜" name="first" >
                      <div v-for="(item,index) in books" :key="index" class="paihangbang">
                        <!-- <span v-if="index===0"><img src="../assets/logo.png" style="padding-left:8px;"></span>
                        <span v-else-if="index===1">
                          <img src="../assets/logo.png">
                        </span>
                        <span v-else-if="index ===2">
                          <img src="../assets/logo.png" >
                        </span> -->
                        <span style="margin-right:10%">{{index+1}}</span>
                        <span >{{item.name}}</span>
                        <span style="display:inline-block;float:right;">{{cishu[index]}}次</span>
                      </div>
                  </el-tab-pane>
                <el-tab-pane label="图书狂人榜" name="second" >
                      <div v-for="(item,index) in books" :key="index" class="paihangbang">
                        <span style="margin-right:10%">{{index+1}}</span>
                        <span >{{item.name}}</span>
                        <span style="display:inline-block;float:right;">{{cishu[index]}}次</span>
                      </div>
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </el-col>
         </el-row>
      </section>
      <!--罚金详情界面-->
      <el-dialog title="" fullscreen=true :visible.sync ="fineVisible" :close-on-click-modal="false" style="width:100%;">
          <fine-detail></fine-detail>
      </el-dialog>
    </el-col> 
  </el-row>
</template>
<style lang="scss">
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .chart-container {
    width: 100%;
  }
  .chart-container .el-col {
    padding: 30px 20px;
  }
  .orange{
    color:#fff;
    background-color: #F7A35C;
    box-shadow: 4px 3px 5px 0 rgba(0,0, 0, .3);
  }
  .green{
    color:#fff;
    background-color: #7ECF6D;
    box-shadow: 4px 3px 5px 0 rgba(0,0, 0, .3);
  }
  .blue{
    color:#fff;
    background-color: #36A9CF;
    box-shadow: 4px 3px 5px 0 rgba(0,0, 0, .3);
  }

  .booktotal{
    padding: 30px 0px;
    margin: 0px 20px;
    background-color:rgba(243, 233, 233, 0.5);
  }
  .right_text{
    padding: 20px 20px 10px 0px;
  }

  .chart-container .el-tabs__item.is-active{
    color: #fff !important;
    background-color: #169BD5 !important;
  }
  .chart-container .el-tabs--card>.el-tabs__header{
    border: none !important;
  }
  .chart-container .el-card{
    border: 1px solid #b9dfdd !important;
  }
  .chart-container .paihangbang{
    padding: 15px;
    border-bottom: 1px solid #D0D0D0;
  }
  .float_text{
    float:left;
    line-height:19px;
    margin: 15px 0px 15px 0px;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
    font-weight: 700;
    font-style: normal;
    font-size: 0.9375rem;
    color: #A1A1A1;
  }
  .float_text .rectangle{
    width:14px;
    height:19px;
    background-color:#85CCC8;
    float:left;
    margin-right: 5px;
  }
  .float_right{
    margin: 15px 0px 15px 0px;
    float:right;
    font-family: 'Arial Cursiva', 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: italic;
    font-size: 0.8125rem;
    
  }
  .float_right a{
    text-decoration: underline;
    color: #7CB5EC;
  }
</style>

<script>
  //import echarts from 'echarts'
  import Highcharts from 'highcharts'
  import API from '../api/api_book'
  import XCharts from './highcharts/index.vue'
  import options from './highcharts/testpie'
  import fineDetail from './highcharts/fine.vue'
  export default {
    data() {
      return {
        currentDate: new Date(),
        chartBar: null,
        chartPie: null,
        Total:2000,
        currentbook:{
          total:1300,
        },
        borrowedbook:{
          total:70
        },
        overduebook:{
          total:10
        },
        cishu:[],
        activeName2: 'first',
        filters: {
          name: ''
        },
        books: [],
        total: 0,
        page: 1,
        limit: 10,
        id1:'chartPie',
        id2:'chartBar',
        option1:options.pie,
        option2:options.bar,
        fineVisible:false, //罚金详情弹框状态
      };
    },
    mounted: function () {
      this.handleSearch()
       let that= this;
      //  let chart=Highcharts.chart('chartPie',{
         
      //  });
      //  this.chartBar=new Highcharts.chart('chartBar',{
        
      //  })
    },
    methods: {
      handleClick(tab,event){
        if(event.target.innerText==="图书借阅榜"){
          this.total = 0;
          this.page = 1;
          this.search();
        }else{
          this.total = 0;
          this.page = 2;
          this.search();
        }
      },
      handleSearch(){
        this.total = 0;
        this.page = 1;
        this.search();
      },
      search(){
        let that = this;
        let params = {
          page: that.page,
          limit: 10,
          name: that.filters.name
        };
        API.findList(params).then(function (result) {
          if (result && result.books) {
            that.total = result.total;
            that.books = result.books;
          }
        }, function (err) {
          that.$message.error({showClose: true, message: err.toString(), duration: 2000});
        }).catch(function (error) {
          console.log(error);
          that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        });
      },
      //打开罚金详情
      fineDetail(){
        this.fineVisible=true;
      }

    },
    created () {
      for(var i=0;i<10;i++){
        this.cishu.push(Math.ceil(Math.random()*500))
      }
    },
    components: {
      XCharts,
      fineDetail
    }
  }
</script>
