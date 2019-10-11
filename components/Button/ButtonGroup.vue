<template>
  <div class="buttons_group" :class="[classes]">
    <slot></slot>
  </div>
</template>
<script>
import { Measurable } from '@/assets/js/mixins/measurables/index.js'
export default {
  name: 'Button',
  mixins: [Measurable],
  props: {
    type: {
      default: 'grid',
      type: String
    },
    size: {
      default: 'normal',
      type: String
    }
    // small: {
    //   type: Boolean,
    //   default: false
    // },
    // big: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      baseClassName: 'button'
    }
  },
  computed: {
    style() {
      return {
        // 'height': (this.height + 'px').replace('pxpx', 'px').replace('%px', '%'),
        'background-color': this.color
        // 'max-height': (this.maxHeight + 'px').replace('pxpx', 'px').replace('%px', '%'),
        // 'max-width': (this.maxWidth + 'px').replace('pxpx', 'px').replace('%px', '%'),
        // 'min-height': (this.minHeight + 'px').replace('pxpx', 'px').replace('%px', '%'),
        // 'min-width': (this.minWidth + 'px').replace('pxpx', 'px').replace('%px', '%')
      }
    },
    classes() {
      const arr = {
        buttons_group_grid: this.type
      }
      return arr
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/framework/index';
@import 'buttons';
</style>
