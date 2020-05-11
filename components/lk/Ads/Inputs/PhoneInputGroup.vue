<template>
  <div class="input-group input-group_phone">
    <label
      v-for="(input, n) in count"
      :key="n"
      for="phone"
      class="label grid__column_6"
    >
      <input
        id="phone"
        v-model="phone[n]"
        class="input"
        type="tel"
        placeholder="Телефон"
        maxlength="12"
        :required="required === true || n < required"
        inputmode="tel"
        autocomplete="tel"
        @input="update"
    /></label>
  </div>
</template>

<script>
export default {
  name: 'PhoneInputGroup',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    count: {
      type: Number,
      default: 1,
    },
    required: {
      type: Number || Boolean,
      default: 1,
    },
  },
  data() {
    return {
      phone: [],
    }
  },
  methods: {
    update() {
      const data = this.phone
      this.$emit('change', data)
    },
  },
}
</script>

<style scoped></style>
