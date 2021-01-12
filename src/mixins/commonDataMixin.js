/*
 * @Author: qifengteng
 * @Date: 2021-01-03 23:53:28
 * @LastEditors: qifengteng
 * @LastEditTime: 2021-01-06 22:17:17
 * @Description: i love you mikasa
 */
function format(v) {
  // return (+v).toLocaleString() // 转千分位.1.符号局限性,2.语言限制影响结果
  const reg = /\d{1,3}(?=(\d{3})+$)/g
  // console.log(`${v}`.match(reg))
  return `${v}`.replace(reg, '$&,')
}

function wrapperMoney(o, k) {
  return o && o[k] ? `¥ ${format(o[k])}` : '¥ 0.00'
}

function wrapperNumber(o, k) {
  return o && o[k] ? format(o[k]) : 0
}

function wrapperArray(o, k) {
  return o && o[k] ? o[k] : []
}

function wrapperPercentage(o, k) {
  return o && o[k] ? `${o[k]}%` : '0%'
}

function wrapperOriginalNumber(o, k) {
  return o && o[k] ? o[k] : 0
}

function wrapperObject(o, k) {
  if (o && k.indexOf('.') >= 0) {
    const keys = k.split('.')
    keys.forEach((key) => {
      o = o[key]
    })
    return o
  } else {
    return o && o[k] ? o[k] : {}
  }
}

export default {
  computed: {
    // 累计销售额
    reportData() {
      return this.getReportData()
    },
    wordcloud() {
      return this.getWordcloud()
    },
    mapData() {
      return this.getMapData()
    },
    salesToday() {
      return wrapperMoney(this.reportData, 'salesToday')
    },
    salesGrowthLastDay() {
      return wrapperPercentage(this.reportData, 'salesGrowthLastDay')
    },
    orderGrowthLastMonth() {
      return wrapperPercentage(this.reportData, 'orderGrowthLastMonth')
    },
    salesLastDay() {
      return wrapperMoney(this.reportData, 'salesLastDay')
    },
    // 累计订单量
    orderToday() {
      return wrapperNumber(this.reportData, 'orderToday')
    },
    orderLastDay() {
      return wrapperNumber(this.reportData, 'orderLastDay')
    },
    orderTrend() {
      return wrapperArray(this.reportData, 'orderTrend')
    },
    // 今日交易用户数
    orderUser() {
      return wrapperNumber(this.reportData, 'orderUser')
    },
    returnRate() {
      return wrapperPercentage(this.reportData, 'returnRate')
    },
    orderUserTrend() {
      return wrapperArray(this.reportData, 'orderUserTrend')
    },
    userFullYearAxis() {
      return wrapperArray(this.reportData, 'userFullYearAxis')
    },
    // 累计用户数
    userToday() {
      return wrapperNumber(this.reportData, 'userToday')
    },
    userGrowthLastDay() {
      return wrapperPercentage(this.reportData, 'userGrowthLastDay')
    },
    userGrowthLastMonth() {
      return wrapperPercentage(this.reportData, 'userGrowthLastMonth')
    },
    userLastMonth() {
      return wrapperOriginalNumber(this.reportData, 'userLastMonth')
    },
    userLastDay() {
      return wrapperOriginalNumber(this.reportData, 'userLastDay')
    },
    // 年度销售额
    orderFullYear() {
      return wrapperArray(this.reportData, 'orderFullYear')
    },
    orderFullYearAxis() {
      return wrapperArray(this.reportData, 'orderFullYearAxis')
    },
    orderRank() {
      return wrapperArray(this.reportData, 'orderRank')
    },
    userFullYear() {
      return wrapperArray(this.reportData, 'userFullYear')
    },
    userRank() {
      return wrapperArray(this.reportData, 'userRank')
    },
    category1() {
      return wrapperObject(this.reportData, 'category.data1')
    },
    category2() {
      return wrapperObject(this.reportData, 'category.data2')
    }
  },
  methods: {
    format(v) {
      return format(v)
    }
  },
  filters: {
    format(v) {
      return format(v)
    }
  },
  inject: ['getReportData', 'getWordcloud', 'getMapData']
}
