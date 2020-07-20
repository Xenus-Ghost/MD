<template>
  <div :class="classList">
    <div v-if="$slots.header" class="card__header">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    outline: {
      type: Boolean,
      default: null,
    },
  },
  computed: {
    classList() {
      const className = 'card'
      const obj = [className]
      if (this.outline) {
        obj.push(`${className}_outline`)
      } else {
        obj.push(`${className}_shadow`)
      }
      return obj
    },
  },
}
</script>

<style lang="scss">
@import 'card.scss';
</style>
