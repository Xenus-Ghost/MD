<template>
  <div class="slider">
    <Hooper style="height: 100%">
      <Slide v-for="(slide, i) in slides" :key="i">
        <img :src="slide" :alt="i" class="slider__image" />
      </Slide>
      <HooperNavigation slot="hooper-addons" />
    </Hooper>
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import 'hooper/dist/hooper.css'
export default {
  name: 'ImageSlider',
  components: {
    Hooper,
    Slide,
    HooperNavigation,
  },
  props: {
    slides: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.slider__image {
  max-width: 100%;
  width: 100%;
  height: auto;
  @supports (object-fit: cover) {
    height: 100%;
    object-position: center;
    object-fit: cover;
  }
}
.hooper {
  &-navigation {
    /*padding: 0.625rem;*/
  }
  &-next,
  &-prev {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 333px;
    padding: 0;
    svg {
      fill: white;
      width: 3rem;
      height: 3rem;
    }
    &:focus {
      outline: none;
    }
  }
  &-prev {
    left: 0.625rem;
  }
  &-next {
    right: 0.625rem;
  }
}
</style>
