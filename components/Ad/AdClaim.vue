<template>
  <Modal small @close="close">
    <form action="" class="form form_ad-claim" @submit.prevent="submit">
      <Button
        shape="rounded"
        borders="outline"
        :class="{ button_active: form.claimType === 1 }"
        @click="form.claimType = 1"
        >Неправильный номер</Button
      >
      <Button
        shape="rounded"
        borders="outline"
        :class="{ button_active: form.claimType === 2 }"
        @click="form.claimType = 2"
        >Мошенники</Button
      >
      <Button
        shape="rounded"
        borders="outline"
        :class="{ button_active: form.claimType === 3 }"
        @click="form.claimType = 3"
        >Это спам</Button
      >
      <Button
        shape="rounded"
        borders="outline"
        :class="{ button_active: form.claimType === 4 }"
        @click="form.claimType = 4"
        >Нарушает правила МонтажДемонтаж</Button
      >
      <label for="phone" class="label">
        <input
          id="phone"
          v-model="form.phone"
          class="input"
          type="tel"
          placeholder="Телефон"
          maxlength="12"
          required
      /></label>
      <label for="email" class="label">
        <input
          id="email"
          v-model="form.email"
          class="input"
          type="email"
          placeholder="Электронная почта"
          required
      /></label>
      <label for="description" class="label">
        <textarea
          id="description"
          v-model="form.description"
          name=""
          rows="10"
          class="input_textarea"
          placeholder="Текстовое поле"
        >
        </textarea>
      </label>
      <Button type="submit" shape="rounded" borders="neon"
        >Отправить жалобу</Button
      >
      <div v-if="!!message.success" class="success">Успешно!</div>
    </form>
  </Modal>
</template>

<script>
export default {
  name: 'AdClaim',
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      form: {
        phone: null,
        email: null,
        description: null,
        claimType: 1,
      },
      message: {
        success: null,
      },
    }
  },
  methods: {
    submit() {
      this.$set(this.message, 'success', true)
      this.$set(this, 'form', {})
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss">
.form_ad-claim {
  display: grid;
  /*grid-template-columns: 1fr;*/
  /*grid-auto-rows: auto;*/
  grid-gap: 20px;
}
</style>
