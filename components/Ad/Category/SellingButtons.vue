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
  },
  computed: {
    authors() {
      const obj = []
      if (this.authorTypes) {
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
      }
      return obj
    },
  },
}
</script>

<style scoped></style>
