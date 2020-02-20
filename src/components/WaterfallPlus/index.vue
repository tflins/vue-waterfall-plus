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
      // 生成渲染的数据列表
      dataList: [],
      // 渲染索引
      renderIndex: 0,
      // 子组件列表
      waterfallItemList: []
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
    },
    // 图片 url 列表
    urlList() {
      let ret = []
      this.waterfallItemList.forEach((child, index) => {
        ret.push(child.imgUrl)
        child.index = index
      })
      return ret
    }
  },

  watch: {
    renderIndex(val) {
      // 当前滚动条高度
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop
      // 最小列高度
      let minHeight = Math.min.apply(null, this.columnData)

      // 最小列高度 - 滚动高度 < 可视区域高的的1.5倍
      if (minHeight - scrollTop < window.innerHeight) {
        // 渲染
        console.log('大于')
      }
      console.log(val, scrollTop, minHeight)
    }
  },

  mounted() {
    this.preLoadImg(this.urlList)
    this.bindEvent()
  },

  beforeDestroy() {
    this.removeEvent()
  },

  methods: {
    // 预加载图片获取宽高
    preLoadImg(list) {
      let count = 0
      let len = list.length

      list.forEach((url, index) => {
        const $img = new Image()
        $img.src = url
        $img.onload = $img.onerror = e => {
          if (e.type === 'load') {
            count++
            this.dataList[index] = {
              url: $img.src,
              width: $img.width,
              height: $img.height
            }

            // 设置子组件高度
            this.waterfallItemList[index].height = $img.height * this.colWidth / $img.width

            if (count === len) {
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
        this.renderIndex++
      }
    },
    // 绑定事件
    bindEvent() {},
    // 解绑事件
    removeEvent() {}
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
