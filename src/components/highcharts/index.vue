<template>
  <div class="page">
      <div :id="id" :option="option"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import HighCharts from 'highcharts'
export default {
  data() {
    return {

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
    HighCharts.chart(this.id,this.option)
  },
  watch:{},
  computed:{},
  methods:{},
  created(){}
}
</script>

<style scoped>
.page{}
</style>
