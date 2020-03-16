<template>
  <div class="category-select">
    <treeselect
      v-model="category"
      :options="options"
      :searchable="true"
      :show-count="true"
      :default-expand-level="0"
      :disable-branch-nodes="true"
      required
      @input="update"
    >
      <label
        slot="option-label"
        slot-scope="{
          node,
          shouldShowCount,
          count,
          labelClassName,
          countClassName
        }"
        :class="['category-select__label']"
      >
        {{ node.label }}
        <span v-if="shouldShowCount" :class="countClassName"
          >({{ count }})</span
        >
      </label>
    </treeselect>
  </div>
</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { listToTree } from '@/assets/js/util'

export default {
  name: 'CategorySelect',
  components: {
    Treeselect
  },
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    categories: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      rootCategory: null,
      category: 1,
      subCategory: null,
      adSubCategories: [],
      subSubCategories: null
    }
  },
  computed: {
    options() {
      // let data = []
      const data = this.categories
      data.forEach((elem) => {
        elem.label = elem.service_title ? elem.service_title : elem.sale_title
      })
      const returnData = listToTree(data)
      return returnData
    }
  },
  methods: {
    update() {
      const data = [this.category]
      this.$emit('change', data)
    }
  }
}
</script>

<style lang="scss">
.vue-treeselect {
  &__menu {
    background-color: rgba(14, 36, 62, 0.95);
  }
  &__control {
    background-color: rgba(14, 36, 62, 0.95);
  }
  &__value-container {
    &:hover {
      background-color: transparent;
    }
  }
}
.category-select {
  &__label {
    background-color: transparent;
    &:hover {
      background-color: transparent;
    }
  }
}
.vue-treeselect--single .vue-treeselect__option--selected {
  background-color: var(--color-primary);
}
.vue-treeselect--single .vue-treeselect__option--selected:hover {
  background-color: var(--color-primary);
}
.vue-treeselect__option:hover {
  background-color: var(--color-primary);
}
.vue-treeselect__single-value {
  color: white;
}
</style>
