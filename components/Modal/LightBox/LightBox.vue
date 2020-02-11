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
export default {
  name: 'LightBox',
  components: {
    CoolLightBox
  },
  props: {
    items: {
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
