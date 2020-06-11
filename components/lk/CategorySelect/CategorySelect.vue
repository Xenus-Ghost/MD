<template>
  <div class="category-select">
    <treeselect
      v-model="category"
      :options="options"
      :searchable="true"
      :show-count="true"
      :default-expand-level="0"
      :disable-branch-nodes="true"
      :multiple="true"
      required
      :placeholder="placeholder"
      :value-consists-of="'ALL_WITH_INDETERMINATE'"
      :flat="true"
      @input="
        (arg) => {
          update(arg)
        }
      "
    >
      <label
        slot="option-label"
        slot-scope="{
          node,
          shouldShowCount,
          count,
          labelClassName,
          countClassName,
        }"
        :class="['category-select__label']"
      >
        {{ node.label }}
        <span v-if="shouldShowCount" :class="countClassName"
          >({{ count }})</span
        >
      </label>
    </treeselect>
    <span class="category-select__counter">
      {{ `Выбрано: ${selectedCount} / ${max > 0 ? max : '-'}` }}
    </span>
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
    Treeselect,
  },
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    categories: {
      type: Array,
      default: null,
    },
    max: {
      type: Number,
      default: 1,
    },
    placeholder: {
      type: String,
      default: 'Выберите...',
    },
    labelField: {
      type: String,
      default: null,
    },
    adType: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      rootCategory: null,
      category: [],
      subCategory: null,
      adSubCategories: [],
      subSubCategories: null,
      parentCategory: null,
    }
  },
  computed: {
    options() {
      // let data = []
      const data = this.categories
      /* data.forEach((elem) => {
        elem.label = elem.name
      }) */
      const returnData = listToTree(data)
      return returnData
    },
    selectedCount() {
      return this.category.length
    },
  },
  methods: {
    update(e) {
      const numbersLength = e.length
      const lastCategory = this.categories.find(
        (result) => result.id === e[numbersLength - 1]
      )
      this.$set(
        this,
        'parentCategory',
        lastCategory ? lastCategory.parent_id : null
      )
      let tempParentId = null
      if (this.parentCategory === null)
        this.category.splice(0, numbersLength - 1)
      this.category.forEach((elem, index, object) => {
        tempParentId = this.categories.find((result) => result.id === elem)
          .parent_id
        if (tempParentId !== this.parentCategory) {
          object.splice(index, 1)
        }
      })
      if (numbersLength > this.max && this.max > 0) {
        this.category.pop()
        // alert(`Максимум ${this.max}`)
        this.$toast.error(`Максимум ${this.max} категорий`)
      }
      this.$emit('change', this.category)
    },
  },
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
  &__counter {
    margin-top: 0.5rem;
    font-size: 0.75rem;
  }
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
