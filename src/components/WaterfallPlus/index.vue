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
        :src="v.url"
        alt=""
        :ref="`img${i}`"
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
    this.render()
  },

  methods: {
    // 渲染
    render() {
      this.columnData = []
      this.loaderCount = 0
      this.$nextTick(() => {
        const $waterfallPlus = this.$refs.waterfallPlus

        this.dataList.forEach((v, i) => {
          const $img = new Image()
          $img.src = v.url
          $img.addEventListener('load', () => {
            this.loaderCount++
            this.dataList[i]._height = $img.height * (this.colWidth / $img.width)
            console.log(this.loaderCount)

            if (this.loaderCount === this.dataList.length) {
              // 预加载完成 布局
              for (let j = 0, len = this.dataList.length; j < len; j++) {
                const $item = $waterfallPlus.getElementsByClassName('pic')[j]
                if (j < this.col) {
                  this.columnData.push($item.offsetHeight)
                }
                let minHeight = Math.min.apply(null, this.columnData)
                let minIndex = this.columnData.indexOf(minHeight)
                // console.log(minIndex)
                if (j >= this.col) {

                  
                  $item.style.position = 'absolute'
                  $item.style.top = minHeight + 'px'
                  $item.style.left = minIndex * this.colWidth + 'px'

                  console.log(this.dataList[j]._height)

                  this.columnData[minIndex] = this.dataList[j]._height + minHeight
                }
              }
            }
          })
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

    /deep/ img {
      display: block;
      width: 100%;
    }
  }
}
</style>
