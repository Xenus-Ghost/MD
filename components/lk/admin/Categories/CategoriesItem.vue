<template>
  <div class="categories__item">
    <div class="category__id">{{ data.id }}</div>
    <div class="category__main-data">
      <label class="label">
        ссылка
        <input v-model.trim="data.name" type="text" />
      </label>
      <label class="label label__parent-id">
        Родитель
        <input
          v-model="data.parent_id"
          type="number"
          min="1"
          step="1"
          class="input"
        />
      </label>
      <Button
        class="category__button_subcat"
        @click="$emit('subcatAdd', data.id)"
      >
        Добавить подкатегорию</Button
      >
    </div>
    <details class="category__meta" open>
      <!--      <summary>-->
      <!--        Дополнительно-->
      <!--      </summary>-->
      <div
        v-for="(metaItem, m) in data.meta"
        :key="m"
        class="category__meta-item"
      >
        <label class="label">
          Тип объявлений
          <select
            v-model="metaItem.type_id"
            class="input_select"
            name=""
            @change="update"
          >
            <option class="input_option" :value="1"> Услуги</option>
            <option class="input_option" :value="2"> Продажа </option>
            <option class="input_option" :value="3"> заказчики</option>
          </select>
        </label>
        <label class="label">
          Фирмы и магазины
          <input
            v-model="metaItem.firm"
            type="checkbox"
            class="input_checkbox"
            @change="update"
          />
        </label>
        <label class="label">
          Интернет-магазины
          <input
            v-model="metaItem['online-shop']"
            type="checkbox"
            class="input_checkbox"
            @change="update"
          />
        </label>
        <label class="label">
          Заводы
          <input
            v-model="metaItem.plant"
            type="checkbox"
            class="input_checkbox"
            @change="update"
          />
        </label>
        <label class="label">
          Частные лица
          <input
            v-model="metaItem['private-person']"
            type="checkbox"
            class="input_checkbox"
            @change="update"
          />
        </label>
        <label class="label">
          Торговые центры
          <input
            v-model="metaItem['shopping-center']"
            type="checkbox"
            class="input_checkbox"
            @change="update"
          />
        </label>
        <label class="label" style="flex-basis: 100%;">
          <input v-model="data.meta[m].title" type="text" @change="update" />
        </label>
      </div>
      <Button
        shape="circle"
        borders="outline"
        style="float: right;"
        @click="addMeta"
        >+</Button
      >
    </details>
    <div class="category__actions">
      <span class="my-ad__button_redo" @click="update"
        ><img class="my-ad__icon" src="~assets/img/icons/redo.svg" alt=""
      /></span>
      <span class="my-ad__button_remove" @click="remove()"
        ><img class="my-ad__icon" src="~assets/img/icons/remove.svg" alt=""
      /></span>
    </div>
    <details
      v-if="categoryData.children"
      style="flex-basis: 100%; padding-left: 2rem;"
    >
      <CategoriesItem
        v-for="(item, i) in categoryData.children"
        :id="item.id"
        :key="i"
        :category-data="item"
        :url="'admin/advertisement-categories/'"
        @subcatAdd="
          (parent_id) => {
            $emit('subcatAdd', parent_id)
          }
        "
      />
    </details>
  </div>
</template>

<script>
// import { getUrl } from '@/assets/js/util'
import CategoriesItem from './CategoriesItem'

export default {
  name: 'CategoriesItem',
  components: {
    CategoriesItem,
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    categoryData: {
      type: Object,
      default() {
        return {
          meta: [
            {
              type_id: 1,
              title: this.data.service_title
                ? this.data.service_title
                : this.data.name
                ? this.data.name
                : '',
              'private-person': 0,
              firm: 0,
              'online-shop': 0,
              'shopping-center': 0,
              plant: 0,
            },
          ],
        }
      },
    },
    url: {
      type: String,
      default: 'admin/advertisement-categories/',
    },
    children: {
      type: Object || Array,
      default: null,
    },
  },
  data() {
    return {
      data: this.categoryData,
    }
  },
  methods: {
    async update() {
      const data = {
        name: this.data.name,
        title: this.data.title,
        service_title: this.data.service_title,
      }
      if (this.data.id) data.id = this.data.id
      if (this.data.meta && this.data.meta.length > 0)
        data.meta = this.data.meta
      if (this.data.parent_id) data.parent_id = this.data.parent_id
      /* data.meta.forEach((elem) => {
        delete elem.category_id
      }) */
      const method = data.id ? 'put' : 'post'
      let url = this.url
      if (data.id) url += data.id
      await this.$axios({
        method,
        url,
        data,
      })
        .then((response) => {
          this.$set(this, 'categoriesList', response.data.data)
          this.$emit('change')
        })
        .catch((error) => {
          console.log(error)
          console.log(error.message)
        })
    },
    async remove() {
      await this.$axios
        .delete(this.url + this.data.id)
        .then((response) => {
          this.$set(this, 'categoriesList', response.data.data)
          this.$emit('change')
        })
        .catch((error) => {
          console.log(error)
          console.log(error.message)
        })
    },
    addMeta() {
      this.data.meta.push({
        type_id: 1,
        title: this.data.service_title
          ? this.data.service_title
          : this.data.name
          ? this.data.name
          : '',
        'private-person': 0,
        firm: 0,
        'online-shop': 0,
        'shopping-center': 0,
        plant: 0,
      })
    },
  },
}
</script>

<style lang="scss">
.categories__item {
  margin-bottom: 0.5rem;
  background-color: rgba(3, 169, 244, 0.2);
  padding: 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  flex-wrap: wrap;
}
.category {
  &__main-data {
    display: flex;
    flex-wrap: wrap;
    flex-basis: 33%;
  }
  &__id {
    width: 3rem;
    padding: 0.25rem;
  }
  &__meta {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    summary {
      text-align: center;
      padding: 1rem;
      /*height: 100%;*/
      cursor: pointer;
    }
  }
  &__button_subcat {
    flex-basis: 100%;
  }
  &__meta-item {
    display: grid;
    grid-template-columns: repeat(5, auto) 2fr;
    grid-gap: 0.5rem;
    margin-bottom: 0.35rem;
  }
}
.label__parent-id {
  flex-basis: 25%;
  margin-left: 1rem;
}
</style>
