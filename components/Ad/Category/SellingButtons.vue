<template>
  <div class="container grid__column_12 grid__column_12-desktop-fhd selling">
    <h2 class="selling__title">Продажа</h2>
    <div class="selling__buttons">
      <Button
        v-for="(item, i) in authors"
        :key="i"
        :to="item.to"
        shape="rounded"
        borders="outline"
      >
        {{ item.name }}
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SellingButtons',
  props: {
    authorTypes: {
      type: Object || Array,
      default: null,
    },
    category: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      meta: null,
    }
  },
  computed: {
    authors() {
      const obj = []
      /* if (this.authorTypes) {
        if (this.authorTypes.private_person)
          obj.push({ name: 'Все частники', to: 'продажа/частники' })
        if (this.authorTypes.firm)
          obj.push({
            name: 'Все фирмы и магазины',
            to: 'продажа/фирмы-и-магазины',
          })
        if (this.authorTypes.private_person)
          obj.push({
            name: 'Все торговые центры',
            to: 'продажа/торговые-центры',
          })
        if (this.authorTypes.online_shop)
          obj.push({
            name: 'Интернет-магазины',
            to: 'продажа/интернет-магазины',
          })
        if (this.authorTypes.plant)
          obj.push({ name: 'Заводы', to: 'продажа/заводы' })
      } */
      if (this.meta) {
        const fields = this.meta.find((item) => item.type_id === 2)
        if (fields) {
          /*
           * category_id:1
           firm:1
           id:201
           online-shop:1
           plant:0
           private-person:1
           property:0
           shopping-center:1
           title:"Строительство"
           type_id:2
           * */
          if (fields['private-person'])
            obj.push({ name: 'Все частники', to: 'продажа/частники' })
          if (fields.firm)
            obj.push({
              name: 'Фирмы и магазины',
              to: 'продажа/фирмы-и-магазины',
            })
          if (fields['online-shop'])
            obj.push({
              name: 'Интернет-магазины',
              to: 'продажа/интернет-магазины',
            })
          if (fields['shopping-center'])
            obj.push({
              name: 'Все торговые центры',
              to: 'продажа/торговые-центры',
            })
          if (fields['shopping-center'])
            obj.push({
              name: 'Все торговые центры',
              to: 'продажа/торговые-центры',
            })
          if (fields.plant) obj.push({ name: 'Заводы', to: 'продажа/заводы' })
        }
      }
      return obj
    },
  },
  created() {
    const meta = this.$store.state.categories.adCategoriesList.find(
      (item) => item.id === this.category.id
    ).meta
    this.meta = meta
  },
}
</script>

<style scoped></style>
