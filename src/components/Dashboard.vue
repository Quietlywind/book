<template>
  <el-row class="warp" >
    <!-- <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col> -->
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
                          <span style="font-size:35px;">{{remainNum}}</span>本
                        </div>
                        <div class="right_text" style="font-size: 14px;text-align: right;">
                          <span>图书总数量{{libNum}}本</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :md="8">
                      <div class="green" @click="overdueNotice">
                        <p style="margin:0px;padding: 5px 0px 5px 5px;">已借阅图书</p>
                        <div class="booktotal" style="text-align:center;font-weight:bold;">
                          <span style="font-size:35px;">{{loanNum}}</span>本
                        </div>
                        <div class="right_text" style="font-size: 14px;text-align: right;">
                          <span>逾期未还图书{{overNum}}本</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :md="8">
                      <div class="blue" @click="dealDetail">
                        <p style="margin:0px;padding: 5px 0px 5px 5px;">处理图书</p>
                        <div class="booktotal" style="text-align:center;font-weight:bold;">
                          <span style="font-size:35px;">{{dealNum}}</span>本
                        </div>
                        <div class="right_text" style="font-size: 14px;text-align: right;">
                          <span>遗失图书{{loseNum}}本</span>
                        </div>
                      </div>
                    </el-col>
                  </el-card>
               </el-row>
               <el-row >
                    <el-col :md="12"  style="padding:0px;padding-top:30px;">
                      <el-card :body-style="{ padding: '00px' }" style="padding:0px !important;">
                        <div class="float_text">
                          <div class="rectangle"></div>
                          <span>图书类别占比</span>
                        </div>
                        <div id="chartPie"></div>
                        <!-- <x-charts :id="id1" :option="option1"></x-charts> -->
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
                          <div id="chartBar"></div>
                        <!-- <x-charts :id="id2" :option="option2"></x-charts> -->
                      </el-card>
                    </el-col>
               </el-row>
          </el-col>
          <el-col :md="10" style="padding-top:0px;">
            <el-card :body-style="{ padding: '00px' }" style="min-height:600px;padding: 20px 70px;">
                <el-tabs v-model="activeName2" type="card" stretch @tab-click="handleClick">
                  <el-tab-pane label="图书借阅榜" name="first" >
                      <div v-for="(item,index) in books" :key="item.index" class="paihangbang">
                        <!-- <span v-if="index===0"><img src="../assets/logo.png" style="padding-left:8px;"></span>
                        <span v-else-if="index===1">
                          <img src="../assets/logo.png">
                        </span>
                        <span v-else-if="index ===2">
                          <img src="../assets/logo.png" >
                        </span> -->
                        <span style="margin-right:10%">{{index+1}}</span>
                        <span >{{item.name}}</span>
                        <span style="display:inline-block;float:right;">{{item.num}}次</span>
                      </div>
                  </el-tab-pane>
                <el-tab-pane label="图书狂人榜" name="second" >
                      <div v-for="(item,index) in books" :key="index" class="paihangbang">
                        <span style="margin-right:10%">{{index+1}}</span>
                        <span >{{item.name}}</span>
                        <span style="display:inline-block;float:right;">{{item.num}}次</span>
                      </div>
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </el-col>
         </el-row>
      </section>
      <!--罚金详情界面-->
      <el-dialog title="" fullscreen :visible.sync ="fineVisible" :close-on-click-modal="false" style="width:100%;">
          <fine-detail></fine-detail>
      </el-dialog>
      <!--处理详情界面-->
      <el-dialog title="" fullscreen :visible.sync ="dealVisible" :close-on-click-modal="false" style="width:100%;">
          <deal-detail></deal-detail>
      </el-dialog>
      <!-- 逾期通知界面 -->
      <el-dialog title="" fullscreen :visible.sync ="overdueVisible" :close-on-click-modal="false" style="width:100%;">
          <overduenotice></overduenotice>
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
    cursor: pointer;
    box-shadow: 4px 3px 5px 0 rgba(0,0, 0, .3);
  }
  .blue{
    color:#fff;
    background-color: #36A9CF;
    box-shadow: 4px 3px 5px 0 rgba(0,0, 0, .3);
    cursor: pointer;
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
  import fineDetail from './borrowRecord/list.vue'
  import dealDetail from './highcharts/fine.vue'
  import overduenotice from './highcharts/overduenotice'
  export default {
    data() {
      return {
        currentDate: new Date(),
        chartBar: null,
        chartPie: null,

        activeName2: 'first',
        filters: {
          name: ''
        },
        books: [],
        total: 0,
        type: 1,

        id1:'chartPie',
        id2:'chartBar',
        option1:options.pie,
        option2:options.bar,
        fineVisible:false, //罚金详情弹框状态
        dealVisible:false, //处理图书弹框状态
        overdueVisible:false, //逾期通知弹框状态

        remainNum:0,   //图书总量
        libNum:0,  //图书总数量
        loanNum:0,  //借出数量 
        overNum:0,  //逾期数量
        dealNum:0,  //处理数量
        loseNum:0,  //遗失数量
        
        
      };
    },
    mounted: function () {
      this.search()
      this.indexlibinfo();
       let that= this;
      //  let chart=Highcharts.chart('chartPie',{
         
      //  });
      //  this.chartBar=new Highcharts.chart('chartBar',{
        
      //  })
    },
    methods: {
      handleClick(tab,event){
        if(event.target.innerText==="图书借阅榜"){
          this.type = 1;
          this.search();
        }else{
          this.type = 2;
          this.search();
        }
      },

      //首页数据查找
      indexlibinfo(){
        let that = this;
        let params = {};
        API.indexlibinfo(params).then(function (result) {
          if (result && result.status === "101") {
              that.remainNum=result.data.remainNum;
              that.libNum=result.data.libNum;
              that.loanNum=result.data.loanNum;
              that.overNum=result.data.overNum;
              that.dealNum=result.data.dealNum;
              that.loseNum=result.data.loseNum;
              that.fineTotal(result.data.line);
              that.categorybook(result.data.pie)
          }
        }, function (err) {
          that.$message.error({showClose: true, message: err.toString(), duration: 2000});
        }).catch(function (error) {
          console.log(error);
          that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        });
      },
      // 选项数据查找
      search(){
        let that = this;
        let params = {
          type:that.type
        };
        API.indextabList(params).then(function (result) {
          // console.log(result)
          if (result && result.status === "101") {
            that.books = result.data;
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
      },
      //打开处理图书界面
      dealDetail(){
        this.dealVisible=true;
      },
      //打开逾期通知界面
      overdueNotice(){
        this.overdueVisible=true;
      },
      // 罚金统计
      fineTotal:function(val){
         console.log(val)
         let chartBar=Highcharts.chart('chartBar',{
           chart: {
            type: 'column'  //指定图表的类型，默认是折线图(line)
          },
          title: {
            text: ''
          },
          credits:{
            enabled:false, //隐藏版权信息去掉地址
          },
          xAxis: {
            categories: [
              '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'
            ],
            crosshair: true,
            visible:true,//是否显示x轴数据
            tickWidth:0, //设置刻度标签宽度
          },
          yAxis: {
            min: 0,
            title: {
              enabled:false,
              text: ''
            }
          },
          tooltip: {
            // head + 每个 point + footer 拼接成完整的 table
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} ￥</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              borderWidth: 0,
            }
          },
          series:val,
         })
      },
      //图书类别占比
      categorybook:function(val){
        let chartPie=Highcharts.chart('chartPie',{
          chart:{
                  //spacing : [40, 0 , 40, 0],
                  //margin:[0,0,0,0],
                },
                title: {
                  floating:true,
                  text: '',
                  style: {
                      fontFamily: "",
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#000000'
                  },
                },
                tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                  // pointFormatter: function() {
                  //     return '<span style="color: '+ this.series.color + '">\u25CF</span> '+
                  //           this.series.name+': <b>'+ this.y +'</b><br/>.'
                  // }
                },
                credits:{
                  enabled:false, //隐藏版权信息
                },
                plotOptions: {   //数据列配置
                  pie: {
                    showInLegend: false,//是否显示饼图/环形图的图例
                    allowPointSelect: false, //是否允许选中点
                    cursor: 'pointer', //光标形状
                    dataLabels: {   //数据标签
                      enabled: true,
                      softConnector: true,
                      distance: 20,//标签连接线距离图表距离长短
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                      style: {
                        "color": 'black',
                        "fontSize":"10px",
                        // (Highcharts.theme && Highcharts.theme.contrastTextColor) || 
                      },
                      connectorPadding: 2,
                    },
                    point: {
                      events: {
                        mouseOver: function(e) {  // 鼠标滑过时动态更新标题
                          chartPie.setTitle({
                            text: e.target.name+ '\t'+ e.target.y + ' 本'
                          });
                          // this.slice();
                        },
                        mouseOut:function(e){
                          chartPie.setTitle({
                            text:'',
                          });
                          // this.slice();
                        }
                      }
                    },
                  }
                },
                series: [{
                  type: 'pie',
                  size: '45%',
                  innerSize: '80%',
                  name: '图书类别',
                  data: val,
                }]
              }, function(c) { // 图表初始化完毕后的会掉函数
                  // 环形图圆心
                  var centerY = c.series[0].center[1],
                    titleHeight = parseInt(c.title.styles.fontSize);
                // 动态设置标题位置
                c.setTitle({
                    y:centerY + titleHeight/2
                });
                  })
      }

    },
    created () {
      // for(var i=0;i<10;i++){
      //   this.cishu.push(Math.ceil(Math.random()*500))
      // }
    },
    components: {
      XCharts,
      fineDetail,
      dealDetail,
      overduenotice,
    },
  }
</script>
