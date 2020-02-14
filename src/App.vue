<template>
  <div id="app">
    <waterfall-plus v-if="dataList.length" :dataList="dataList"></waterfall-plus>
  </div>
</template>

<script>
import WaterfallPlus from '@/components/WaterfallPlus'
import axios from 'axios'

export default {
  data() {
    return {
      dataList: []
    }
  },

  components: {
    WaterfallPlus
  },

  created() {
    this.getDataList()
  },

  methods: {
    getDataList() {
      axios.get('api/shibes?count=30&urls=true&httpsUrls=false').then(res => {
        this.dataList = res.data.map(v => ({ url: v }))
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
