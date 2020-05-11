<template>
  <div class="circle__item">
    <!--    <nuxt-link to="">-->
    <Button :to="to" shape="circle" borders="neon" height="100%" width="100%">
      <slot></slot>
    </Button>
    <!--    </nuxt-link>-->

    <svg
      :style="styles"
      width="50"
      height="150"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 80 Q 95 10 180 80" stroke="white" fill="transparent" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'CircleItem',
  props: {
    n: {
      default: 1,
      type: Number || String,
    },
    to: {
      default: null,
      type: String,
    },
  },
  computed: {
    index() {
      const n = this.$vnode.key ? this.$vnode.key : this.n
      return n
    },
    styles() {
      const obj = {
        'transform-origin': 'left bottom',
        transform:
          'translateX(50%)' +
          'translateY(-140px)' +
          ' rotate(' +
          parseInt(this.index) * (-90 * (360 / 13)) +
          'deg)',
        display: 'none',
      }
      return obj
    },
  },
}
</script>

<style lang="scss">
@import '~assets/scss/framework/basic.scss';
@import 'Circle';
</style>
