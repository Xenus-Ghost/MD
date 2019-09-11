// import Vue from 'vue'
// import { PropValidator } from 'vue/types/options'
import { convertToUnit } from '../../util/helpers'

// export default Vue.extend({
export const Measurable = {
  name: 'Measurable',
  props: {
    height: [String, Number],
    maxHeight: [String, Number],
    maxWidth: [String, Number],
    minHeight: [String, Number],
    minWidth: [String, Number],
    width: [String, Number]
  },
  computed: {
    measurableStyles() {
      const styles = {}
      const height = convertToUnit(this.height)
      const minHeight = convertToUnit(this.minHeight)
      const minWidth = convertToUnit(this.minWidth)
      const maxHeight = convertToUnit(this.maxHeight)
      const maxWidth = convertToUnit(this.maxWidth)
      const width = convertToUnit(this.width)
      if (height) styles.height = height
      if (minHeight) styles.minHeight = minHeight
      if (minWidth) styles.minWidth = minWidth
      if (maxHeight) styles.maxHeight = maxHeight
      if (maxWidth) styles.maxWidth = maxWidth
      if (width) styles.width = width
      return styles
    }
  }
}
