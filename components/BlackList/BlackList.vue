<template>
  <Modal v-if="isShow" @close="$emit('close')" class="black-list">
    <template v-slot:header>
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
      ]
    }
  }
}
</script>

<style lang="scss">
.black-list {
  &__title {
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
}
</style>
