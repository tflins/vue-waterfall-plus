<template>
  <div
    class="waterfall-item"
    :style="{ width: colWidth + 'px' }"
  >
    <div
      class="waterfall-item-top-box"
      :style="[{ width: colWidth + 'px' }]"
    >
      <img
        v-if="!$slots.default"
        :src="imgUrl"
        alt=""
        :style="[{ height: height + 'px' }]"
      >
      <div
        class="waterfall-item-box-content"
        v-if="$slots.default"
      >
        <slot></slot>
      </div>
    </div>
    <div
      class="waterfall-item-footer"
      v-if="$slots.footer"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: -1,
      height: 0
    }
  },

  props: {
    imgUrl: String
  },

  computed: {
    colWidth() {
      return this.$parent.colWidth
    }
  },

  beforeCreate() {
    this.$parent.waterfallItemList.push(this)
  },

  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.waterfall-item {
  position: absolute;
  box-shadow: 0px 2px 2px 0px rgba(14, 34, 57, 0.08);
  border-radius: 4px;
  overflow: hidden;

  &-top-box {
    overflow: hidden;

    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
