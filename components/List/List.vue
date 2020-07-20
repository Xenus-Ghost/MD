<template>
  <div class="list">
    <component :is="tag" class="list__items">
      <component
        :is="'li'"
        v-for="(item, i) in items"
        :key="i"
        class="list__item"
      >
        <span class="list__icon">{{ i }}</span>
        <p class="list__title">
          {{ item.title || item }}
        </p>
      </component>
    </component>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    tag: {
      type: String,
      default: 'ul',
    },
    items: {
      type: Array || String,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.list {
  &__items {
    padding-left: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 100%;
    margin: 0;
  }
  &__item {
    font-size: 1rem;
    line-height: 19px;
    margin-bottom: 12px;
    max-width: 220px;
    display: grid;
    grid-template-columns: 18px auto;
    grid-column-gap: 1rem;
  }
  &__icon {
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: inline-block;
    margin-right: 4px;
    background-color: #4bae4f;
    font-size: 12px;
    text-align: center;
  }
  &__title {
    margin: 0;
  }
}
</style>
