<!--
 * @Author: your name
 * @Date: 2020-12-06 22:10:12
 * @LastEditTime: 2021-01-04 23:04:00
 * @LastEditors: qifengteng
 * @Description: In User Settings Edit
 * @FilePath: \数据可视化c:\Users\Administrator\imooc-datav-report-dev\src\components\SeiesView\index.vue
-->
<template>
  <div class="sales-view">
    <el-card shadow="hover" :body-style="{padding: '0 0 20px 0'}">
      <template v-slot:header>
        <div class="menu-wrapper">
          <el-menu
            mode="horizontal"
            :default-active="activeIndex"
            class="sales-view-el-menu"
            @select="onMenuSelect"
          >
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>
          <div class="menu-right">
            <el-radio-group v-model="radioSelect" size="small">
              <el-radio-button label="今日" />
              <el-radio-button label="本周" />
              <el-radio-button label="本月" />
              <el-radio-button label="今年" />
            </el-radio-group>
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
              unlink-panels
              :picker-options="pickerOptions"
              class="sales-view-date-picker"
            />
          </div>
        </div>
      </template>
      <div class="sales-view-chart-wrapper">
        <v-chart :options="chartOption" />
        <div class="sales-view-list">
          <div class="sales-view-title">排行榜</div>
          <div class="list-item-wrapper">
            <div v-for="item in rankData" :key="item.no" class="list-item">
              <div :class="['list-item-no', +item.no <= 3 ? 'top-no' : '']">{{ item.no }}</div>
              <div class="list-item-name">{{ item.name }}</div>
              <div class="list-item-money">{{ item.money }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import commonDataMixin from '@/mixins/commonDataMixin'
export default {
  name: 'SeiesView',
  mixins: [commonDataMixin],
  data() {
    return {
      activeIndex: '1',
      radioSelect: '今日',
      date: null,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const start = new Date()
            const end = new Date()
            start.setTime(start.getTime() - 3600 * 24 * 1000 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const start = new Date()
            const end = new Date()
            start.setTime(start.getTime() - 3600 * 24 * 1000 * 30)
            picker.$emit('pick', [start, end], true)
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const start = new Date()
            const end = new Date()
            start.setTime(start.getTime() - 3600 * 24 * 1000 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      chartOption: {}
    }
  },
  computed: {
    rankData() {
      return this.activeIndex === '1' ? this.orderRank : this.userRank
    }
  },
  watch: {
    orderFullYear() {
      this.render(this.orderFullYear, this.orderFullYearAxis, '年度销售额')
    }
  },
  methods: {
    onMenuSelect(index) {
      this.activeIndex = index
      console.log(this.activeIndex)
      if (index === '1') {
        this.render(this.orderFullYear, this.orderFullYearAxis, '年度销售额')
      } else {
        this.render(this.userFullYear, this.userFullYearAxis, '年度用户访问量')
      }
    },
    render(data, axis, title) {
      this.chartOption = {
        title: {
          text: title,
          textStyle: {
            fontSize: 12,
            color: '#666'
          },
          top: 20,
          left: 25
        },
        xAxis: {
          type: 'category',
          data: axis,
          axisTick: {
            alignWithLabel: true, // 刻度线和标签对齐
            lineStyle: {
              color: '#999'
            }
          }, // 刻度线
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999'
            }
          }, // 坐标系线
          axisLabel: {
            color: '#333'
          }
        },
        yAxis: {
          axisLine: {
            show: false
          }, // 坐标系线
          axisTick: {
            show: false
          }, // 小短线
          splitLine: { // 分割线定制
            lineStyle: {
              type: 'dotted',
              color: '#eee'
            }
          }
        },
        series: [{
          type: 'bar',
          barWidth: '35%',
          data: data
        }],
        color: ['#3398DB'],
        grid: {
          top: 70,
          right: 60,
          bottom: 50,
          left: 60
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.sales-view {
  margin-top: 20px;
  .menu-wrapper {
    position: relative;
    display: flex;
    .sales-view-el-menu {
      width: 100%;
      padding-left: 20px;
      .el-menu-item {
        height: 50px;
        line-height: 50px;
        margin: 0 20px;
      }
    }
    .menu-right {
      position: absolute;
      right: 20px;
      top: 0;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .sales-view-date-picker {
        margin-left: 20px;
      }
    }
  }

  .sales-view-chart-wrapper {
    display: flex;
    height: 270px;
    .echarts {
      flex: 0 0 70%;
      width: 70%;
      height: 100%;
    }
    .sales-view-list {
      flex: 1;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .sales-view-title {
        margin-top: 20px;
        font-size: 12px;
        color: #666;
        font-weight: 500;
      }
      .list-item-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-top: 15px;
        .list-item {
          display: flex;
          align-items: center;
          font-size: 12px;
          height: 20px;
          padding: 6px 20px 6px 0;
          .list-item-no {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            color: #333;
            &.top-no {
              background: #000;
              border-radius: 50%;
              color: #fff;
              font-weight: 500;
            }
          }
          .list-item-name {
            margin-left: 10px;
            color: #333;
          }
          .list-item-money {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
