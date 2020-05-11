<template>
  <div class="admin-categories">
    <CategoriesList />
  </div>
</template>

<script>
import CategoriesList from '@/components/lk/admin/Categories'
export default {
  layout: 'admin',
  components: {
    CategoriesList,
  },
}
</script>

<style scoped></style>
