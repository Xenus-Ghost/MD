<template>
  <h1>Category?</h1>
</template>

<script>
export default {
  validate({ params }) {
    return !(
      params.author_type === 'частники' ||
      params.author_type === 'все-фирмы-и-магазины' ||
      params.author_type === 'фирмы-и-магазины' ||
      params.author_type === 'магазины' ||
      params.author_type === 'фирмы' ||
      params.author_type === 'торговые-центры' ||
      params.author_type === 'заказчики' ||
      params.author_type === 'интернет-магазины'
    )
  }
}
</script>
