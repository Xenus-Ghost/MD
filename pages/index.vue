<template>
  <div class="container">
    <CircleContainer>
      <CircleItem v-for="cat in categories" :key="cat" :to="cat.path">
        <div class="circle__item">1</div>
      </CircleItem>
    </CircleContainer>
  </div>
</template>

<script>
import CircleContainer from '~/components/Home/Circle/CircleContainer'
import CircleItem from '~/components/Home/Circle/CircleItem'
export default {
  layout: 'Home',
  components: {
    CircleContainer,
    CircleItem
  },
  data() {
    return {
      categories: {
        monolith: {
          path: '/monolith'
        },
        building: {
          path: '/building'
        },
        renovation: {
          path: '/renovation'
        },
        electric: {
          path: '/electric'
        },
        plumbing: {
          path: '/plumbing'
        },
        welding: {
          path: '/welding'
        },
        designing: {
          path: '/designing'
        },
        roads: {
          path: '/roads'
        },
        gas: {
          path: '/gas'
        },
        landscape: {
          path: '/landscape'
        },
        beautification: {
          path: '/beautification'
        },
        tools: {
          path: '/tools'
        },
        stoves: {
          path: '/stoves'
        }
      }
    }
  }
}
</script>

<style>
/*.container {*/
/*  margin: 0 auto;*/
/*  min-height: 100vh;*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*  text-align: center;*/
/*}*/
</style>
