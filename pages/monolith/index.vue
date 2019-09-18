<template>
  <div>
    <CategoryHeader></CategoryHeader>
    <ServicesGrid width="703px" :cols="4">
      <ServiceItem>
        <template v-slot:icon>
          1
        </template>
        <template v-slot:default>
          Заливка бетона
        </template>
        <template v-slot:footer>
          <Button shape="rounded" borders="outline" width="100%"
            >Подробнее</Button
          >
        </template>
      </ServiceItem>
    </ServicesGrid>
  </div>
</template>

<script>
import CategoryHeader from '../../components/Category/Header/CategoryHeader'
import ServiceItem from '../../components/Services/ServiceItem'
import ServicesGrid from '~/components/Services/ServiceGrid'
export default {
  layout: 'Category',
  components: {
    CategoryHeader,
    ServicesGrid,
    ServiceItem
  }
}
</script>

<style scoped></style>
