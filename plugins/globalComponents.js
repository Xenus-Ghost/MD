import Vue from 'vue'
import Button from './../components/Button/Button'
import Modal from './../components/Modal/Modal'
import LoginForm from '~/components/Registration/LoginForm'

Vue.component('Button', Button)
Vue.component('Modal', Modal)
Vue.component('LoginForm', LoginForm)

Vue.directive('click-outside', {
  bind() {
    this.event = (event) => this.vm.$emit(this.expression, event)
    this.el.addEventListener('click', this.stopProp)
    document.body.addEventListener('click', this.event)
  },
  unbind() {
    this.el.removeEventListener('click', this.stopProp)
    document.body.removeEventListener('click', this.event)
  },

  stopProp(event) {
    event.stopPropagation()
  }
})

// this.$root.$emit('authFormOpen')
