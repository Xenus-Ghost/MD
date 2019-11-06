<template>
  <Modal v-if="isShow" class="black-list" @close="$emit('close')">
    <template v-slot:header>
      <Button
        shape="rounded"
        borders="outline"
        class="black-list__button_show"
        @click.native="isFormShow = true"
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
          <tr class="black-list__header">
            <th class="black-list__cell_header">Название организации</th>
            <th class="black-list__cell_header">ИНН</th>
            <th class="black-list__cell_header">Адрес</th>
            <th class="black-list__cell_header">Причина помещения в ЧС</th>
          </tr>
          <tr
            v-for="(company, i) in companies"
            :key="i"
            class="black-list__row"
          >
            <td class="black-list__cell">{{ company.name }}</td>
            <td class="black-list__cell">{{ company.inn }}</td>
            <td class="black-list__cell">{{ company.address }}</td>
            <td class="black-list__cell">{{ company.reason }}</td>
          </tr>
        </table>
      </div>
      <Modal
        v-if="isFormShow"
        class="black-list__form-modal"
        @close="isFormShow = false"
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
.black-list {
  &__button_show {
    position: absolute;
    left: 30px;
    top: 30px;
    font-weight: normal;
    font-size: 0.8rem;
    padding: 5px 20px;
  }
  &__title {
    font-weight: bold;
    font-size: 29px;
    margin-bottom: 10px;
  }
  &__caption {
    font-size: 1rem;
  }
  &__content {
    overflow-y: auto;
    overflow-y: fragments;
  }
  &__table {
    width: 100%;
    text-align: left;
  }
  &__cell_header {
    font-weight: 300;
    /*font-size: 1rem;*/
    color: #fff;
    padding: 10px 0;
  }
  &__cell {
    padding: 5px 0;
    font-weight: bold;
  }
  /deep/ .modal__container {
    min-width: 900px;
  }
  &__form {
    display: grid;
    grid-gap: 20px;
  }
  &__form-modal {
    /deep/ .modal__container {
      min-width: auto;
      max-width: 500px;
    }
    span {
      font-weight: bold;
      font-size: 16px;
    }
    /deep/ .button {
      height: 40px;
      padding: 10px;
    }
  }
}
input,
textarea {
  width: 100%;
  background: rgba(14, 36, 62, 0.4);
  border: 1.5px solid #ffffff;
  border-radius: 10px;
  padding: 8px 15px;
  color: white;
}
</style>
