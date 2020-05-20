<template>
  <div :class="classList">
    <label v-if="label" :for="inputId" class="x-field__label">
      {{ label }}
    </label>
    <input
      :id="inputId"
      :name="name"
      :value="inputValue"
      :type="inputType"
      class="x-field__input"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="required"
      @input="update"
    />
    <span v-if="message" class="x-field__message">
      {{ message }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'XInput',
  model: {
    prop: 'modelValue',
    event: 'input',
  },
  props: {
    autocomplete: {
      type: String || Boolean,
      default: null,
    },
    value: {
      type: String || Number,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    id: {
      type: String || Number,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
    type: {
      type: String,
      default: null,
    },
    bgColor: {
      type: String,
      default: 'white',
    },
    required: {
      type: Boolean,
      default: null,
    },
    maxLength: {
      type: Number,
      default: null,
    },
    inputType: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      inputValue: this.value,
      inputId: null,
    }
  },
  computed: {
    classList() {
      const className = 'x-field'
      const obj = [className]
      if (this.outlined) obj.push(`${className}_outlined`)
      if (this.rounded) obj.push(`${className}_rounded`)
      if (this.size) obj.push(`${className}_size_${this.size}`)
      if (this.type) obj.push(`${className}_${this.type}`)
      if (this.bgColor) obj.push(`${className}_bg_${this.bgColor}`)
      return obj
    },
  },
  mounted() {
    const uid = this._uid
    this.inputId = this.id ? this.id : 'x-text-input-' + uid
  },
  methods: {
    update() {
      const data = this.inputValue
      this.$emit('change', data)
    },
  },
}
</script>

<style lang="scss">
/*@import './XTextInput';*/
</style>
