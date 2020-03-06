<template>
  <client-only>
    <CoolLightBox
      :items="items"
      :index="index"
      :loop="loop"
      @close="$emit('close')"
    ></CoolLightBox>
  </client-only>
</template>

<script>
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
export default {
  name: 'LightBox',
  components: {
    CoolLightBox
  },
  props: {
    items: {
      type: Array || Object,
      default: null
    },
    index: {
      type: Number,
      default: null
    },
    loop: {
      type: Boolean,
      default: null
    }
  }
}
</script>
