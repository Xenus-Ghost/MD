<template>
  <div class="ad__filter ad-filter">
    <span class="ad-filter__title"><b>Фильтр:</b></span>
    <label for="region" class="label">
      <select
        id="region"
        v-model="filter.region"
        class="input_select ad-filter__select"
        required
        @change="regionChange"
      >
        <option
          :value="null"
          selected
          disabled
          class="input_option ad-filter__option"
        >
          Выберите...
        </option>
        <option value="Москва" class="input_option ad-filter__option">
          Москва
        </option>
        <option
          value="Московская область"
          class="input_option ad-filter__option"
        >
          Московская область
        </option>
      </select>
    </label>
    <label v-if="filter.region === 'Москва'" for="metro" class="label">
      <select
        id="metro"
        v-model="filter.metro"
        class="input_select ad-filter__select"
        @change="onChange"
      >
        <option
          :value="null"
          selected
          disabled
          class="input_option ad-filter__option"
        >
          Метро
        </option>
        <option
          v-for="(metro, i) in metroList"
          :id="`metro_${i}`"
          :key="i"
          :value="metro"
          class="input_option ad-filter__option"
          >{{ metro }}</option
        >
      </select>
    </label>
    <label
      v-if="filter.region === 'Московская область'"
      for="city"
      class="label"
    >
      <select
        id="city"
        v-model="filter.city"
        class="input_select ad-filter__select"
        required
        @change="onChange"
      >
        <option
          :value="null"
          selected
          disabled
          class="input_option ad-filter__option"
        >
          Выберите...
        </option>
        <option
          v-for="(city, i) in citiesList"
          :id="`city_${i}`"
          :key="i"
          :value="city"
          class="input_option ad-filter__option"
          >{{ city }}</option
        >
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: 'AdFilter',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  data() {
    return {
      filter: {
        region: null,
        metro: null,
        city: null
      }
    }
  },
  computed: {
    citiesList() {
      return this.$store.state.address.citiesList
    },
    metroList() {
      return this.$store.state.address.metroList
    }
  },
  methods: {
    regionChange() {
      // if (this.filter.region === 'Московская область') {
      // } else {
      // }
      this.$set(this.filter, 'metro', null)
      this.$set(this.filter, 'city', null)
      // this.$delete(this.filter, 'metro')
      // this.$delete(this.filter, 'city')
    },
    onChange() {
      const data = this.filter
      Object.keys(data).forEach((key) => data[key] == null && delete data[key])
      this.$emit('change', data)
    }
  }
}
</script>

<style scoped></style>
