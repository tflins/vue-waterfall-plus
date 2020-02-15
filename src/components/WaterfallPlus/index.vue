<template>
  <div
    class="waterfall-plus"
    ref="waterfallPlus"
    :style="{width : waterfallWidth + 'px'}"
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
      default: '268'
    },
    // 间距
    gap: {
      type: [Number, String],
      default: '16'
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
            list[index].height = ~~($img.height * this.colWidth / $img.width)
          } else {
            // 加载失败 给予一个默认高度
            list[index].height = 50
          }
          // 所有图片加载完成
          if (count === list.length) {
            console.log(list)
          }
        }
      })
    },
    // 渲染布局
    render(list) {
      this.$nextTick(() => {
        
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
