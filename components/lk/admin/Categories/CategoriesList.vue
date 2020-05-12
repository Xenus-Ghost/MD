<template>
  <div class="categories__list">
    <div>
      <Button @click="create">Добавить</Button>
      <Button @click="changeToTreeView">Tree</Button>
    </div>
    <CategoriesItem
      v-for="(item, i) in categoriesList"
      :id="item.id"
      :key="i"
      :category-data="item"
      :url="'admin/advertisement-categories/'"
      @change="refresh"
      @subcatAdd="create"
    />
    <div>
      <Button @click="create">Добавить</Button>
    </div>
  </div>
</template>

<script>
import CategoriesItem from './CategoriesItem'
import { getUrl, listToTree } from '@/assets/js/util'

export default {
  name: 'CategoriesList',
  components: {
    CategoriesItem,
  },
  props: {
    path: {
      type: String,
      default: 'admin/advertisement-categories/?with=meta',
    },
  },
  data() {
    return {
      url: this.path,
      categoriesList: null,
      treeView: true,
    }
  },
  mounted() {
    this.getData()
    /* if (this.treeView && this.categoriesList) {
      this.changeToTreeView(this.categoriesList)
    } */
  },
  methods: {
    async getData() {
      await this.$axios
        .get(this.url)
        .then((response) =>
          this.$set(this, 'categoriesList', listToTree(response.data.data))
        )
    },
    create(parent_id = null) {
      this.categoriesList.push({
        parent_id,
        /* meta: [
          {
            type_id: 1,
            title: '',
            'private-person': 0,
            firm: 0,
            'online-shop': 0,
            'shopping-center': 0,
            plant: 0,
          },
        ], */
      })
    },
    async refresh() {
      // this.$set(this, 'categoriesList', null)
      // await this.getData()
    },
    changeToTreeView() {
      const treeList = listToTree(this.categoriesList)
      this.$set(this, 'categoriesList', treeList)
    },
  },
}
</script>

<style lang="scss">
.categories__list {
  display: flex;
  flex-direction: column;
}
</style>
