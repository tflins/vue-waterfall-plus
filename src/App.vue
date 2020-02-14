<template>
  <div id="app">
    <waterfall-plus :dataList="dataList"></waterfall-plus>
  </div>
</template>

<script>
import WaterfallPlus from '@/components/WaterfallPlus'

export default {
  data() {
    return {
      dataList: []
    }
  },

  components: {
    WaterfallPlus
  },

  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
