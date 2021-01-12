<!--
 * @Author: your name
 * @Date: 2020-12-06 23:20:05
 * @LastEditTime: 2021-01-04 21:40:28
 * @LastEditors: qifengteng
 * @Description: In User Settings Edit
 * @FilePath: \数据可视化c:\Users\Administrator\imooc-datav-report-dev\src\components\TotalSales\index.vue
-->
<template>
  <common-card
    title="累计订单量"
    :value="orderToday"
  >
    <template>
      <v-chart :options="getOptions()" />
      <div id="total-order-chart" :style="{ width: '100%', height: '100%' }" />
    </template>
    <template v-slot:footer>
      <span>昨日订单量 </span>
      <span class="emphasis">{{ orderLastDay }}</span>
    </template>
  </common-card>
</template>
<script>
  import commonCardMixin from '@/mixins/commonCardMixin'
  import commonDataMixin from '@/mixins/commonDataMixin'
  export default {
    name: 'TotalOrders',
    mixins: [commonCardMixin, commonDataMixin],
    mounted() {
      // const chartDom = document.getElementById('total-order-chart')
      // const chart = this.$echarts.init(chartDom) // 参数,dom, (主题light,dark), (渲染模式{render: 'svg'})
      // chart.setOption({})
    },
    methods: {
      getOptions() {
        return this.orderTrend.length > 0 ? {
          xAxis: {
            type: 'category',
            show: false,
            boundaryGap: false // 指默认true,图表距x轴两侧会有一点边距
          },
          yAxis: {
            show: false
          },
          series: [{
            type: 'line',
            data: this.orderTrend,
            areaStyle: {
              color: 'purple' // 面积颜色
            },
            lineStyle: {
              width: 0 // 线条样式
            },
            itemStyle: {
              // width: 0
              opacity: 0 // 坐标点样式  itemStyle
            },
            smooth: true // 平滑线条
          }],
          grid: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }
        } : null
      }
    }
  }
</script>
<style lang="scss" scoped></style>
