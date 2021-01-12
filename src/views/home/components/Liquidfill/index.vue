<template>
  <ve-liquidfill :data="chartData" height="100%" :settings="chartSettings" />
</template>

<script>
import commonDataMixin from '@/mixins/commonDataMixin'
export default {
  name: 'Liquidfill',
  mixins: [commonDataMixin],
  data() {
    return {
      chartData: {},
      chartSettings: {}
    }
  },
  watch: {
    userGrowthLastMonth() {
      this.chartData = {
        columns: ['title', 'percent'],
        rows: [{
          title: '用戶月同比增長',
          percent: (this.userGrowthLastMonth.substring(0, this.userGrowthLastMonth.length - 1) / 1000).toFixed(2)
        }]
      }
      this.chartSettings = {
        seriesMap: {
          用戶月同比增長: {
            radius: '80%', // 半径大小
            label: {
              formatter: (v) => {
                return `${(this.userGrowthLastMonth.substring(0, this.userGrowthLastMonth.length - 1) / 10).toFixed(2)}%`
              },
              textStyle: {
                fontSize: 24,
                color: '#999',
                fontWeight: 'normal'
              },
              position: ['50%', '50%'],
              insideColor: '#fff' // 波纹与水球重叠时的颜色
            },
            outline: { // 边框样式设置
              itemStyle: {
                borderColor: '#aaa4a4',
                borderWidth: 1,
                color: 'none',
                shadowBlur: 0,
                shadowColor: '#fff'
              },
              borderDistance: 0 // 外边框和内边框的边距
            },
            backgroundStyle: {
              color: '#fff'
            },
            itemStyle: { // 水球图取消背景色之后会有背景阴影
              shadowBlur: 0,
              shadowColor: '#fff'
            },
            amplitude: 8, // 振幅
            color: [this.getColor(this.chartData.rows[0].percent)] // 水颜色
          }
        }
      }
    }
  },
  mounted() {},
  methods: {
    getColor(value) {
      value = Number(value)
      return value > 0 && value <= 0.5 ? 'rgba(97, 216, 0, 0.7)'
        : value > 0.5 && value <= 0.8 ? 'rgba(204, 178, 26, 0.7)'
          : value > 0.8 ? 'rgba(241, 47, 28, 0.7)' : '#c7c7cb'
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
