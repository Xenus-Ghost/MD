<template>
  <Modal class="my-ads__modal" @close="$emit('close')">
    <template #header>
      Мои объявления
      <div class="grid_cols_3">
        <Button
          :class="type_id === 3 ? 'button_active' : ''"
          borders="outline"
          shape="rounded"
          @click="changeCategory(3)"
          >Заказчик</Button
        >
        <Button
          :class="type_id === 1 ? 'button_active' : ''"
          borders="outline"
          shape="rounded"
          @click="changeCategory(1)"
          >Услуги</Button
        >
        <Button
          :class="type_id === 2 ? 'button_active' : ''"
          borders="outline"
          shape="rounded"
          @click="changeCategory(2)"
          >Продажа</Button
        >
      </div>
    </template>
    <template>
      <div v-if="type_id === 2 || type_id === 1" class="my-ads__section">
        <div
          v-for="(a, name, j) in adList"
          :key="j"
          class="my-ads__author-type"
        >
          <h2 v-if="a.length > 0" class="my-ads__cat-name">
            {{
              name === 'private'
                ? 'частники'
                : name === 'firm'
                ? 'фирмы и магазины'
                : name === 'onlineShop'
                ? 'Интернет-магазин'
                : name === 'shoppingCenter'
                ? 'Торговые центры'
                : name === 'plant'
                ? 'Завод'
                : ''
            }}
          </h2>
          <div v-if="a.length > 0" class="my-ads__table">
            <div class="my-ads__th">
              <div>Название объявления</div>
              <div>Размещение</div>
              <div>Конец</div>
              <div>Состояние</div>
            </div>
            <div v-for="(row, i) in a" :key="i" class="my-ads__row">
              <div class="my-ad__name">{{ row.name }}</div>
              <div class="my-ad__start-date">{{ row.start_time }}</div>
              <div class="my-ad__end-date">{{ row.end_time }}</div>
              <div
                :class="[
                  'my-ad__status',
                  row.status_id === 1 ? 'my-ad__status_active' : '',
                ]"
              >
                <span>
                  {{ row.status_id }}
                </span>
              </div>
              <div class="my-ad__actions">
                <span v-if="row.status_id === 1" class="my-ad__button_pause">
                  <svg-icon name="pause" class="my-ad__icon" />
                </span>
                <span v-if="row.status_id !== 1" class="my-ad__button_redo">
                  <svg-icon name="redo" class="my-ad__icon" />
                </span>
                <span class="my-ad__button_remove" @click="removeAd(row.id)">
                  <svg-icon name="remove" class="my-ad__icon" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="type_id === 3" class="my-ads__section">
        <div class="my-ads__table">
          <div class="my-ads__th">
            <div>Название объявления</div>
            <div>Размещение</div>
            <div>Конец</div>
            <div>Состояние</div>
          </div>
          <div v-for="(row, i) in adList.private" :key="i" class="my-ads__row">
            <div class="my-ad__name">
              <span class="my-ad__button_edit">
                <svg-icon name="edit" class="my-ad__icon" />
              </span>
              {{ row.name }}
            </div>
            <div class="my-ad__start-date">{{ row.start_time }}</div>
            <div class="my-ad__end-date">{{ row.end_time }}</div>
            <div
              :class="[
                'my-ad__status',
                row.status_id === 1 ? 'my-ad__status_active' : '',
              ]"
            >
              <span>
                {{ row.status_id }}
              </span>
            </div>
            <div class="my-ad__actions">
              <span v-if="row.status_id === 1" class="my-ad__button_pause">
                <svg-icon name="pause" class="my-ad__icon" />
              </span>
              <span v-if="row.status_id !== 1" class="my-ad__button_redo">
                <svg-icon name="redo" class="my-ad__icon" />
              </span>
              <span class="my-ad__button_remove" @click="removeAd(row.id)">
                <svg-icon name="remove" class="my-ad__icon" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import { jsonToParams } from '@/assets/js/util'
import { dateTimeParse } from '@/assets/js/util/helpers'
export default {
  name: 'MyAds',
  props: {
    userID: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      author_type_id: 1,
      type_id: null,
      adList: {
        private: [],
        firms: [],
        onlineShop: [],
        shoppingCenter: [],
        plant: [],
      },
    }
  },
  created() {
    this.getAds(3)
    this.type_id = 3
  },
  methods: {
    getAds(typeId) {
      const params = jsonToParams({
        type_id: typeId || this.type_id,
      })
      this.$axios.get(`me/advertisements${params}`).then((response) => {
        response.data.data.forEach(
          // (ad) => (ad.start_time = ad.start_time.split(' ')[0])
          (ad) => (ad.start_time = dateTimeParse(ad.start_time))
        )
        this.$set(
          this.adList,
          'private',
          response.data.data.filter((ad) => ad.author_type_id === 1)
        )
        // this.adList.private = response.data.data.filter(
        //   (ad) => ad.author_type_id === 1
        // )
        this.$set(
          this.adList,
          'firm',
          response.data.data.filter((ad) => ad.author_type_id === 2)
        )
        this.$set(
          this.adList,
          'shop',
          response.data.data.filter((ad) => ad.author_type_id === 3)
        )
        this.$set(
          this.adList,
          'onlineShop',
          response.data.data.filter((ad) => ad.author_type_id === 4)
        )
        this.$set(
          this.adList,
          'shoppingCenter',
          response.data.data.filter((ad) => ad.author_type_id === 5)
        )
        this.$set(
          this.adList,
          'plant',
          response.data.data.filter((ad) => ad.author_type_id === 6)
        )
        /* this.adList.firm = response.data.data.filter(
          (ad) => ad.author_type_id === 2
        )
        this.adList.shop = response.data.data.filter(
          (ad) => ad.author_type_id === 3
        )
        this.adList.onlineShop = response.data.data.filter(
          (ad) => ad.author_type_id === 4
        )
        this.adList.shoppingCenter = response.data.data.filter(
          (ad) => ad.author_type_id === 5
        )
        this.adList.plant = response.data.data.filter(
          (ad) => ad.author_type_id === 6
        ) */
      })
    },
    changeCategory(typeId) {
      // if (this.type_id !== typeId) {
      this.type_id = typeId
      this.getAds(typeId)
      // }
    },
    async removeAd(id) {
      await this.$axios
        .delete(`me/advertisements/${id}`)
        .then((e) => {
          this.changeCategory(this.type_id)
        })
        .catch((e) => {
          console.log(e.response)
          this.changeCategory(this.type_id)
        })
    },
  },
}
</script>

<style lang="scss">
@import 'my_ads';
</style>
