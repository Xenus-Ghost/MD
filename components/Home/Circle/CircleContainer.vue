<template>
  <div class="circle__wrapper">
    <div class="circle__container">
      <slot></slot>
    </div>
    <slot name="circle_center">
      <div class="circle__center">MD</div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'CircleContainer'
}
</script>

<style scoped lang="scss">
@import '~assets/scss/framework/index.scss';
@import 'CircleContainer';
</style>
