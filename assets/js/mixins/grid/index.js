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
      // const cols = parseInt(this.cols) > 12 ? this.cols : return
      const grid = {
        // 'grid-template-columns':
        //   this.cols > 12 ? 'repeat(' + cols + ', 1fr)' : ''
      }
      if (parseInt(this.cols > 12))
        grid.push(['grid.grid-template-columns', 'repeat(' + cols + ', 1fr)'])
      return grid
    },
    gridClasses() {
      const cols = typeof this.cols === 'string' ? this.cols : this.cols
      const grid = [
        // grid_cols: 'grid_cols_' + cols
      ]
      if (parseInt(cols) <= 12) grid.push(['grid_cols_' + cols])
      return grid
    }
  }
}

export const columns = {
  name: 'columns',
  props: {
    col: {
      type: [String, Number, Array]
    }
  },
  computed: {
    // gridStyles() {
    //   const cols = typeof this.cols === 'string' ? this.cols : this.cols
    //   const grid = {
    //     'grid-template-columns': 'repeat(' + cols + ', 1fr)'
    //   }
    //   return grid
    // },
    gridClasses() {
      const col = typeof this.cols === 'string' ? this.col : this.col
      const grid = ['grid__column_' + col]
      return grid
    }
  }
}
