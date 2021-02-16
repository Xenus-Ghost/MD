<template>
  <div class="grid-layout_profile">
    <CategoryHeader :back-url="'/lk'">
      Подать объявление
      <template v-slot:right_column>
        <img
          class="header_category__image"
          src="/img/categories/ad_new.svg"
          alt=""
        />
      </template>
    </CategoryHeader>
    <div
      class="container grid_cols_2_desktop grid-gap_8"
      style="text-align: center"
    >
      <div class="grid__column_1">
        <h2>Услуги</h2>
        <Card>
          <div class="grid_cols_2 grid-gap_6">
            <div class="grid__column_1 grid_rows_3 grid-gap_4">
              <h3 class="add-ad__title">Частник</h3>
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
                color="secondary"
                @click.native="modalAddOpen(3, 1)"
              >
                Премиум-аккаунт
              </Button>
            </div>
            <div class="grid__column_1 grid_rows_3 grid-gap_4">
              <h3 class="add-ad__title">Фирма</h3>
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
                color="secondary"
                @click.native="modalAddOpen(3, 2)"
              >
                Премиум-аккаунт
              </Button>
            </div>
            <Button
              shape="semi_rounded"
              borders="neon"
              class="grid__column_2"
              :to="'price'"
            >
              Тарифы
            </Button>
          </div>
        </Card>
      </div>
      <div class="grid__column_1">
        <h2>Продажа</h2>
        <Card>
          <div class="grid_cols_2 grid-gap_6">
            <div class="grid__column_1 grid_rows_3 grid-gap_4">
              <h3 class="add-ad__title">Частник</h3>
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
                color="secondary"
                @click.native="modalAddOpen(3, 1, 2)"
              >
                Премиум-аккаунт
              </Button>
            </div>
            <div class="grid__column_1 grid_rows_3 grid-gap_4">
              <h3 class="add-ad__title">Фирма</h3>
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
                color="secondary"
                @click.native="modalAddOpen(3, 2, 2)"
              >
                Премиум-аккаунт
              </Button>
            </div>
            <Button
              shape="semi_rounded"
              borders="neon"
              class="grid__column_2"
              :to="'price'"
            >
              Тарифы
            </Button>
          </div>
        </Card>
      </div>
      <div class="grid__column_1">
        <Button
          shape="semi_rounded"
          borders="neon"
          block
          @click.native="modalAddOpen(1, 1, 3)"
        >
          Заказчик - бесплатно
        </Button>
      </div>
      <div class="grid__column_1">
        <Button
          shape="semi_rounded"
          borders="neon"
          block
          @click.native="modalAddOpen(1, 4, 2)"
        >
          Интернет-магазин
        </Button>
      </div>
    </div>
    <AddForm v-if="showModalAdd" :props="modalProps" @close="modalAddClose" />
  </div>
</template>

<script>
import CategoryHeader from '@/components/Category'
import AddForm from '@/components/lk/Ads/AddForm'

export default {
  middleware: ['auth'],
  layout: 'Cabinet',
  components: {
    CategoryHeader,
    AddForm,
  },
  data() {
    return {
      showModalAdd: false,
      data: this.$auth,
      user: this.$auth.$state.user,
      modalProps: {},
    }
  },
  methods: {
    modalAddOpen(type, ownership, adType) {
      this.$set(this.modalProps, 'account_type_id', type)
      this.$set(this.modalProps, 'author_type_id', ownership)
      this.$set(this.modalProps, 'type_id', adType || 1)
      this.showModalAdd = true
    },
    modalAddClose() {
      this.showModalAdd = false
    },
  },
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
.add-ad__title {
  margin: 0;
}
</style>
