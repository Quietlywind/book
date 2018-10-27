module.exports={
   pie:{
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
                // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                // chart.setTitle({
                //   text: e.target.name+ '\t'+ e.target.y + ' %'
                // });
                // this.slice();
              },
              mouseOut:function(e){
                // chart.setTitle({
                //   text:'',
                // });
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
        name: '市场份额',
        data: [
          ['Firefox',45.0],
          ['IE',       26.8],
          {name: 'Chrome',y: 12.8,
          sliced: false, //突出显示某个扇区,表示强调
          selected: true
          },
          ['Safari',8.5],
          ['Opera',6.2],
          ['其他',0.7]
        ]
      }]
    }, function(c) { // 图表初始化完毕后的会掉函数
        // 环形图圆心
        var centerY = c.series[0].center[1],
          titleHeight = parseInt(c.title.styles.fontSize);
      // 动态设置标题位置
      c.setTitle({
          y:centerY + titleHeight/2
      });
   },
   bar:{
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
        '<td style="padding:0"><b>{point.y:.1f} 本</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          borderWidth: 0,
        }
      },
      series: [{
        name: '水浒传',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      }, {
        name: '西游记',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
      }, {
        name: '红楼梦',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
      }, {
        name: '三国演义',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
      }]
  }
}