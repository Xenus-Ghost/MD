<template>
  <div class="circle__item">
    <!--    <nuxt-link to="">-->
    <Button shape="circle" height="140px" width="140px" :to="to">
      <slot></slot>
    </Button>
    <!--    </nuxt-link>-->

    <svg
      width="50"
      height="150"
      xmlns="http://www.w3.org/2000/svg"
      :style="styles"
    >
      <path d="M10 80 Q 95 10 180 80" stroke="white" fill="transparent" />
    </svg>
  </div>
</template>

<script>
import Button from '@/components/Button/Button'
export default {
  name: 'CircleItem',
  components: {
    Button
  },
  props: {
    n: {
      default: 1,
      type: Number || String
    },
    to: {
      default: null,
      type: String
    }
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
        display: 'none'
      }
      return obj
    }
  }
}
</script>

<style lang="scss">
@import 'CircleItem';
</style>
