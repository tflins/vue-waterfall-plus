<template>
  <div>
    <img
      :src="src"
      alt=""
      :ref="`img${i}`"
    >
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  props: {
    src: String
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
