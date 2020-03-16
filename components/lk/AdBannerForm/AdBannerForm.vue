<template>
  <Modal @close="$emit('close')">
    <template #header>
      Баннерная реклама
    </template>
    <template>
      <form class="advert-form grid_cols_6">
        <Button
          class="grid__column_2"
          shape="rounded"
          borders="outline"
          :class="ad.author_type_id === 2 ? 'button_active' : ''"
          >Фирма/ Магазин</Button
        >
        <!--<Button
          class="grid__column_2"
          shape="rounded"
          borders="outline"
          :class="ad.author_type_id === 2 ? 'button_active' : ''"
          >Магазин</Button
        >-->
        <Button
          class="grid__column_2"
          shape="rounded"
          borders="outline"
          :class="ad.author_type_id === 5 ? 'button_active' : ''"
          >Торговый центр</Button
        >
        <CategorySelect
          v-model="ad.category"
          class="grid__column_full"
          :categories="categories"
        ></CategorySelect>
        <label for="website" class="label grid__column_full">
          <input
            id="website"
            v-model="ad.website"
            type="text"
            class="input"
            placeholder="Ссылка на сайт"
          />
        </label>
        <VideoUploader class="grid__column_3" :max="1">
          Прикрепить видео
        </VideoUploader>
        <FileUploader class="grid__column_3">
          Загрузить изображение
        </FileUploader>
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
import VideoUploader from '@/components/lk/VideoUploader'
import FileUploader from '@/components/FileUploader'
import CategorySelect from '@/components/lk/CategorySelect'
export default {
  name: 'AdBannerCreate',
  components: {
    VideoUploader,
    FileUploader,
    CategorySelect
  },
  data() {
    return {
      ad: {
        author_type_id: null,
        rootCategory: null,
        category_ids: null
      },
      adSubCategories: null,
      categories: this.$store.state.categories.adCategoriesList
    }
  },
  computed: {
    adCategoriesList() {
      return this.$store.state.categories.adCategoriesList
    },
    adRootCategories() {
      const result = []
      if (this.adCategoriesList.length > 0) {
        this.adCategoriesList.forEach(function(item) {
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
    }
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
    }
  }
}
</script>

<style></style>
