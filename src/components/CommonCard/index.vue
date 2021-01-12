<!--
 * @Author: your name
 * @Date: 2020-12-06 23:15:14
 * @LastEditTime: 2021-01-04 21:59:39
 * @LastEditors: qifengteng
 * @Description: In User Settings Edit
 * @FilePath: \数据可视化c:\Users\Administrator\imooc-datav-report-dev\src\components\CommonCard\index.vue
-->
<template>
  <div class="common-card">
    <div class="title">{{ title }}</div>
    <div class="value">{{ value }}</div>
    <div class="chart">
      <slot />
    </div>
    <div class="line" />
    <div class="total">
      <slot name="footer" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    value: {
      type: [String, Number],
      default() {
        return '' || 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .title {
    font-size: 12px;
    color: #999;
  }
  .value {
    font-size: 25px;
    color: #000;
    margin-top: 5px;
    letter-spacing: 1px;
  }
  .chart {
    height: 50px;
  }
  .line {
    margin: 10px 0;
    border-top: 1px solid #eee;
  }
  .total {
    color: #666;
    font-size: 12px;
  }
</style>
<style lang="scss">
  .compare {
    color: #666;
    margin-top: 3px;
    font-size: 12px;
  }
  .increase {
    width: 0;
    height: 0;
    border-width: 3px;
    border-color: transparent transparent red transparent;
    border-style: solid;
    margin: 0 0 3px 5px;
  }
  .decrease {
    width: 0;
    height: 0;
    border-width: 3px;
    border-color: green transparent transparent transparent;
    border-style: solid;
    margin: 3px 0 0 5px;
  }
  .emphasis {
    margin-left: 5px;
    color: #000;
    font-weight: 700;
  }
</style>
