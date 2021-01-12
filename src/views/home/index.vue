<!--
 * @Author: your name
 * @Date: 2020-12-06 21:28:46
 * @LastEditTime: 2021-01-04 20:46:18
 * @LastEditors: qifengteng
 * @Description: In User Settings Edit
 * @FilePath: \数据可视化c:\Users\Administrator\imooc-datav-report-dev\src\views\Home.vue
-->
<template>
  <div class="home">
    <top-view />
    <sales-view />
    <bottom-view />
    <map-view />
  </div>
</template>

<script>
import TopView from './components/TopView'
import SalesView from './components/SalesView'
import BottomView from './components/BottomView'
import MapView from './components/MapView'
import { wordcloud, mapScatter, screenData } from '../../api/home'
export default {
  name: 'Home',
  components: {
    TopView,
    SalesView,
    BottomView,
    MapView
  },
  data() {
    return {
      reportData: null,
      wordcloud: null,
      mapData: null
    }
  },
  provide() {
    return {
      getReportData: this.getReportData,
      getWordcloud: this.getWordcloud,
      getMapData: this.getMapData
    }
  },
  mounted() {
    screenData().then(data => {
      this.reportData = data
    })
    wordcloud().then(data => {
      this.wordcloud = data
    })
    mapScatter().then(data => {
      this.mapData = data
    })
  },
  methods: {
    getReportData() {
      return this.reportData
    },
    getWordcloud() {
      return this.wordcloud
    },
    getMapData() {
      return this.mapData
    }
  }
}
</script>
<style>
.home {
  width: 100%;
  padding: 20px;
  background-color: #ccc;
  box-sizing: border-box;
}
</style>
