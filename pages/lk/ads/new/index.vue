<template>
  <div class="grid-layout_profile">
    <CategoryHeader>
      Подать объявление
      <template v-slot:right_column>
        <img
          class="header_category__image"
          src="~/assets/img/icons/ad_new.svg"
          alt=""
        />
      </template>
    </CategoryHeader>
    <div class="container grid_cols_2_desktop">
      <div class="grid__column_1">
        <h2>Услуги</h2>
        <Card>
          <div class="grid_cols_2">
            <div class="grid__column_1 grid_rows_3">
              <h3>
                Частник
              </h3>
              <Button
                shape="semi_rounded"
                borders="neon"
                @click.native="modalAddOpen(1, 1)"
              >
                Бесплатно
              </Button>
              <Button
                shape="semi_rounded"
                borders="neon"
                @click.native="modalAddOpen(2, 1)"
              >
                PRO-аккаунт
              </Button>
              <Button
                shape="semi_rounded"
                borders="neon"
                @click.native="modalAddOpen(3, 1)"
              >
                Премиум-аккаунт
              </Button>
            </div>
            <div class="grid__column_1 grid_rows_3">
              <h3>
                Фирма
              </h3>
              <Button
                shape="semi_rounded"
                borders="neon"
                @click.native="modalAddOpen(1, 2)"
              >
                Бесплатно
              </Button>
              <Button
                shape="semi_rounded"
                borders="neon"
                @click.native="modalAddOpen(2, 2)"
              >
                PRO-аккаунт
              </Button>
              <Button
                shape="semi_rounded"
                borders="neon"
                @click.native="modalAddOpen(3, 2)"
              >
                Премиум-аккаунт
              </Button>
            </div>
            <Button shape="semi_rounded" borders="neon" class="grid__column_2">
              Тарифы
            </Button>
          </div>
        </Card>
      </div>
      <div class="grid__column_1">
        <h2>Продажа</h2>
        <Card>
          <div class="grid_cols_2">
            <div class="grid__column_1 grid_rows_3">
              <h3>
                Частник
              </h3>
              <Button
                shape="semi_rounded"
                borders="neon"
                @click.native="modalAddOpen(1, 1, 2)"
              >
                Бесплатно
              </Button>
              <Button
                shape="semi_rounded"
                borders="neon"
                @click.native="modalAddOpen(2, 1, 2)"
              >
                PRO-аккаунт
              </Button>
              <Button
                shape="semi_rounded"
                borders="neon"
                @click.native="modalAddOpen(3, 1, 2)"
              >
                Премиум-аккаунт
              </Button>
            </div>
            <div class="grid__column_1 grid_rows_3">
              <h3>
                Фирма
              </h3>
              <Button
                shape="semi_rounded"
                borders="neon"
                @click.native="modalAddOpen(1, 2, 2)"
              >
                Бесплатно
              </Button>
              <Button
                shape="semi_rounded"
                borders="neon"
                @click.native="modalAddOpen(2, 2, 2)"
              >
                PRO-аккаунт
              </Button>
              <Button
                shape="semi_rounded"
                borders="neon"
                @click.native="modalAddOpen(3, 2, 2)"
              >
                Премиум-аккаунт
              </Button>
            </div>
            <Button shape="semi_rounded" borders="neon" class="grid__column_2">
              Тарифы
            </Button>
          </div>
        </Card>
      </div>
      <div class="grid__column_1">
        <Button
          shape="semi_rounded"
          borders="neon"
          @click.native="modalAddOpen(1, 1, 3)"
        >
          Заказчик - бесплатно
        </Button>
      </div>
      <div class="grid__column_1">
        <Button
          shape="semi_rounded"
          borders="neon"
          @click.native="modalAddOpen(1, 4, 2)"
        >
          Интернет-магазин
        </Button>
      </div>
    </div>
    <Modal v-if="showModalAdd" @close="modalAddClose">
      <template v-slot:header>
        <span v-if="ad.account_type_id === 1" class="modal__title">
          Бесплатная публикация
        </span>
        <span v-if="ad.account_type_id === 2" class="modal__title">
          PRO публикация
        </span>
        <span v-if="ad.account_type_id === 3" class="modal__title">
          Премиум публикация
        </span>
      </template>
      <template>
        <div v-if="success" class="advert-form__message_success">
          <h2>Объявление добавлено!</h2>
        </div>
        <form v-if="!success" class="advert-form" @submit.prevent="adSubmit">
          <div
            v-if="ad.type_id === 2 && ad.author_type_id >= 2"
            class="grid_cols_4 grid__column_full"
          >
            <Button
              shape="semi_rounded"
              borders="neon"
              :class="ad.author_type_id === 2 ? 'button_active' : ''"
              @click.native="ad.author_type_id = 2"
            >
              Фирмы и магазины
            </Button>
            <Button
              shape="semi_rounded"
              borders="neon"
              :class="ad.author_type_id === 4 ? 'button_active' : ''"
              @click.native="ad.author_type_id = 4"
            >
              Интернет-магазины
            </Button>
            <Button
              shape="semi_rounded"
              borders="neon"
              :class="ad.author_type_id === 5 ? 'button_active' : ''"
              @click.native="ad.author_type_id = 5"
            >
              Торговый центр
            </Button>
            <Button
              shape="semi_rounded"
              borders="neon"
              :class="ad.author_type_id === 6 ? 'button_active' : ''"
              @click.native="ad.author_type_id = 6"
            >
              Завод
            </Button>
          </div>
          <label for="title" class="label grid__column_6">
            <input
              id="title"
              v-model="ad.title"
              class="input"
              type="text"
              placeholder="Название объявления"
              required
              maxlength="30"
            />
          </label>
          <label
            v-if="ad.author_type_id === 1 || ad.type_id === 3"
            for="name"
            class="label grid__column_6"
          >
            <input
              id="name"
              v-model="ad.name"
              class="input"
              type="text"
              placeholder="Фамилия Имя Отчество"
              required
              maxlength="90"
            />
          </label>
          <label
            v-if="ad.author_type_id >= 2"
            for="name2"
            class="label grid__column_6"
          >
            <input
              id="name2"
              v-model="ad.name"
              class="input"
              type="text"
              :placeholder="
                ad.author_type_id === 4
                  ? 'Название интернет-магазина'
                  : 'Название фирмы/компании'
              "
              maxlength="30"
              required
            />
          </label>
          <CategorySelect v-model="category_ids" class="grid__column_6" />
          <label for="description" class="label grid__column_6">
            <textarea
              id="description"
              v-model="ad.description"
              name=""
              rows="10"
              class="input_textarea"
              required
              placeholder="Описание"
            >
            </textarea>
          </label>
          <label for="phone" class="label grid__column_6">
            <input
              id="phone"
              v-model="ad.phone.main"
              class="input"
              type="tel"
              placeholder="Телефон"
              maxlength="12"
              required
          /></label>
          <label
            v-if="ad.account_type_id === 3"
            for="phone2"
            class="label grid__column_6"
          >
            <input
              id="phone2"
              v-model="ad.phone.second"
              class="input"
              type="tel"
              placeholder="Телефон"
              maxlength="12"
          /></label>
          <label
            v-if="ad.account_type_id === 3"
            for="phone3"
            class="label grid__column_6"
          >
            <input
              id="phone3"
              v-model="ad.phone.third"
              class="input"
              type="tel"
              placeholder="Телефон"
              maxlength="12"
          /></label>
          <label
            v-if="ad.account_type_id !== 1"
            for="website"
            class="label grid__column_3"
          >
            <input
              id="website"
              v-model="ad.website"
              type="text"
              class="input"
              placeholder="Ссылка на сайт"
            />
          </label>
          <label
            v-if="ad.account_type_id !== 1"
            for="vk"
            class="label grid__column_3"
          >
            <input
              id="vk"
              v-model="social.vk"
              type="text"
              class="input"
              placeholder="ссылка на сообщество VK"
            />
          </label>
          <label
            v-if="ad.account_type_id !== 1"
            for="ok"
            class="label grid__column_3"
          >
            <input
              id="ok"
              v-model="social.ok"
              type="text"
              class="input"
              placeholder="ссылка на сообщество OK"
            />
          </label>
          <label
            v-if="ad.account_type_id !== 1"
            for="ig"
            class="label grid__column_3"
          >
            <input
              id="ig"
              v-model="social.ig"
              type="text"
              class="input"
              placeholder="ссылка на Instagram"
            />
          </label>
          <label
            v-if="ad.account_type_id !== 1"
            for="fb"
            class="label grid__column_3"
          >
            <input
              id="fb"
              v-model="social.fb"
              type="text"
              class="input"
              placeholder="ссылка на сообщество FB"
            />
          </label>
          <label for="price" class="label grid__column_3">
            <input
              id="price"
              v-model="ad.price"
              type="number"
              step="any"
              class="input"
              placeholder="Стоимость"
              required
            />
          </label>
          <div v-if="ad.type_id !== 3" class="grid__column_full grid_cols_2">
            <div class="">
              <FileUploader
                v-model="ad.photo"
                multiple
                auto-upload
                preview
                file-type="image"
              >
                Загрузить фотографии
              </FileUploader>
            </div>
            <div v-if="ad.account_type_id !== 1" class="">
              <VideoUploader v-model="ad.video"></VideoUploader>
            </div>
          </div>
          <div
            v-if="
              ad.account_type_id !== 1 &&
                ad.author_type_id >= 2 &&
                ad.type_id !== 3
            "
            class="grid__column_full"
          >
            <FileUploader
              v-model="ad.logo"
              auto-upload
              preview
              file-type="image"
            >
              Загрузить логотип
            </FileUploader>
          </div>
          <div
            v-if="ad.type_id !== 3 && ad.account_type_id !== 1"
            class="grid__column_full grid_cols_2"
          >
            <div class="">
              <FileUploader
                v-model="ad.price_list"
                auto-upload
                file-type="document"
                :max="1"
              >
                Загрузить Прайс-лист
              </FileUploader>
            </div>
            <div class="">
              <FileUploader
                v-model="ad.presentation"
                auto-upload
                file-type="document"
                :max="1"
              >
                Загрузить Презентацию
              </FileUploader>
            </div>
          </div>
          <label for="region" class="label grid__column_3">
            <select
              id="region"
              v-model="ad.region"
              class="input_select"
              required
            >
              <option value="" selected disabled class="input_option">
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
            v-if="ad.region && ad.region !== 'Москва'"
            for="city"
            class="label grid__column_3"
          >
            <select id="city" v-model="ad.city" class="input_select" required>
              <option value="" selected disabled class="input_option">
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
            v-if="ad.region === 'Москва'"
            for="metro"
            class="label grid__column_3"
          >
            <select id="metro" v-model="ad.metro" class="input_select">
              <option value="" selected disabled class="input_option">
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
          <label for="address" class="label grid__column_3">
            <input
              id="address"
              v-model="ad.address"
              class="input"
              type="text"
              placeholder="Адрес"
            />
          </label>
          <label for="start_time" class="label grid__column_3">
            <input
              id="start_time"
              v-model="ad.start_time"
              class="input_date"
              type="date"
              placeholder="Дата начала"
            />
          </label>
          <label v-show="false" for="end_time" class="label grid__column_3">
            <input
              id="end_time"
              v-model="ad.end_time"
              class="input_date"
              type="date"
              placeholder="Дата окончания"
            />
          </label>
          <label
            v-show="ad.account_type_id === 3"
            for="period"
            class="label grid__column_3"
          >
            <input
              id="period"
              v-model="ad.period"
              type="number"
              min="1"
              max="36"
              step="1"
              class="input"
              placeholder="Период подачи"
              @change="changePeriod"
            />
          </label>
          <Button type="submit">
            Опубликовать
          </Button>
          <div v-if="errors" class="grid__column_3 advert-form__messages">
            <span class="advert-form__messages-title">
              Ошибка
            </span>
            <ul class="messages-list">
              <li
                v-for="(item, j) in errors"
                :key="j"
                class="messages-list__element_error"
              >
                {{ item[0] }}
              </li>
            </ul>
          </div>
        </form>
      </template>
      <template v-slot:footer></template>
    </Modal>
  </div>
