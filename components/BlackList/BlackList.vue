<template>
  <Modal v-if="isShow" @close="$emit('close')" class="black-list">
    <template v-slot:header>
      <Button
        @click.native="isFormShow = true"
        shape="rounded"
        borders="outline"
        class="black-list__button_show"
      >
        Пожаловаться
      </Button>
      <h1 class="black-list__title">
        Черный список
      </h1>
      <span class="black-list__caption">
        Мы настоятельно не рекомендуем доверять следующим организациям
      </span>
    </template>
    <template v-slot:body>
      <div class="black-list__content">
        <table class="black-list__table">
          <div class="black-list__header">
            <span class="black-list__cell_header">Название организации</span>
            <span class="black-list__cell_header">ИНН</span>
            <span class="black-list__cell_header">Адрес</span>
            <span class="black-list__cell_header">Причина помещения в ЧС</span>
          </div>
          <div
            v-for="(company, i) in companies"
            :key="i"
            class="black-list__row"
          >
            <span class="black-list__cell black-list__cell_name">{{
              company.name
            }}</span>
            <span class="black-list__cell">{{ company.inn }}</span>
            <span class="black-list__cell black-list__cell_address">
              {{ company.address }}
            </span>
            <span class="black-list__cell black-list__cell_reason">
              {{ company.reason }}
            </span>
          </div>
        </table>
      </div>
      <Modal
        v-if="isFormShow"
        @close="isFormShow = false"
        class="black-list__form-modal"
      >
        <template v-slot:body>
          <form action="" class="black-list__form">
            <label for="">
              <input
                type="text"
                placeholder="Ваш телефон или электронная почта"
              />
            </label>
            <span>
              Введите данные организации, на которую хотите подать жалобу
            </span>
            <label for="">
              <input type="text" placeholder="Название организации" />
            </label>
            <label for="">
              <input type="text" placeholder="Телефон или электронная почта" />
            </label>
            <label for="">
              <textarea
                cols="30"
                rows="3"
                placeholder="В чем провинилась организация?"
              >
              </textarea>
            </label>
            <Button shape="rounded" borders="neon">Отправить жалобу</Button>
          </form>
        </template>
      </Modal>
    </template>
  </Modal>
</template>

<script>
export default {
  name: 'BlackList',
  props: {
    isShow: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      companies: [
        {
          name: 'ИП Иванов И. И.',
          inn: 7731347089,
          address: 'Ул. Победы, 39',
          reason: 'Мошенничество'
        },
        {
          name: 'ООО “Провиданс”',
          inn: 7731347089,
          address: 'Ул. Мира, 68',
          reason: 'Завышение сметы работ'
        },
        {
          name: 'ИП Харитонов Н. Н.',
          inn: 7731347089,
          address: 'Ул. 50 лет Октября, 39',
          reason: 'Неверные данные'
        },
        {
          name: 'ИП Иванов И. И.',
          inn: 7731347089,
          address: 'Ул. Победы, 39',
          reason: 'Мошенничество'
        },
        {
          name: 'ООО “Провиданс”',
          inn: 7731347089,
          address: 'Ул. Мира, 68',
          reason: 'Завышение сметы работ'
        },
        {
          name: 'ИП Харитонов Н. Н.',
          inn: 7731347089,
          address: 'Ул. 50 лет Октября, 39',
          reason: 'Неверные данные'
        },
        {
          name: 'ИП Иванов И. И.',
          inn: 7731347089,
          address: 'Ул. Победы, 39',
          reason: 'Мошенничество'
        },
        {
          name: 'ООО “Провиданс”',
          inn: 7731347089,
          address: 'Ул. Мира, 68',
          reason: 'Завышение сметы работ'
        },
        {
          name: 'ИП Харитонов Н. Н.',
          inn: 7731347089,
          address: 'Ул. 50 лет Октября, 39',
          reason: 'Неверные данные'
        }
      ],
      isFormShow: false
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/framework/basic.scss';
@import 'BlackList';
</style>
