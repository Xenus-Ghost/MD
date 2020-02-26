<template>
  <div class="category-select">
    <label for="rootCategory" class="label grid__column_6">
      <select
        id="rootCategory"
        v-model="rootCategory"
        name=""
        class="input_select"
        required
        @change="changeCategory"
      >
        <option selected disabled value="0" class="input_option"
          >Выберите категорию</option
        >
        <option
          v-for="(item, j) in adRootCategories"
          :key="j"
          :value="item.id"
          class="input_option"
          >{{ item.service_title }}</option
        >
      </select>
    </label>
    <label for="category" class="label grid__column_6">
      <select
        id="category"
        v-model="category"
        class="input_select"
        name=""
        required
        @change="changeCategory"
      >
        <!--<option selected disabled value="0" class="input_option"
          >Выберите подкатегорию</option
        >-->
        <option
          v-for="(item, j) in adSubCategories"
          :key="j"
          :value="item.id"
          class="input_option"
          :selected="j === 1"
          >{{ item.service_title }}</option
        >
      </select>
    </label>
    <label
      v-if="subSubCategories"
      for="3lvlCategory"
      class="label grid__column_6"
    >
      <select
        id="3lvlCategory"
        v-model="subCategory"
        class="input_select"
        name=""
        required
        @change="update"
      >
        <option
          v-for="(item, j) in subSubCategories"
          :key="j"
          :value="item.id"
          class="input_option"
          :selected="j === 1"
          >{{ item.service_title }}</option
        >
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  data() {
    return {
      rootCategory: null,
      category: null,
      subCategory: null,
      adSubCategories: [],
      subSubCategories: null
    }
  },
  computed: {
    adCategoriesList() {
      return this.$store.state.categories.adCategoriesList
    },
    adRootCategories() {
      return this.adCategoriesList.filter((item) => !item.parent_id)
    },
    category_ids() {
      const cats = []
      cats.push(this.rootCategory)
      if (this.category) cats.push(this.category)
      if (this.subCategory) cats.push(this.subCategory)
      return cats
    }
  },
  methods: {
    changeCategory() {
      this.update()
      let resultSubcat = []
      resultSubcat = this.adCategoriesList.filter(
        (item) => item.parent_id === this.rootCategory
      )
      const resultSubSubcat = this.adCategoriesList.filter(
        (item) => item.parent_id === this.category && !!item.parent_id
      )

      // this.adSubCategories = resultSubcat

      this.$set(this, 'adSubCategories', resultSubcat)
      if (resultSubSubcat.length) {
        this.$set(this, 'subSubCategories', resultSubSubcat)
      } else {
        this.$set(this, 'subSubCategories', null)
        this.$set(this, 'subCategory', null)
      }
    },
    update() {
      this.$emit('change', this.category_ids)
    }
  }
}
</script>

<style scoped></style>