</template>

<script>
import VideoUploader from '@/components/lk/VideoUploader/VideoUploader'
import { getUrl } from '@/assets/js/util'
import CategoryHeader from '@/components/Category'
import Card from '@/components/Card'
import FileUploader from '@/components/FileUploader'
import CategorySelect from '@/components/lk/CategorySelect'
export default {
  middleware: ['auth'],
  layout: 'Cabinet',
  components: {
    CategoryHeader,
    Card,
    FileUploader,
    VideoUploader,
    CategorySelect
  },
  data() {
    return {
      showModalAdd: false,
      data: this.$auth,
      user: this.$auth.$state.user,
      errors: null,
      success: null,
      ad: {
        author_id: this.$auth.$state.user.id,
        author_type_id: 1,
        type_id: 1,
        rootCategory: 0,
        category: 0,
        city: '',
        description: null,
        phone: {
          main: ''
        },
        social: [],
        address: '',
        metro: '',
        start_time: new Date().toISOString().substr(0, 10),
        end_time: this.endTime,
        period: 1,
        website: null,
        ticker: null,
        status_id: 1,
        account_type_id: 1,
        photo: [],
        price: null
      },
      adSubCategories: [],
      social: {
        vk: null,
        ig: null,
        ok: null,
        fb: null
      },
      category_ids: null
      // adCategoriesList: []
    }
  },
  computed: {
    /* adCategoriesList() {
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
    }, */
    /* category_ids() {
      const cats = []
      cats.push(this.ad.rootCategory)
      cats.push(this.ad.category)
      return cats
    }, */
    citiesList() {
      return this.$store.state.address.citiesList
    },
    metroList() {
      return this.$store.state.address.metroList
    }
  },
  methods: {
    modalAddOpen(type, ownership, adType) {
      this.ad.account_type_id = type
      this.ad.author_type_id = ownership
      this.ad.type_id = adType || 1
      this.showModalAdd = true
    },
    modalAddClose() {
      this.showModalAdd = false
    },
    async adSubmit() {
      const formData = this.ad
      if (formData.account_type_id === 1) {
        delete formData.website
      }
      formData.category_ids = this.category_ids

      if (this.social.fb) formData.social.push(this.social.fb)
      if (this.social.ok) formData.social.push(this.social.ok)
      if (this.social.ig) formData.social.push(this.social.ig)
      if (this.social.vk) formData.social.push(this.social.vk)
      Object.keys(formData).forEach(
        (key) => !formData[key] && delete formData[key]
      )
      await this.$axios
        .$post(getUrl('me/advertisements'), formData)
        .then((response) => {
          this.success = true
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
    },
    /* changeCategory() {
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
    }, */
    changePeriod() {
      const date = new Date()
      date.setMonth(date.getMonth() + this.ad.period)
      const endDate = date.toISOString().split('T')[0]
      this.ad.end_time = endDate
    }
  }
}
</script>

<style lang="scss">
@import '~assets/scss/framework/basic.scss';

.advert-form {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 5px;
  @include on_desktop() {
    grid-gap: 15px;
  }
}

#period {
  &:before {
    display: block;
    content: 'Период подачи';
  }
  &:after {
    display: block;
    content: ' мес.';
  }
}
.advert-form__messages-title {
  color: orangered;
  font-weight: bold;
  font-size: 1.1rem;
}
.messages-list {
  list-style: none;
  &__element_error {
    padding: 5px;
    color: orangered;
    &:before {
      display: none;
    }
  }
}
</style>
