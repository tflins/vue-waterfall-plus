<template>
  <div
    class="waterfall-plus"
    ref="waterfallPlus"
    :style="{width : waterfallWidth + 'px'}"
  >
    <div
      class="img-box"
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
      // 每列高度数据
      columnData: []
    }
  },

  props: {
    // 数据列表
    dataList: {
      type: Array,
      required: true
    },
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

  mounted() {
    this.preLoadImg(this.dataList)
  },

  methods: {
    // 预加载图片获取高度
    preLoadImg(list) {
      let count = 0

      list.forEach((item, index) => {
        const $img = new Image()
        $img.src = item.url

        $img.onload = $img.onerror = e => {
          count++
          if (e.type === 'load') {
            // 获取图片缩放后的高度
            list[index].height = ~~(($img.height * this.colWidth) / $img.width)
          } else {
            // 加载失败 给予一个默认高度
            list[index].height = 50
          }
          // 所有图片加载完成
          if (count === list.length) {
            this.render()
          }
        }
      })
    },
    // 渲染布局
    render() {
      this.$nextTick(() => {
        this.setItemPosition()
      })
    },
    // 设置每个 item 的定位
    setItemPosition() {
      const $imgBoxList = document.querySelectorAll('.waterfall-plus .img-box')
      for (let i = 0, len = $imgBoxList.length; i < len; i++) {
        const $tempEle = $imgBoxList[i]
        let height = $tempEle.offsetHeight

        // 布局第一行
        if (i < this.col) {
          // 存储第一行每列的高度
          this.columnData.push(height)
          if (i % this.col === 0) {
            $tempEle.style.left = `0px`
          } else {
            $tempEle.style.left = i * (this.colWidth + this.gap) + 'px'
          }
        } else {
          // 布局其他行
          let minHeight = Math.min.apply(null, this.columnData)
          let minIndex = this.columnData.indexOf(minHeight)

          $tempEle.style.top = minHeight + this.gap + 'px'
          $tempEle.style.left = $imgBoxList[minIndex].offsetLeft + 'px'

          this.columnData[minIndex] += $tempEle.offsetHeight + this.gap
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
