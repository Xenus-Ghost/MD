<template>
  <div class="card">
    <div v-if="$slots.header" class="card__header">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
}
</script>

<style lang="scss">
@import 'card.scss';
</style>
