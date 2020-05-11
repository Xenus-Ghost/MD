<template>
  <div class="input-group input-group_address grid_cols_6">
    <ul class="city-metro__list grid__column_4">
      <li v-for="n in count" :key="n" class="city-metro__element grid_cols_6">
        <label for="region" class="label grid__column_3">
          <select
            id="region"
            v-model="addresses.region[n]"
            class="input_select"
            required
          >
            <option :value="null" selected disabled class="input_option">
              Выберите...
            </option>
            <option value="Москва" class="input_option">
              Москва
            </option>
            <option value="Мосовская область" class="input_option">
              Мосовская область
            </option>
          </select>
        </label>
        <label
          v-show="addresses.region[n] && addresses.region[n] !== 'Москва'"
          :for="`city-${n}`"
          class="label grid__column_3"
        >
          <select
            :id="`city-${n}`"
            v-model="addresses.city[n]"
            class="input_select"
            required
          >
            <option :value="null" selected disabled class="input_option">
              Выберите город
            </option>
            <option
              v-for="(city, i) in citiesList"
              :id="`city_${i}`"
              :key="i"
              :value="city"
              class="input_option"
              >{{ city }}</option
            >
          </select>
        </label>
        <label
          v-if="addresses.region[n] === 'Москва'"
          :for="`metro-${n}`"
          class="label grid__column_3"
        >
          <select
            :id="`metro-${n}`"
            v-model="addresses.metro[n]"
            class="input_select"
          >
            <option :value="null" selected disabled class="input_option">
              Метро
            </option>
            <option
              v-for="(metro, i) in metroList"
              :id="`metro_${i}`"
              :key="i"
              :value="metro"
              class="input_option"
              >{{ metro }}</option
            >
          </select>
        </label>
      </li>
    </ul>
    <div class="input_addresses grid__column_2">
      <label
        v-for="n in count"
        :key="n"
        :for="`address_${n}`"
        class="label grid__column_3"
      >
        <input
          :id="`address_${n}`"
          v-model="addresses.address[n]"
          class="input"
          type="text"
          :placeholder="`Адрес (${n})`"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddressInputGroup',
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
      addresses: {
        city: [],
        metro: [],
        region: [],
        address: [],
      },
      metroList: this.$store.state.address.metroList,
      citiesList: this.$store.state.address.citiesList,
    }
  },
  methods: {
    update() {
      const data = this.addresses
      this.$emit('change', data)
    },
  },
}
</script>

<style lang="scss">
.city-metro {
  &__list {
    list-style: none;
    padding-left: 0;
  }
  &__element {
    /*display: grid;*/
    /*grid-template-columns: 1fr 1fr;*/
    grid-gap: 1rem;
  }
}
</style>
