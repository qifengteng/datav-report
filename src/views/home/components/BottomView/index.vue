<!--
 * @Author: your name
 * @Date: 2020-12-06 22:13:38
 * @LastEditTime: 2021-01-06 00:11:09
 * @LastEditors: qifengteng
 * @Description: In User Settings Edit
 * @FilePath: \数据可视化c:\Users\Administrator\imooc-datav-report-dev\src\components\BottomView\index.vue
-->
<template>
  <div class="bottom-view">
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">关键词搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <div class="chart-inner">
              <div class="chart">
                <div class="chart-title">搜索用户数</div>
                <div class="chart-data">{{ userCount }}</div>
                <v-chart :options="searchUserOption" />
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">{{ searchCount | format }}</div>
                <v-chart :options="searchNumOption" />
              </div>
            </div>
            <div class="table-wrapper">
              <el-table :data="tableData">
                <el-table-column prop="rank" label="排名" />
                <el-table-column prop="keyword" label="关键词" />
                <el-table-column prop="count" label="总搜索量" />
                <el-table-column prop="users" label="搜索用户数" />
                <el-table-column prop="range" label="搜索占比" />
              </el-table>
              <el-pagination
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="total"
                background
                @current-change="onPageChange"
              />
            </div>
          </div>
        </template>
      </el-card>
    </div>
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">
            <div class="title">分类销售排行</div>
            <div class="radio-wrapper">
              <el-radio-group v-model="radioSelect" size="small" @change="onPieChartCategory">
                <el-radio-button label="品类" />
                <el-radio-button label="商品" />
              </el-radio-group>
            </div>
          </div>
        </template>
        <template>
          <div class="chart-wrapper">
            <v-chart :options="categoryOption" />
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>
<script>
import commonDataMixin from '@/mixins/commonDataMixin'
const colors = ['#8d7fec', '#5085f2', '#f8726b', '#e7e702', '#78f283', '#4bc1fc']
export default {
  mixins: [commonDataMixin],
  data() {
    return {
      searchUserOption: {},
      searchNumOption: {},
      tableData: [],
      totalData: [],
      total: 0,
      pageSize: 4,
      userCount: 0,
      searchCount: 0,
      radioSelect: '品类',
      categoryOption: {}
    }
  },
  watch: {
    wordcloud() {
      const totalData = []
      this.wordcloud.forEach((item, index, Array) => {
        totalData.push({
          id: index + 1,
          rank: index + 1,
          keyword: item.word,
          count: item.count,
          users: item.user,
          range: `${((item.user / item.count) * 100).toFixed(2)}%`
        })
      })
      this.totalData = totalData
      this.total = this.totalData.length
      this.renderTable(1)
      this.userCount = this.format(this.totalData.reduce((s, i) => i.users + s, 0))
      this.searchCount = this.totalData.reduce((s, i) => i.count + s, 0)
      this.renderLinechart()
    },
    category1() {
      this.renderPieChart()
    }
  },
  mounted() {
    this.renderPieChart()
  },
  methods: {
    onPieChartCategory() {
      this.renderPieChart()
    },
    onPageChange(page) {
      this.renderTable(page)
    },
    renderTable(page) {
      this.tableData = this.totalData.slice((page - 1) * this.pageSize, ((page - 1) * this.pageSize) + this.pageSize)
    },
    renderPieChart() {
      if (!this.category1.data1 || !this.category2.data1) return
      let data
      let axis
      let total = 0
      if (this.radioSelect === '品类') {
        data = this.category1.data1.slice(0, 6)
        axis = this.category1.axisX.slice(0, 6)
        total = data.reduce((s, i) => s + i, 0)
      } else {
        data = this.category2.data1.slice(0, 6)
        axis = this.category2.axisX.slice(0, 6)
        total = data.reduce((s, i) => s + i, 0)
      }
      const chartData = []
      data.forEach((item, index, array) => {
        const percent = `${(item / total * 100).toFixed(2)}%`
        chartData.push({
          legendname: axis[index],
          value: item,
          percent: percent,
          itemStyle: {
            color: colors[index]
          },
          name: `${axis[index]} | ${percent}`
        })
      })
      this.categoryOption = {
        title: [{
          text: `${this.radioSelect}分布`,
          textStyle: {
            fontSize: 14,
            color: '#666'
          },
          left: 20,
          top: 20
        }, {
          text: '累计订单量',
          subtext: total,
          x: '34.5%', // 调节标题的位置
          y: '42.5%', // 调节标题的位置
          textStyle: { // 标题样式
            fontSize: 14,
            color: '#999'
          },
          subtextStyle: { // 副标题样式
            fontSize: 28,
            color: '#333'
          },
          textAlign: 'center' // 居中
        }],
        series: [{
          name: `${this.radioSelect}分布`,
          type: 'pie',
          data: chartData,
          label: {
            normal: {
              show: true,
              position: 'outter', // label显示的位置
              formatter: function(params) {
                return `${params.data.legendname}`
              }
            }
          },
          center: ['35%', '50%'], // 圆心的位置[100, 100]
          radius: ['45%', '60%'], // 内半径和外半径
          labelLine: {
            normal: {
              length: 5, // 线段1,靠近环
              length2: 3, // 线段2,不靠近环
              smooth: true // 平滑线段
            }
          },
          clockwise: false, // 数据排列顺序,为true为顺时针
          itemStyle: { // item加边距
            borderWidth: 4,
            borderColor: '#fff'
          }
        }],
        legend: {
          type: 'scroll', // 图例超出可滚动
          orient: 'vertical', // 图例的排列方式水平和垂直
          height: 250, // 高度
          left: '70%',
          top: 'middle',
          textStyle: {
            color: '#8c8c8c'
          }
        },
        tooltip: {
          trigger: 'item', // 触发类型
          formatter: function(params) {
            // console.log(params)
            const str = params.seriesName + '<br />' +
              params.marker + params.data.legendname + '<br />' +
              '数量: ' + params.data.value + '<br />' +
              '占比: ' + params.data.percent + '%'
            return str
          }
        }
      }
    },
    renderLinechart() {
      const creatcOption = (key) => {
        const axis = []
        const data = []
        this.wordcloud.forEach((item, index) => data.push(item[key]))
        this.wordcloud.forEach((item, index) => axis.push(item.word))
        return {
          xAxis: {
            type: 'category',
            show: false,
            boundaryGap: false, // 坐标轴两边留白策略
            data: axis
          },
          yAxis: {
            show: false,
            min: 0
          },
          tooltip: {},
          series: [{
            type: 'line',
            data: data,
            areaStyle: {
              color: 'rgba(95, 187, 255, .5)' // 面积颜色
            },
            lineStyle: {
              color: 'rgba(95, 187, 255, .5)'
              // width: 0 // 线条样式
            },
            itemStyle: { // 折线拐点标志的样式
              // width: 0
              opacity: 0
            },
            smooth: true // 平滑线条
          }],
          grid: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }
        }
      }
      this.searchUserOption = creatcOption('user')
      this.searchNumOption = creatcOption('count')
    }
  }
}
</script>
<style lang='scss' scoped>
.bottom-view {
  display: flex;
  margin-top: 20px;
  .view {
    flex: 1;
    width: 50%;
    box-sizing: border-box;
    &:first-child {
      padding: 0 10px 0 0;
    }
    &:last-child {
      padding: 0 0 0 10px;
    }
    .title-wrapper {
      display: flex;
      align-items: center;
      height: 60px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      font-weight: 500;
      padding: 0 0 0 20px;
      .radio-wrapper {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        margin-right: 20px;
      }
    }
    .chart-wrapper {
      display: flex;
      flex-direction: column;
      height: 452px;
      .chart-inner {
        display: flex;
        padding: 0 10px;
        margin-top: 20px;
        .chart {
          flex: 1;
          width: 50%;
          padding: 0 10px;
          .chart-title {
            color: #999;
            font-size: 14px;
          }
          .chart-data {
            font-size: 22px;
            color: #333;
            font-weight: 500;
            letter-spacing: 2px;
          }
          .echarts {
            height: 50px;
          }
        }
      }
      .table-wrapper {
        flex: 1;
        margin-top: 20px;
        padding: 0 20px 20px;
        .el-pagination {
          display: flex;
          justify-content: flex-end;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
