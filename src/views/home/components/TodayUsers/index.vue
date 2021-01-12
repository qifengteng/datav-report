<!--
 * @Author: your name
 * @Date: 2020-12-06 23:20:05
 * @LastEditTime: 2021-01-04 22:02:16
 * @LastEditors: qifengteng
 * @Description: In User Settings Edit
 * @FilePath: \数据可视化c:\Users\Administrator\imooc-datav-report-dev\src\components\TotalSales\index.vue
-->
<template>
  <common-card
    title="今日交易用户数"
    :value="orderUser"
  >
    <template>
      <v-chart :options="getOptions()" />
      <div id="today-users-chart" :style="{ width: '100%', height: '100%' }" />
    </template>
    <template v-slot:footer>
      <span>退货率 </span>
      <span class="emphasis">{{ returnRate }}</span>
    </template>
  </common-card>
</template>
<script>
  import commonCardMixin from '@/mixins/commonCardMixin'
  import commonDataMixin from '@/mixins/commonDataMixin'
  export default {
    name: 'TodayUsers',
    mixins: [commonCardMixin, commonDataMixin],
    mounted() {
      // const chartDom = document.getElementById('today-users-chart')
      // const chart = this.$echarts.init(chartDom)
      // chart.setOption()
    },
    methods: {
      getOptions() {
        return {
          color: ['#3398DB'], // 柱状图颜色
          tooltip: {},
          xAxis: {
            type: 'category',
            data: this.userFullYearAxis,
            show: false
          },
          yAxis: {
            show: false
          },
          series: [
            {
              name: '用户实时交易量',
              type: 'bar',
              data: this.orderUserTrend,
              barWidth: '60%' // 柱状图的宽度
            }
          ],
          grid: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }
        }
      }
    }
  }
</script>
<style></style>
