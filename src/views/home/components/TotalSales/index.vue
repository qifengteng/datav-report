<!--
 * @Author: your name
 * @Date: 2020-12-06 23:20:05
 * @LastEditTime: 2021-01-04 21:07:16
 * @LastEditors: qifengteng
 * @Description: In User Settings Edit
 * @FilePath: \数据可视化c:\Users\Administrator\imooc-datav-report-dev\src\components\TotalSales\index.vue
-->
<template>
  <common-card
    title="累计销售额"
    :value="salesToday"
  >
    <template>
      <div class="compare-wrapper">
        <div class="compare">
          <span>日同比</span>
          <span class="emphasis">{{ salesGrowthLastDay }}</span>
          <div class="increase" />
        </div>
        <div class="compare">
          <span>月同比</span>
          <span class="emphasis">{{ orderGrowthLastMonth }}</span>
          <div class="decrease" />
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <span>昨日销售额 </span>
      <span class="emphasis">{{ salesLastDay }}</span>
    </template>
  </common-card>
</template>
<script>
  import commonCardMixin from '@/mixins/commonCardMixin'
  import commonDataMixin from '@/mixins/commonDataMixin'
  export default {
    name: 'TotalSales',
    mixins: [commonCardMixin, commonDataMixin]
  }
</script>
<style lang="scss" scoped>
  .compare-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .compare {
      display: flex;
      align-items: center;
      font-size: 12px;
      margin-top: 3px;
      color: #666;
    }
  }
</style>
