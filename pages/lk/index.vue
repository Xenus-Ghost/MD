<template>
  <div class="grid-layout_profile">
    <CategoryHeader>
      Личный кабинет
      <template v-slot:right_column>
        JKJKJ
      </template>
    </CategoryHeader>
  </div>
</template>

<script>
import CategoryHeader from '@/components/Category/Header/CategoryHeader'
export default {
  middleware: ['auth'],
  name: 'Index',
  layout: 'Cabinet',
  components: {
    CategoryHeader
  }
}
</script>

<style scoped></style>
