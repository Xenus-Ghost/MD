<template>
  <Modal @close="$emit('close')">
    <template #header>
      Заявить о выставке
    </template>
    <template>
      <form class="advert-form grid_cols_6">
        <label class="grid__column_full" for=""
          ><input type="text" class="input" placeholder="Ссылка на видео"
        /></label>
        <label for="rootCategory" class="label grid__column_6">
          <select
            id="rootCategory"
            v-model="ad.rootCategory"
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
            v-model="ad.category"
            class="input_select"
            name=""
            required
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
        <Button
          class="grid__column_offset-2 grid__column_4"
          type="submit"
          shape="rounded"
          borders="neon"
          @click="submit"
          >Выложить видео</Button
        >
      </form>
    </template>
  </Modal>
</template>

<script>
export default {
  name: 'VideoAddForm',
  data() {
    return {
      ad: {
        author_type_id: null,
        rootCategory: null,
        category_ids: null,
      },
      adSubCategories: null,
    }
  },
  computed: {
    adCategoriesList() {
      return this.$store.state.categories.adCategoriesList
    },
    adRootCategories() {
      const result = []
      if (this.adCategoriesList.length > 0) {
        this.adCategoriesList.forEach(function (item) {
          if (!item.parent_id) result.push(item)
        })
      }
      return result
    },
    category_ids() {
      const cats = []
      cats.push(this.ad.rootCategory)
      cats.push(this.ad.category)
      return cats
    },
  },
  methods: {
    changeCategory() {
      const resultSubcat = []
      if (this.adCategoriesList.length > 0) {
        for (let i = 0; i < this.adCategoriesList.length; i++) {
          console.log(this.adCategoriesList[i])
          if (this.adCategoriesList[i].parent_id === this.ad.rootCategory) {
            resultSubcat.push(this.adCategoriesList[i])
          }
        }
      }
      this.adSubCategories = resultSubcat
    },
    submit() {
      this.$axios.post()
    },
  },
}
</script>

<style scoped></style>
