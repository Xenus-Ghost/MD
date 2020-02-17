<template>
  <div class="grid__column_12 grid__column_12-desktop-fhd selling">
    <h2 class="selling__title">Продажа</h2>
    <div class="selling__buttons">
      <Button to="частники" shape="rounded" borders="outline"
        >Все частники</Button
      >
      <Button to="фирмы-и-магазины" shape="rounded" borders="outline"
        >Все фирмы и магазины</Button
      >
      <Button to="торговые-центры" shape="rounded" borders="outline"
        >Все торговые центры</Button
      >
      <Button to="интернет-магазины" shape="rounded" borders="outline"
        >Интернет магазины</Button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'SellingButtons'
}
</script>

<style scoped></style>
