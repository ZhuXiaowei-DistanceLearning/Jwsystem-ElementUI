<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'
  import service from '../../../utils/request'

  const animationDuration = 6000

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      }
    },
    data() {
      return {
        chart: null,
        trueNum: null,
        total: null,
        falseNum: null,
        data:[{
          name: 'Apples',
          value: 70
        }, {
          name: 'Strawberries',
          value: 68
        }, {
          name: 'Bananas',
          value: 48
        }, {
          name: 'Oranges',
          value: 40
        }, {
          name: 'Pears',
          value: 32
        }, {
          name: 'Pineapples',
          value: 27
        }, {
          name: 'Grapes',
          value: 18
        }]
      }
    },
    mounted() {
      this.initChart()
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
      /*  service.get('/api/count/productIdentify').then(res => {
        this.trueNum = res.trueNum
        this.total = res.total
        this.falseNum = this.total - this.trueNum
        this.chart.setOption({
          series: [{
            data: [{ value: (this.trueNum / this.total * 100).toFixed(2), name: '真假占比' }]
          }]
        })
      })*/
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHandler)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          title:{
            text:"本周考勤情况",
            left:'50%',
            top:'10',
            textStyle:{
              color:'black',
              fontFamily:'Courier New'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['1-2节', '3-4节', '5-6节', '7-8节', '9-10节', '1,2,3,4节', '5,6,7,8节'],
            orient:'vertical',
            left:10,
            top:50
          },
          grid: {
            left: '13%',
            bottom: '3%',
            right:0,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '1-2节',
              type: 'bar',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '3-4节',
              type: 'bar',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '5-6节',
              type: 'bar',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '7-8节',
              type: 'bar',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '9-10节',
              type: 'bar',
              data: [862, 1018, 964, 1026, 1679, 1600, 1570],
              markLine: {
                lineStyle: {
                  type: 'dashed'
                },
                data: [
                  [{type: 'min'}, {type: 'max'}]
                ]
              }
            },
            {
              name: '1,2,3,4节',
              type: 'bar',
              barWidth: 5,
              data: [620, 732, 701, 734, 1090, 1130, 1120]
            },
            {
              name: '5,6,7,8节',
              type: 'bar',
              data: [120, 132, 101, 134, 290, 230, 220]
            },
          ]
        })
      }
    }
  }
</script>
