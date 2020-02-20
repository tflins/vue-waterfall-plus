<template>
  <div id="app">

    <waterfall-plus v-if="dataList.length">

      <waterfall-item
        v-for="(v, i) in dataList"
        :key="i"
        :img-url="v.img.url"
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

import utils from '@/utils'

const LIST_LENGTH = 50

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
      for (let i = 0, len = LIST_LENGTH; i < len; i++) {
        this.dataList.push({
          img: {
            url: `/imgs/${utils.randomIntNum(1, 9)}.jpg`
          }
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
