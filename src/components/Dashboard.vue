<template>
  <el-row class="warp">
    <!-- <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col> -->
    <el-col :span="24" class="warp-main">
      <!-- <section class="chart-container"> -->
        <!-- <el-row> -->
          <!-- <el-col :md="14" style="padding-top:0px;"> -->
               <!-- <el-row>
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
               </el-row> -->
               <!-- <el-row >
                    <el-col :md="12"  style="padding:0px;padding-top:30px;">
                      <el-card :body-style="{ padding: '00px' }" style="padding:0px !important;">
                        <div class="float_text">
                          <div class="rectangle"></div>
                          <span>图书类别占比</span>
                        </div>
                        <div id="chartPie"></div>
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
                          <div id="chartBar"></div>
                        <x-charts :id="id2" :option="option2"></x-charts>
                      </el-card>
                    </el-col>
               </el-row> -->
          <!-- </el-col> -->
          <!-- <el-col :md="10" style="padding-top:0px;">
            <el-card :body-style="{ padding: '00px' }" style="min-height:600px;padding: 20px 70px;">
                <el-tabs v-model="activeName2" type="card" stretch @tab-click="handleClick">
                  <el-tab-pane label="图书借阅榜" name="first" >
                      <div v-for="(item,index) in books" :key="item.index" class="paihangbang">
                        <span v-if="index===0"><img src="../assets/logo.png" style="padding-left:8px;"></span>
                        <span v-else-if="index===1">
                          <img src="../assets/logo.png">
                        </span>
                        <span v-else-if="index ===2">
                          <img src="../assets/logo.png" >
                        </span>
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
          </el-col> -->
         <!-- </el-row> -->
      <!-- </section> -->
      <el-row :gutter="10">
        <el-col :xl="16" :lg="16" :md="16">
            <div class="borderBox" ref="threeTotal">
              <el-row>
                <el-col :xl="8" :lg="8" :md="8" style="padding: 0 20px;">
                  <div class="orange">
                      <p class="book_p">当前图书总量</p>
                      <div class="booktotal" style="text-align:center;font-weight:bold;">
                        <span style="font-size:35px;">{{remainNum}}</span>本
                      </div>
                      <div class="right_text" style="font-size: 14px;text-align: right;">
                        <span>图书总数量{{libNum}}本</span>
                      </div>
                  </div>
                </el-col>
                <el-col :xl="8" :lg="8" :md="8" style="padding: 0 20px;">
                  <div class="green" @click="overdueNotice">
                    <p class="book_p">已借阅图书</p>
                    <div class="booktotal" style="text-align:center;font-weight:bold;">
                      <span style="font-size:35px;">{{loanNum}}</span>本
                    </div>
                    <div class="right_text" style="font-size: 14px;text-align: right;">
                      <span>逾期未还图书{{overNum}}本</span>
                    </div>
                  </div>
                </el-col>
                <el-col :xl="8" :lg="8" :md="8" style="padding: 0 20px;">
                  <div class="blue" @click="dealDetail">
                    <p class="book_p">处理图书</p>
                    <div class="booktotal" style="text-align:center;font-weight:bold;">
                      <span style="font-size:35px;">{{dealNum}}</span>本
                    </div>
                    <div class="right_text" style="font-size: 14px;text-align: right;">
                      <span>遗失图书{{loseNum}}本</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div style="margin: 20px 0px;">
              <el-row :gutter="10">
                <el-col :xl="12" :lg="12" :md="12" >
                  <div class="borderBox_bottom">
                    <div class="float_text">
                      <div class="rectangle"></div>
                      <span>图书类别占比</span>
                    </div>
                    <div id="chartPie" :style="index_right"></div>
                  </div>
                </el-col>
                <el-col :xl="12" :lg="12" :md="12">
                  <div class="borderBox_bottom">
                    <div class="float_text">
                      <div class="rectangle"></div>
                      <span>罚金统计</span>
                      <div class="float_right" @click="fineDetail">
                        <a href="JavaScript:;">罚金详情<i class="el-icon-d-arrow-right"></i></a>
                      </div>
                    </div>
                    <div id="chartBar" :style="index_right"></div>
                  </div>
                </el-col>
              </el-row>
            </div>
        </el-col>
        <el-col :xl="8" :lg="8" :md="8">
            <div class="borderBox">
              <ul class="tabul">
                <li @click="toggleTab(index,tab.val)" v-for="(tab,index) in tabs" :key="index" :class="{active:active === index}" class="tabli">
                    {{tab.name}}
                </li>
              </ul>
              <div>
                <ul class="tablist">
                  <li v-for="(item,index) in books" :key="index">
                    <template>
                      <div class="tablist_top" v-if="index===0" style="display: inline-block;background:url('../../static/top1.png');background-size: 100% 100%;background-position-y: 2px;">{{index+1}}</div>
                      <div class="tablist_top" v-else-if="index===1" style="display: inline-block;background:url('../../static/top2.png');background-size: 100% 100%;background-position-y: 2px;">{{index+1}}</div>
                      <div class="tablist_top" v-else-if="index===2" style="display: inline-block;background:url('../../static/top3.png');background-size: 100% 100%;background-position-y: 2px;">{{index+1}}</div>
                      <div class="tablist_top" style="display: inline-block;" v-else>{{index+1}}</div>
                    </template>
                    <span >{{item.name}}</span>
                    <span style="display:inline-block;float:right;padding-right: 5px;">{{item.num}}次</span>
                  </li>
                </ul>
              </div>
            </div>
        </el-col>
      </el-row>
    </el-col>
      <!--罚金详情界面-->
      <el-dialog title="" fullscreen :visible.sync ="fineVisible" :close-on-click-modal="false" style="width:100%;">
          <fine-detail ref="finePage"></fine-detail>
      </el-dialog>
      <!--处理详情界面-->
      <el-dialog title="" fullscreen :visible.sync ="dealVisible" :close-on-click-modal="false" style="width:100%;">
          <deal-detail ref="dealPage"></deal-detail>
      </el-dialog>
      <!-- 逾期通知界面 -->
      <el-dialog title="" fullscreen :visible.sync ="overdueVisible" :close-on-click-modal="false" style="width:100%;">
          <overduenotice @child-say="overduesay"></overduenotice>
      </el-dialog>
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
  .book_p{
    margin:0px;
    padding: 5px 0px 5px 5px;
    font-size: 15px;
    font-weight: 700;
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
    // float:left;
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
    // margin: 15px 0px 15px 0px;
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

  .borderBox{
    border: 1px solid #85CCC8;
    background-color: #FEFEFE;
    padding: 30px 0px 20px 0px;
  }
  .borderBox_bottom{
    border: 1px solid #85CCC8;
    background-color: #FEFEFE;
  }
  ul,li{
    list-style: none;
  }
  .borderBox .tabul{
    height: 35px;
    margin-bottom:0px;
    text-align: center;
    margin-top:0px;
    list-style: none;
    width: 280px;
    padding: 0px;
    margin: 0 auto;
  }
  .borderBox ul li.tabli{
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    width: 140px;
    height: 35px;
    line-height:35px;
    cursor: pointer;
    color: #85CCC8;
    background-color: #fff;
    border: 1px solid #85CCC8;
    box-sizing: border-box;
  }
  .borderBox ul .tabli.active{
    background-color: #108EE9;
    color: #fff;
  }
  .borderBox ul .tabli:first-child{
    border-radius: 7px 0px 0px 7px;
    border-right: none;
  }
  .borderBox ul .tabli:last-child{
    border-radius: 0px 7px 7px 0px;
    border-left: none;
  }
  .borderBox .tablist{
    width: 380px;
    padding: 20px 0px;
    margin: 0 auto;
  }
  .borderBox .tablist li{
    height: 38px;
    line-height: 38px;
    border-bottom:1px solid #C9C9C9;
    padding: 5px 0px;
  }
  .borderBox .tablist li:hover{
    box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.34901960784);
  }
  .borderBox .tablist li .tablist_top{
    width: 38px;
    height: 38px;
    text-align: center;
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
        active:0, //活动图书榜
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
        // index_right:0,  //首页排行榜高度
        index_right:{
          height:'0px'
        },
        tabs:[
          {
            name:'图书借阅榜',
            val:1,
          },
          {
            name:'图书狂人榜',
            val:2,
          },
        ],
        // loadingBar:false,
        // loadingPie:false,
        
      };
    },
    mounted: function () {
      this.search()
      this.indexlibinfo();
       let that= this;
      this.$nextTick(function () {
        let bodyHe=document.documentElement.clientHeight; //获取整体高度
        let index_right=bodyHe-that.$refs.threeTotal.offsetHeight-50-20-20-39-20-13; 
        that.index_right.height=index_right+"px";
      })
    },
    methods: {
      toggleTab(i,v){
        this.active=i;
        this.type = v;
        this.search();
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
          that.$message.error({showClose: true, message: '服务器异常！请稍后再试', duration: 2000});
        }).catch(function (error) {
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
          if (result && result.status === "101") {
            that.books = result.data;
          }
        }, function (err) {
          that.$message.error({showClose: true, message: '服务器异常！请稍后再试', duration: 2000});
        }).catch(function (error) {
          that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        });
      },
      //打开罚金详情
      fineDetail(){
        let that=this;
        this.fineVisible=true;
        this.$nextTick(function () {
            this.$refs.finePage.recordRest()//通过$refs找到子组件，并找到方法执行
        })
      },
      //打开处理图书界面
      dealDetail(){
        let that=this;
        this.dealVisible=true;
        this.$nextTick(function () {
            this.$refs.dealPage.fineDeal()//通过$refs找到子组件，并找到方法执行
        })
      },
      //打开逾期通知界面
      overdueNotice(){
        this.overdueVisible=true;
      },
      //子组件传递关闭逾期通知事件
      overduesay(){
        this.overdueVisible=false;
      },
      // 罚金统计
      fineTotal:function(val){
         let chartBar=Highcharts.chart('chartBar',{
           chart: {
            type: 'column'  //指定图表的类型，默认是折线图(line)
          },
          title: {
            text: ''
          },
          lang:{
            noData:'暂无数据'
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
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#000'
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
                        "fontSize":"12px",  
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
    created () {},
    components: {
      XCharts,
      fineDetail,
      dealDetail,
      overduenotice,
    },
  }
</script>
