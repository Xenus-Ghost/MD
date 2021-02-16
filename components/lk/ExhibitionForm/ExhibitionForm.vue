<template>
  <Modal @close="$emit('close')">
    <template #header> Заявить о выставке </template>
    <template>
      <form class="advert-form grid_cols_6">
        <label class="label grid__column_3" for=""
          ><input type="date" v-bind="ad.start_time" class="input"
        /></label>
        <label class="label grid__column_3" for=""
          ><input
            v-model="ad.phone"
            type="text"
            class="input"
            placeholder="Адрес"
        /></label>
        <label for="phone" class="label grid__column_3">
          <input
            id="phone"
            v-model="ad.website"
            type="text"
            class="input"
            placeholder="Ссылка на сайт"
          />
        </label>
        <label for="website" class="label grid__column_3">
          <input
            id="website"
            v-model="ad.website"
            type="text"
            class="input"
            placeholder="Ссылка на сайт"
          />
        </label>
        <label for="rootCategory" class="label grid__column_6">
          <select
            id="rootCategory"
            v-model="ad.rootCategory"
            name=""
            class="input_select"
            required
            @change="changeCategory"
          >
            <option selected disabled value="0" class="input_option">
              Выберите категорию
            </option>
            <option
              v-for="(item, j) in adRootCategories"
              :key="j"
              :value="item.id"
              class="input_option"
            >
              {{ item.title }}
            </option>
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
            <option selected disabled value="0" class="input_option">
              Выберите подкатегорию
            </option>
            <option
              v-for="(item, j) in adSubCategories"
              :key="j"
              :value="item.id"
              class="input_option"
            >
              {{ item.title }}
            </option>
          </select>
        </label>
        <label for="description" class="label grid__column_6">
          <textarea
            id="description"
            v-model="ad.description"
            name=""
            rows="10"
            class="input_textarea"
            required
          >
            Описание
          </textarea>
        </label>
        <VideoUploader class="grid__column_3" :max="1">
          Прикрепить видео
        </VideoUploader>
        <Button
          class="grid__column_full"
          type="submit"
          shape="rounded"
          borders="neon"
          @click="submit"
          >Подать заявку</Button
        >
      </form>
    </template>
  </Modal>
</template>

<script>
import { VideoUploader } from '@/components/lk'
export default {
  name: 'ExhibitionForm',
  components: {
    VideoUploader,
  },
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

<style></style>
