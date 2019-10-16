<template>
  <transition name="modal">
    <div class="modal__mask">
      <div class="modal__wrapper" @click.self="$emit('close')">
        <div class="modal__container">
          <button class="modal__button_close" @click="$emit('close')">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0707 2.92929C15.181 1.03956 12.6726 0 10 0C7.32744 0 4.81902 1.03956 2.92929 2.92929C1.03956 4.81902 0 7.32744 0 10C0 12.6726 1.03956 15.181 2.92929 17.0707C4.81902 18.9604 7.32744 20 10 20C12.6726 20 15.181 18.9604 17.0707 17.0707C18.9604 15.181 20 12.6726 20 10C20 7.32744 18.9604 4.81902 17.0707 2.92929ZM16.2668 16.2668C14.5918 17.9419 12.3653 18.8636 10 18.8636C7.63468 18.8636 5.40825 17.9419 3.73316 16.2668C0.277778 12.8114 0.277778 7.18855 3.73316 3.73316C5.40825 2.05808 7.63468 1.13636 10 1.13636C12.3653 1.13636 14.5918 2.05808 16.2668 3.73316C19.7222 7.18855 19.7222 12.8114 16.2668 16.2668Z"
                fill="#DEDEDE"
              />
              <path
                d="M14.4072 5.59308C14.1841 5.37002 13.8264 5.37002 13.6033 5.59308L10.0006 9.19577L6.39793 5.59308C6.17487 5.37002 5.81712 5.37002 5.59406 5.59308C5.37099 5.81614 5.37099 6.17389 5.59406 6.39695L9.19676 9.99964L5.59406 13.6023C5.37099 13.8254 5.37099 14.1831 5.59406 14.4062C5.70348 14.5156 5.85079 14.5746 5.99389 14.5746C6.13699 14.5746 6.28429 14.5198 6.39372 14.4062L9.99642 10.8035L13.5991 14.4062C13.7085 14.5156 13.8559 14.5746 13.999 14.5746C14.1463 14.5746 14.2894 14.5198 14.3988 14.4062C14.6219 14.1831 14.6219 13.8254 14.3988 13.6023L10.8045 9.99964L14.4072 6.39695C14.6303 6.17389 14.6303 5.81614 14.4072 5.59308Z"
                fill="#DEDEDE"
              />
            </svg>
          </button>
          <div class="modal__header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal__body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    show() {
      this.showModal = true
    },
    close() {
      this.showModal = false
    }
  }
}
</script>

<style lang="scss">
@import '~assets/scss/framework/index.scss';
@import 'modal';
</style>
