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
        @change="update"
      >
        <option selected disabled value="0" class="input_option"
          >Выберите подкатегорию</option
        >
        <option
          v-for="(item, j) in adSubCategories"
          :key="j"
          :value="item.id"
          class="input_option"
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
      adSubCategories: []
    }
  },
  computed: {
    adCategoriesList() {
      return this.$store.state.categories.adCategoriesList
    },
    adRootCategories() {
      // const result = []
      /* if (this.adCategoriesList.length > 0) {
        this.adCategoriesList.forEach(function(item) {
          if (!item.parent_id) result.push(item)
        })
      } */
      // result = this.adCategoriesList.filter((item) => !item.parent_id)
      return this.adCategoriesList.filter((item) => !item.parent_id)
    },
    category_ids() {
      const cats = []
      cats.push(this.rootCategory)
      cats.push(this.category)
      return cats
    }
  },
  methods: {
    changeCategory() {
      let resultSubcat = []
      // if (this.adCategoriesList.length > 0) {
      // for (let i = 0; i < this.adCategoriesList.length; i++) {
      //   console.log(this.adCategoriesList[i])
      //   if (this.adCategoriesList[i].parent_id === this.rootCategory) {
      //     resultSubcat.push(this.adCategoriesList[i])
      //   }
      // }
      // }
      resultSubcat = this.adCategoriesList.filter(
        (item) => item.parent_id === this.rootCategory
      )

      // this.adSubCategories = resultSubcat

      this.$set(this, 'adSubCategories', resultSubcat)
    },
    update() {
      this.$emit('change', this.category_ids)
    }
  }
}
</script>

<style scoped></style>