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
      columnData: []
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

  mounted() {
    // this.preLoadImg(this.dataList)
  },

  methods: {
    // 预加载图片获取高度
   
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
