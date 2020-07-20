<template>
  <div
    :class="[
      'ad-modal__address-list-wrapper',
      show ? 'ad-modal__address-list-wrapper_open' : '',
    ]"
  >
    <div
      :class="[
        'ad-modal__address-list',
        show ? 'ad-modal__address-list_open' : '',
      ]"
    >
      <div
        v-for="(address, a) in addresses"
        :key="a"
        class="ad-modal__address-item"
      >
        <div v-if="address && address.value" class="ad-modal__address">
          {{ address.value }}
        </div>
        <div v-if="metroList && metroList[a]" class="ad-modal__address_metro">
          <svg
            class="icon-svg_metro"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#icon-svg_metro)">
              <path
                d="M16.0715 0H1.92859C0.865115 0 0 0.865115 0 1.92859V16.0715C0 17.1349 0.865115 18 1.92859 18H16.0715C17.1349 18 18 17.1349 18 16.0715V1.92859C18 0.865115 17.1349 0 16.0715 0V0ZM16.7143 16.0715C16.7143 16.4261 16.4261 16.7143 16.0715 16.7143H1.92859C1.5739 16.7143 1.28574 16.4261 1.28574 16.0715V1.92859C1.28574 1.5739 1.5739 1.28574 1.92859 1.28574H16.0715C16.4261 1.28574 16.7143 1.5739 16.7143 1.92859V16.0715Z"
                fill="white"
              />
              <path
                d="M13.7464 3.90695C13.506 3.80651 13.2297 3.86173 13.0458 4.0463L9.00029 8.0918L4.9548 4.0463C4.7715 3.863 4.49461 3.80775 4.25418 3.90695C4.01375 4.00615 3.85742 4.24092 3.85742 4.50083V14.1419H5.14312V6.05278L8.54572 9.45538C8.79682 9.70649 9.20362 9.70649 9.45478 9.45538L12.8574 6.05278V14.1419H14.1431V4.50088C14.1432 4.24097 13.9868 4.00615 13.7464 3.90695Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="icon-svg_metro">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {{ metroList[a].value }}
        </div>
      </div>
    </div>
    <Button
      v-if="
        !show && (addresses.length >= 2 || (metroList && addresses.length >= 2))
      "
      borders="outline"
      shape="semi_rounded"
      size="big"
      @click="show = !show"
    >
      Показать все {{ addressList.length }} адресов
    </Button>
    <Button
      v-if="show"
      borders="outline"
      shape="semi_rounded"
      @click="show = !show"
    >
      Закрыть
    </Button>
  </div>
</template>
<script>
export default {
  name: 'AdAddressList',
  props: {
    addressList: {
      type: Array,
      default: null,
    },
    metroList: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      show: false,
      showButton: this.addressList ? this.addressList.length > 1 : null,
    }
  },
  computed: {
    addresses() {
      const obj =
        this.addressList.length > 2 && this.show === true
          ? this.addressList
          : [this.addressList[0], this.addressList[1]]
      return obj
    },
  },
  mounted() {
    console.log(this.addresses.length)
  },
}
</script>

<style lang="scss">
@import '~assets/scss/app/index.scss';
.ad-modal__address-list-wrapper {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 2rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  padding: 1.875rem 1.6875rem;
  margin-bottom: 1rem;
  @include on_tablet() {
    grid-template-columns: 1fr 200px;
  }
  &_open {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 425px;
    min-height: 300px;
    z-index: 200;
  }
}
.ad-modal__address-item {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.ad-modal__address-list {
  display: flex;
  flex-direction: row;
  &_open {
    flex-direction: column;
    overflow-y: auto;
    .ad-modal__address-item {
      margin-bottom: 1rem;
      flex-direction: row;
    }
  }
}
.ad-modal__address,
.ad-modal__address_metro {
  flex-basis: 50%;
  display: inline-flex;
  & > svg {
    margin-right: 0.6rem;
  }
}
</style>
