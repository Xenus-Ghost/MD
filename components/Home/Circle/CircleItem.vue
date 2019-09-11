<template>
  <Button shape="circle" height="140px" width="140px">
    <slot></slot>
  </Button>
</template>

<script>
import Button from '@/components/Button/Button'
export default {
  name: 'CircleItem',
  components: {
    Button
  }
}
</script>

<style lang="scss">
@import 'CircleItem';
</style>
