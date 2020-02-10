<template>
  <div class="grid-layout_profile">
    <CategoryHeader>
      Подать объявление
      <template v-slot:right_column>
        <img src="~/assets/img/icons/ad_new.svg" alt="" />
      </template>
    </CategoryHeader>
    <div class="container grid_cols_2">
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
              required
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
          </textarea
            >
          </label>
          <label for="phone" class="label grid__column_6">
            <input
              id="phone"
              v-model="ad.phone.main"
              class="input"
              type="tel"
              placeholder="Телефон"
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
          <div v-if="ad.type_id !== 3" class="grid__column_full grid_cols_2">
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
          <label for="address" class="label grid__column_3">
            <input
              id="address"
              v-model="ad.address"
              class="input"
              type="tel"
              placeholder="Адрес"
              required
          /></label>
          <label for="metro" class="label grid__column_3"
            ><input
              id="metro"
              v-model="ad.metro"
              class="input"
              type="tel"
              placeholder="Метро"
              required
          /></label>
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
export default {
  middleware: ['auth'],
  name: 'Index',
  layout: 'Cabinet',
  components: {
    CategoryHeader,
    Card,
    FileUploader,
    VideoUploader
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
        description:
          this.author_type_id === 4 ? 'Описание магазина' : 'Описание',
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
      }
      // adCategoriesList: []
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

      if (this.social.fb) formData.social = this.social.fb
      if (this.social.ok) formData.social = this.social.ok
      if (this.social.ig) formData.social = this.social.ig
      if (this.social.vk) formData.social = this.social.vk

      await this.$axios
        .$post(getUrl('me/advertisements'), formData)
        .then((response) => {
          this.success = true
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
    },
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
.profile {
  &__card {
    @include neon_borders(8);
    border-radius: 3rem;
    padding: 50px 100px;
    max-width: 570px;
  }
  &__header {
    border-bottom: 1px solid #ffffff;
    padding: 20px 0;
    display: grid;
    grid-template-columns: 70px 1fr;
    grid-gap: 20px;
  }
  &__photo {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 50%;
  }
  &__name {
    font-weight: bold;
    font-size: 20px;
  }
  &__phone {
    font-weight: 500;
    font-size: 20px;
    &::before {
      content: '';
      display: block;
      float: left;
      background: url('~assets/img/icons/phone-call.svg') center no-repeat;
      background-size: contain;
      padding: 8px;
    }
  }
  &__prop-table {
    padding: 15px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px 28px;
    font-size: 16px;
  }
  &__prop-name {
    text-align: right;
  }
  &__prop-value {
    font-weight: bold;
    text-align: left;
  }
  &__grid_actions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 31px 20px;
  }
}

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
