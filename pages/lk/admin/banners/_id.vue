<template>
  <div>
    <h1>Редактирование объявления</h1>
    <Button to="../" shape="rounded" borders="outline">Назад</Button>
    <Card>
      <bannerForm :banner="bannerData" />
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import { bannerForm } from '@/components/lk/admin'
import { getUrl } from '@/assets/js/util'

export default {
  name: 'Edit',
  layout: 'admin',
  middleware: ['auth', 'admin'],
  components: {
    bannerForm,
    Card,
  },
  async asyncData(context) {
    const id = context.route.params.id
    let bannerData
    const errors = null
    await context.$axios
      .get(getUrl(`admin/banners/${id}`))
      .then((response) => (bannerData = response.data.data))
      .catch((e) => errors.push(e.response.data))
    return { bannerData, errors }
  },
  data() {
    return {
      bannerData: {
        type_id: 2,
        active: 1,
        title: null,
        path: null,
        categories: null,
      },
    }
  },
}
</script>

<style lang="scss">
/*.banner-form {
  grid-gap: 20px;
  width: 500px;
  max-width: 100%;
}*/
</style>
