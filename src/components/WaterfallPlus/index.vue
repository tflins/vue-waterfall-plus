<template>
  <div
    class="waterfall-plus"
    ref="waterfallPlus"
    :style="{width : col * colWidth + 'px'}"
  >
    <div
      class="pic"
      v-for="(v, i) in dataList"
      :key="i"
      :style="{width : `${colWidth}px`}"
    >
      <img
        :src="v"
        alt=""
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columnData: []
    }
  },

  props: {
    dataList: {
      type: Array,
      required: true
    },
    col: {
      type: [Number, String],
      default: 4
    },
    colWidth: {
      type: [Number, String],
      default: '268'
    }
  },

  mounted() {
    console.log('ddd')
    this.render()
  },

  methods: {
    render() {
      this.columnData = []
      this.$nextTick(() => {
        console.log('ddd')
        const $waterfallPlus = this.$refs.waterfallPlus
        this.dataList.forEach((v, i) => {
          console.log('ddd')
          // if (i < this.col) {
          //   this.columnData.push()
          // }
          console.log($waterfallPlus.getElementsByClassName('pic')[i])
          this.columnData.push(i)
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.waterfall-plus {
  position: relative;
  margin: 0 auto;

  .pic {
    float: left;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(14, 34, 57, 0.12);

    img {
      width: 100%;
    }
  }
}
</style>
