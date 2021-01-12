/*
 * @Author: your name
 * @Date: 2020-12-08 23:49:57
 * @LastEditTime: 2020-12-08 23:51:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \数据可视化c:\Users\Administrator\imooc-datav-report-dev\src\plugins\vcharts.js
 */
import Vue from 'vue'
import VELine from 'v-charts/lib/line.common'
import VCharts from 'v-charts'
import 'v-charts/lib/style.css'

Vue.component('ve-line', VELine)
Vue.use(VCharts)
