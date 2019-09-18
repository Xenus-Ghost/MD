<template>
  <div class="services__list_grid" :style="[measurableStyles, gridStyles]">
    <slot></slot>
  </div>
</template>

<script>
import { Measurable } from '@/assets/js/mixins/measurables/index.js'
import { grids } from '@/assets/js/mixins/grid/index.js'
export default {
  mixins: [Measurable, grids],
  props: {}
}
</script>

<style scoped lang="scss">
@import 'services';
</style>
