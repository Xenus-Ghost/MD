<template>
  <button
    :is="buttonTag"
    :type="type"
    :style="[measurableStyles, style]"
    :class="[classes]"
    :to="to"
    :append="append"
    @click="$emit('click', $event)"
  >
    <div v-if="hasLeftIcon" class="button__icon button__icon_left">
      <slot name="icon_left"></slot>
    </div>
    <div class="button__content">
      <slot name="default"></slot>
    </div>
    <div v-if="hasRightIcon" class="button__icon button__icon_right">
      <slot name="icon_right"></slot>
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
      default: true
    },
    borders: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'button'
    },
    to: {
      type: String,
      default: null
    },
    href: {
      type: String,
      default: null
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
    buttonTag() {
      let str = this.tag ? this.tag : 'button'
      str = this.to && this.tag !== 'a' ? 'nuxt-link' : str
      return str
    },
    append() {
      return !!(
        this.to &&
        this.to[0] !== '/' &&
        !this.to.includes('http://') &&
        !this.to.includes('https://')
      )
    },
    /* computedHref() {
      if (this.tag === 'a' && this.to) {
        return this.to
      } else if (!this.href) {
        return null
      }
    }, */
    buttonType() {
      return this.buttonTag !== 'button' ? '' : 'button'
    },
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
        button: true,
        button_shape_circle: this.shape === 'circle',
        button_shape_rounded: this.shape === 'rounded',
        button_shape_semi_rounded: this.shape === 'semi_rounded',
        button_size_small: this.size === 'small',
        button_size_big: this.size === 'big',
        button_size_large: this.size === 'large',
        button_outline: this.borders === 'outline',
        button_neon: this.borders === 'neon'
      }
      return arr
    },
    hasLeftIcon() {
      return !!this.$slots.icon_left
    },
    hasRightIcon() {
      return !!this.$slots.icon_right
    }
  }
}
</script>

<style lang="scss">
@import '~assets/scss/framework/basic';
@import 'buttons';
</style>
