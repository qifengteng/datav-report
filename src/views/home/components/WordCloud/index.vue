<template>
  <ve-wordcloud :data="chartData" height="100%" :settings="chartSettings" />
</template>

<script>
import commonDataMixin from '@/mixins/commonDataMixin'
export default {
  name: 'WordCloud',
  mixins: [commonDataMixin],
  data() {
    return {
      chartData: {},
      chartSettings: {}
    }
  },
  watch: {
    wordcloud() {
      const data = []
      this.wordcloud.forEach((item, index, array) => {
        data.push({
          name: item.word,
          value: item.count
        })
      })
      this.chartData = {
        columns: ['name', 'value'],
        rows: data
      }
    }
  },
  mounted() {
    this.chartSettings = {
      color: [
        'rgba(97, 216, 0, .7)',
        'rgba(204, 178, 26, .7)',
        'rgba(245, 166, 35, .7)',
        'rgba(156, 13, 113, .7)'
      ]
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>

</style>
