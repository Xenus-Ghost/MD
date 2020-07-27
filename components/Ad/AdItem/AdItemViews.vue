<template>
  <div class="views ad__views" :title="`Просмотров: ${views}`">
    <img
      src="~assets/img/icons/eye.svg"
      :alt="`Просмотров: ${views}`"
      class="views__icon"
    />
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
