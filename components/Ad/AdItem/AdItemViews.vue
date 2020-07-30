<template>
  <div class="views ad__views" :title="`Просмотров: ${views}`">
    <svg-icon class="views__icon" name="eye" :title="`Просмотров: ${views}`" />
    <span class="views__value">{{ views }}</span>
  </div>
</template>

<script>
export default {
  name: 'AdItemViews',
  props: {
    views: {
      type: Number,
      default: null,
    },
  },
}
</script>
