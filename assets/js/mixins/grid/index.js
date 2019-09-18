// import matchBreakpoint from '../responsive/index'

export const grids = {
  name: 'grids',
  props: {
    cols: {
      type: [String, Number, Array]
    }
  },
  computed: {
    gridStyles() {
      const cols = typeof this.cols === 'string' ? this.cols : this.cols
      const grid = {
        'grid-template-columns': 'repeat(' + cols + ', 1fr)'
      }
      return grid
    }
  }
}
