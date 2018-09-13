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
                this.slice();
              },
              mouseOut:function(e){
                // chart.setTitle({
                //   text:'',
                // });
                this.slice();
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
   }
}