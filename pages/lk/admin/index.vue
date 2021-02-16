<template>
  <div class="admin-page">
    <CategoryHeader> Административная панель </CategoryHeader>
    <div class="profile__grid_actions">
      <Button
        to="banners"
        borders="neon"
        shape="semi_rounded"
        class="profile__button"
      >
        Баннерная реклама
      </Button>
      <Button
        to="categories"
        borders="neon"
        shape="semi_rounded"
        class="profile__button"
      >
        Категории
      </Button>
    </div>
  </div>
</template>

<script>
import CategoryHeader from '@/components/Category'

export default {
  layout: 'admin',
  middleware: ['auth', 'admin'],
  components: { CategoryHeader },
}
</script>

<style scoped></style>
