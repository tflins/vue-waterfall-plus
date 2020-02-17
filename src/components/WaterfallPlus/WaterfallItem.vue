<template>
  <div class="waterfall-item">
    <div
      class="waterfall-item-box"
      :style="{ width: colWidth + 'px' }"
    >
      <img
        v-if="!$slots.default"
        :src="imgUrl"
        alt=""
      >
      <div
        class="waterfall-item-box-content"
        v-if="$slots.default"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  props: {
    imgUrl: String
  },

  computed: {
    colWidth() {
      return this.$parent.colWidth
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.waterfall-item {
  float: left;

  &-box {
    overflow: hidden;

    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
