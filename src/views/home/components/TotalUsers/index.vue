<!--
 * @Author: your name
 * @Date: 2020-12-06 23:20:05
 * @LastEditTime: 2021-01-04 22:15:57
 * @LastEditors: qifengteng
 * @Description: In User Settings Edit
 * @FilePath: \数据可视化c:\Users\Administrator\imooc-datav-report-dev\src\components\TotalSales\index.vue
-->
<template>
  <common-card
    title="累计用户数"
    :value="userToday"
  >
    <template>
      <v-chart :options="getOptions()" />
      <div id="total-users-chart" :style="{width: '100%', height: '100%'}" />
    </template>
    <template v-slot:footer>
      <div class="total-users-footer">
        <span>日同比</span>
        <span class="emphasis">{{ userGrowthLastDay }}</span>
        <div class="increase" />
        <span class="month">月同比</span>
        <span class="emphasis">{{ userGrowthLastMonth }}</span>
        <div class="decrease" />
      </div>
    </template>
  </common-card>
</template>
<script>
  import commonCardMixin from '@/mixins/commonCardMixin'
  import commonDataMixin from '@/mixins/commonDataMixin'
  export default {
    name: 'TotalUsers',
    mixins: [commonCardMixin, commonDataMixin],
    mounted() {
      // const chartDom = document.getElementById('total-users-chart')
      // const chart = this.$echarts.init(chartDom)
      // chart.setOption()
    },
    methods: {
      getOptions() {
        return {
          xAxis: {
            type: 'value',
            show: false
          },
          yAxis: {
            type: 'category',
            show: false
          },
          series: [{
            name: '上月平台用户数',
            type: 'bar',
            stack: '总量',
            data: [this.userLastMonth],
            barWidth: 10,
            itemStyle: {
              color: '#45c946'
            }
          }, {
            name: '截至今日本月平台用户数',
            type: 'bar',
            stack: '总量',
            data: [this.userLastDay],
            itemStyle: {
              color: '#eee'
            }
          }, {
            type: 'custom',
            stack: '总量',
            data: [this.userLastMonth],
            renderItem: (params, api) => {
              // console.log(params, api)
              const value = api.value(0) // 获取上面data元素第一个值
              const endPoint = api.coord([value, 0])
              // console.log(endPoint)
              return {
                // type: 'path', // 绘制线段
                type: 'group',
                position: endPoint, // 坐标系
                children: [{
                  type: 'path',
                  shape: {
                    d: 'M128 320.001l383.744 383.744 383.744-383.744h-767.488z', // svg图像内容
                    x: -5, // 坐标轴相对偏移量
                    y: -20, // 坐标轴相对偏移量
                    width: 10,
                    height: 10,
                    layout: 'cover'
                  }, // 形状
                  style: {
                    fill: '#45c946'
                  }
                }, {
                  type: 'path',
                  shape: {
                    d: 'M511.744 319.999l-383.744 383.744h767.488l-383.744-383.744z', // svg图像内容
                    x: -5, // 坐标轴相对偏移量
                    y: 10, // 坐标轴相对偏移量
                    width: 10,
                    height: 10,
                    layout: 'cover'
                  }, // 形状
                  style: {
                    fill: '#45c946'
                  }
                }]
              }
            }
          }],
          grid: {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
          },
          tooltip: {}
        }
      }
    }
  }
</script>
<style lang='scss' scoped>
.total-users-footer {
  display: flex;
  align-items: center;
  .month {
    margin-left: 10px;
  }
}
</style>
