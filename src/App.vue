<template>
  <div id="app">

    <waterfall-plus v-if="dataList.length">

      <waterfall-item
        v-for="(v, i) in dataList"
        :key="i"
        :img-url="v.url"
      >
      <template v-slot:footer>
        xxxxxx
      </template>
      </waterfall-item>

    </waterfall-plus>

  </div>
</template>

<script>
import WaterfallPlus from '@/components/WaterfallPlus'
import WaterfallItem from '@/components/WaterfallPlus/WaterfallItem'
import axios from 'axios'

export default {
  data() {
    return {
      dataList: []
    }
  },

  components: {
    WaterfallItem,
    WaterfallPlus
  },

  created() {
    this.getDataList()
  },

  methods: {
    getDataList() {
      axios.get('api/shibes?count=6&urls=true&httpsUrls=false').then(res => {
        this.dataList = res.data.map(v => ({ url: v }))
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
