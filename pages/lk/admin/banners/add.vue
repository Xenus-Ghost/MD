<template>
  <div>
    <h1>Добавление объявления</h1>
    <Card>
      <bannerForm />
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import { bannerForm } from '@/components/lk/admin'

export default {
  name: 'Add',
  layout: 'admin',
  components: {
    Card,
    bannerForm
  }
}
</script>

<style lang="scss">
.banner-form {
  grid-gap: 20px;
  width: 500px;
  max-width: 100%;
}
</style>
