import Vue from 'vue'
import Card from '@/components/Card/Card'
import LoginForm from '@/components/Registration/LoginForm'
import XInput from '@/components/Input'
import Modal from './../components/Modal/Modal'
import Button from './../components/Button/Button'

Vue.component('Button', Button)
Vue.component('Modal', Modal)
Vue.component('LoginForm', LoginForm)
Vue.component('Card', Card)
Vue.component('XInput', XInput)

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
  },
})

/* $nuxt.$router.onError((error) => {
  if (/loading chunk \d* failed./i.test(error.message)) {
    window.location.reload()
  }
}) */
