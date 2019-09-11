<template>
  <button :type="type" :style="[measurableStyles, style]" :class="[classes]">
    <div class="button__content">
      <slot>
        Button
      </slot>
    </div>
  </button>
</template>
<script>
import { Measurable } from '@/assets/js/mixins/measurables/index.js'
export default {
  name: 'Button',
  mixins: [Measurable],
  props: {
    type: {
      default: 'button',
      type: String
    },
    size: {
      default: 'normal',
      type: String
    },
    // round: {
    //   default: true,
    //   type: Boolean
    // },
    shape: {
      default: '',
      type: String
    },
    outline: {
      type: Boolean,
      default: false
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
      // classList: '',
      // sizeClass: 'button' + '--' + this.size
      // shapeClass: 'button' + '--' + this.shape
      // classes: function () {
      //   return {
      //
      //   }
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
      return {
        button: true,
        button_shape_circle: this.shape === 'circle',
        button_shape_rounded: this.shape === 'rounded',
        button_size_small: this.size === 'small',
        button_size_big: this.size === 'big',
        button_size_large: this.size === 'large',
        button_outline: this.outline
      }
    }
  }
}
</script>

<style lang="scss">
@import 'buttons';
</style>
