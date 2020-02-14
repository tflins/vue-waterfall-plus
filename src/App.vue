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
      axios.get('api/shibes?count=20&urls=true&httpsUrls=false').then(res => {
        this.dataList = res.data
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
