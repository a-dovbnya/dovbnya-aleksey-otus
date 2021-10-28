import { createStore } from 'vuex'

export default createStore({
  state: {
    settings: {
      duration: 1,
      complexity: 2,
      operation: {
        addition: {
          value: true,
          symbol: '+'
        },
        difference: {
          value: false,
          symbol: '-'
        },
        multiplication: {
          value: true,
          symbol: '*'
        },
        division: {
          value: false,
          symbol: '/'
        }
      }
    },
    results: [[true, true, true, false]]
  },
  mutations: {
    saveSettings (state, settings) {
      state.settings = { ...settings }
    },
    addLastResult (state, result) {
      state.results.push(result)
    }
  },
  getters: {
    getSettings (state) {
      return { ...state.settings }
    },
    getLastResult (state) {
      if (state.results.length) {
        const lastItem = state.results[state.results.length - 1]
        const success = lastItem.filter(el => el === true).length

        return {
          total: lastItem.length,
          success,
          accuracy: Math.floor(success * 100 / lastItem.length)
        }
      }

      return { total: 0, success: 0, accuracy: 0 }
    }
  }
})
