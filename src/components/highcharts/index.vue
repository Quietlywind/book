<template>
      <div :id="id" :option="option"></div>
</template>

<script type="text/ecmascript-6">
import HighCharts from 'highcharts'
export default {
  data() {
    return {
      ChartPieGraph:null,
    }
  },
  components: {

  },
  props:{
      id:{
          type:String
      },
      option:{
          type:Object
      }
  },
  mounted(){
    // let id=HighCharts.chart(this.id,this.option)
    this.drawPieGraph(this.id,this.option);
  },
  watch:{},
  computed:{},
  methods:{
    drawPieGraph(id,option){
      let chartPie=HighCharts.chart(this.id,this.option)
    }
  },
  created(){
    
  }
}
</script>

<style scoped>

</style>
