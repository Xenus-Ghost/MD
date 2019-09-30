<template>
  <div class="services" :class="[classes]">
    <h2 class="services__title">Услуги</h2>
    <div
      class="services__list_grid"
      :style="[measurableStyles, gridStyles]"
      :class="[gridClasses]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { Measurable } from '@/assets/js/mixins/measurables/index.js'
import { grids } from '@/assets/js/mixins/grid/index.js'
export default {
  mixins: [Measurable, grids],
  props: {
    col: {
      default: null,
      type: String
    }
  },
  computed: {
    classes() {
      const obj = ['grid__column_1']
      if (this.col) obj.push('grid__column_' + this.col)
      return obj
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/app/index.scss';
@import 'services';
</style>
