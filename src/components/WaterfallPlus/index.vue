<template>
  <div
    class="waterfall-plus"
    ref="waterfallPlus"
    :style="{width : waterfallWidth + 'px'}"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 每列高度数据
      columnData: [],
      urlList: []
    }
  },

  props: {
    // 列数
    col: {
      type: [Number, String],
      default: 4
    },
    // 每列宽度
    colWidth: {
      type: [Number, String],
      default: 268
    },
    // 间距
    gap: {
      type: [Number, String],
      default: 16
    }
  },

  computed: {
    // 父容器宽度
    waterfallWidth() {
      return this.colWidth * this.col + this.gap * (this.col - 1)
    }
  },

  watch: {
    urlList(newList, oldList) {
      console.log(newList, oldList)
      this.preLoadImg(this.urlList)
    }
  },

  mounted() {
    this.preLoadImg(this.urlList)
  },

  methods: {
    // 预加载图片获取高度
    preLoadImg(list) {
      let count = 0
      let len = list.length

      list.forEach(url => {
        const $img = new Image()
        $img.src = url
        $img.onload = $img.onerror = e => {
          if (e.type === 'load') {
            count++
            if (count === len) {
              console.log('加载完了')
              this.renderWaterfall()
            }
          }
        }
      })
    },
    // 渲染布局
    renderWaterfall() {
      const $waterfallItemList = document.querySelectorAll(
        '.waterfall-plus .waterfall-item'
      )
      for (let i = 0, len = $waterfallItemList.length; i < len; i++) {
        const $waterfallItem = $waterfallItemList[i]
        // 第一行
        if (i < this.col) {
          this.columnData.push($waterfallItem.offsetHeight)
          $waterfallItem.style.left = i * (this.gap + this.colWidth) + 'px'
        } else {
          let minHeight = Math.min.apply(null, this.columnData)
          let minIndex = this.columnData.indexOf(minHeight)

          $waterfallItem.style.left =
            minIndex * (this.gap + this.colWidth) + 'px'
          $waterfallItem.style.top = minHeight + this.gap + 'px'

          this.columnData[minIndex] += $waterfallItem.offsetHeight + this.gap
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.waterfall-plus {
  position: relative;
  margin: 0 auto;

  .img-box {
    position: absolute;
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
