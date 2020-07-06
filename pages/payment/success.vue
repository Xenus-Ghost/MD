<template>
  <Modal>
    <template #header>Услуга успешно оплачена!</template>
    <Button to="/" shape="rounded" borders="outline">
      Вернуться на главную страницу
    </Button>
    <Button to="/lk" shape="rounded" borders="outline">
      Перейти в личный кабинет
    </Button>
  </Modal>
</template>

<script>
export default {
  name: 'Success',
}
</script>

<style scoped></style>
