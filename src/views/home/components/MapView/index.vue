<!--
 * @Author: your name
 * @Date: 2020-12-06 22:26:44
 * @LastEditTime: 2020-12-06 22:28:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \数据可视化c:\Users\Administrator\imooc-datav-report-dev\src\components\MapView\index.vue
-->
<template>
  <div class="map-view">
    <div class="left">
      <b-map-scatter />
    </div>
    <div class="right">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title">用户月同比增长</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <Liquidfill />
          </div>
        </template>
      </el-card>
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title">热门搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <word-cloud />
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>
<script>
import BMapScatter from '../BMapScatter'
import Liquidfill from '../Liquidfill'
import WordCloud from '../WordCloud'
export default {
  components: {
    BMapScatter,
    Liquidfill,
    WordCloud
  },
  data() {
    return {}
  }
}
</script>
<style lang='scss' scoped>
.map-view {
  display: flex;
  margin-top: 20px;
  .left {
    flex: 0 0 80%;
    width: 80%;
    height: 600px;
    background: #fff;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    .title {
      display: flex;
      align-items: center;
      height: 60px;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 500;
      padding: 0 0 0 20px;
    }
    .chart-wrapper {
      width: 100%;
      height: 190px;
    }
  }
}
</style>
