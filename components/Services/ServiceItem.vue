<template>
  <div :class="[classes, gridClasses]" class="service__item">
    <div class="service__icon">
      <slot name="icon"></slot>
    </div>
    <div class="service__title">
      <slot name="default"></slot>
    </div>
    <div class="service__footer">
      <slot name="footer"></slot>
    </div>
    <svg
      width="11"
      height="178"
      viewBox="0 0 11 178"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style="display: none"
    >
      <g filter="url(#filter0_f)">
        <line
          x1="5.5"
          y1="4"
          x2="5.49999"
          y2="174"
          stroke="url(#paint0_radial)"
          stroke-width="3"
        />
      </g>
      <g filter="url(#filter1_f)">
        <line
          x1="5"
          y1="4"
          x2="4.99999"
          y2="174"
          stroke="url(#paint1_radial)"
          stroke-width="2"
        />
      </g>
      <defs>
        <filter
          id="filter0_f"
          x="0"
          y="0"
          width="11"
          height="178"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur" />
        </filter>
        <filter
          id="filter1_f"
          x="3"
          y="3"
          width="4.00001"
          height="172"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
        </filter>
        <radialGradient
          id="paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(3.49988 89) rotate(89.663) scale(85.0015 10952.3)"
        >
          <stop stop-color="#7BD7FF" />
          <stop offset="1" stop-color="#7BD7FF" stop-opacity="0" />
        </radialGradient>
        <radialGradient
          id="paint1_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(3.49973 89.0001) rotate(89.5203) scale(59.7318 18567.2)"
        >
          <stop stop-color="white" />
          <stop offset="0.992305" stop-color="white" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
  </div>
</template>

<script>
import { columns } from '@/assets/js/mixins/grid/index.js'
export default {
  name: 'ServiceItem',
  mixins: [columns],
  props: {
    col: {
      default: 'full',
      type: String
    }
  },
  computed: {
    classes() {
      const obj = {}
      // if (this.col) obj.col = 'grid__column_' + this.col
      return obj
    }
  }
}
</script>

<style lang="scss">
@import '~assets/scss/app/index.scss';
@import 'services';
</style>
