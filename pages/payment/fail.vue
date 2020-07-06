<template>
  <Modal>
    <template #header>Произошла ошибка подтверждения оплаты!</template>
    <p>Попробуйте еще раз</p>
    <Button to="/" outline="outline" borders="rounded">
      Вернуться на главную страницу
    </Button>
    <Button to="/lk" outline="outline" borders="rounded">
      Перейти в личный кабинет
    </Button>
  </Modal>
</template>

<script>
export default {
  name: 'Fail',
}
</script>

<style scoped></style>
