<template>
  <div class="grid-layout_profile">
    <CategoryHeader>
      Подать объявление
      <template v-slot:right_column>
        <img src="../../../../assets/img/icons/ad_new.svg" alt="" />
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
    </div>
    <Modal v-if="showModalAdd" @close="modalAddClose">
      <template v-slot:header>
        <span v-if="ad.paying_type === 1" class="modal__title">
          Бесплатная публикация
        </span>
        <span v-if="ad.paying_type === 2" class="modal__title">
          PRO публикация
        </span>
        <span v-if="ad.paying_type === 3" class="modal__title">
          Премиум публикация
        </span>
      </template>
      <template v-slot:body>
        <form class="advert-form" @submit.prevent="adSubmit">
          <label for="title" class="label grid__column_6">
            <input
              id="title"
              v-model="ad.title"
              class="input"
              type="text"
              placeholder="Заголовок"
            />
          </label>
          <label for="name" class="label grid__column_6">
            <input
              id="name"
              v-model="ad.name"
              class="input"
              type="text"
              placeholder="Название фирмы"
            />
          </label>
          <label for="rootCategory" class="label grid__column_6">
            <select
              id="rootCategory"
              v-model="ad.rootCategory"
              name=""
              class="input_select"
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
            >
            Описание  объявления
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
          /></label>
          <label for="phone2" class="label grid__column_6">
            <input
              id="phone2"
              v-model="ad.phone.second"
              class="input"
              type="tel"
              placeholder="Телефон"
          /></label>
          <label for="phone3" class="label grid__column_6">
            <input
              id="phone3"
              v-model="ad.phone.third"
              class="input"
              type="tel"
              placeholder="Телефон"
          /></label>
          <label
            v-if="ad.paying_type === 3"
            for="website"
            class="label grid__column_3"
          >
            <input
              id="website"
              v-model="ad.website"
              type="text"
              class="input"
              placeholder="Ссылка на вебсайт"
            />
          </label>
          <label for="vk" class="label grid__column_3">
            <input
              id="vk"
              v-model="ad.socials.vk"
              type="text"
              class="input"
              placeholder="ссылка на сообщество VK"
            />
          </label>
          <label for="ok" class="label grid__column_3">
            <input
              id="ok"
              v-model="ad.socials.ok"
              type="text"
              class="input"
              placeholder="ссылка на сообщество OK"
            />
          </label>
          <label for="ig" class="label grid__column_3">
            <input
              id="ig"
              v-model="ad.socials.ig"
              type="text"
              class="input"
              placeholder="ссылка на Instagram"
            />
          </label>
          <label for="fb" class="label grid__column_3">
            <input
              id="fb"
              v-model="ad.socials.fb"
              type="text"
              class="input"
              placeholder="ссылка на сообщество FB"
            />
          </label>
          <label for="address" class="label grid__column_3"
            ><input
              id="address"
              v-model="ad.address"
              class="input"
              type="tel"
              placeholder="Адрес"
          /></label>
          <label for="metro" class="label grid__column_3"
            ><input
              id="metro"
              v-model="ad.metro"
              class="input"
              type="tel"
              placeholder="Метро"
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
            v-show="ad.paying_type === 3"
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
        </form>
      </template>
      <template v-slot:footer></template>
    </Modal>
  </div>
</template>

<script>
import CategoryHeader from '@/components/Category/Header/CategoryHeader'
import Card from '@/components/Card/Card'

export default {
  middleware: ['auth'],
  name: 'Index',
  layout: 'Cabinet',
  components: {
    CategoryHeader,
    Card
  },
  data() {
    return {
      showModalAdd: false,
      data: this.$auth,
      user: this.$auth.user,
      ad: {
        author_id: this.$auth.user.id,
        type_id: 1,
        name: '',
        title: '',
        rootCategory: 0,
        category: 0,
        // subcat: 0,
        description: '',
        phone: {
          main: ''
        },
        socials: {},
        address: '',
        metro: '',
        start_time: new Date().toISOString().substr(0, 10),
        end_time: this.endTime,
        period: 1,
        website: '',
        ticker: '',
        status_id: 1,
        author_type_id: 1,
        paying_type: 1
      },
      adSubCategories: []
      // adCategoriesList: []
    }
  },
  computed: {
    adCategoriesList() {
      return this.$store.state.adCategoriesList
    },
    adRootCategories() {
      const result = []
      if (this.adCategoriesList.length > 0) {
        this.adCategoriesList.forEach(function(item) {
          if (!item.parent_id) result.push(item)
        })
      }
      return result
    }
    /* endTime() {
      const date = new Date()
      date.setDate(date.getDate() + this.ad.period * 30)
      const endDate = date.toISOString().split('T')[0]
      this.ad.end_time = endDate
      return endDate
    } */
  },
  created() {
    this.$store.dispatch('getAdCategories')
  },
  methods: {
    modalAddOpen(type, ownership) {
      this.ad.paying_type = type
      this.ad.author_type_id = ownership
      this.showModalAdd = true
    },
    modalAddClose() {
      this.showModalAdd = false
    },
    adSubmit() {
      const formData = this.ad
      if (formData.paying_type === 1) {
        // delete formData.end_time
        delete formData.website
        // delete formData.phone
      }
      this.$axios.$post(
        'https://admin.монтаждемонтаж.рф/api/advertisements',
        formData
      )
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
      // date.setDate(date.getDate() + this.ad.period * 30)
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
  grid-gap: 20px;
}

/*input {
  width: 100%;
  background: rgba(14, 36, 62, 0.4);
  border: 1.5px solid #ffffff;
  border-radius: 10px;
  padding: 12px 20px;
  color: white;
  @include on_tablet() {
    padding: 8px 15px;
  }
}*/
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
</style>
