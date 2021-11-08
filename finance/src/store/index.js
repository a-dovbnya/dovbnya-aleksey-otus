import { createStore } from 'vuex'
import auth from './modules/auth.js'
import {
  FETCH_DATA,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  ADD_ACCOUNT,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
  ADD_FINANCE,
  UPDATE_SETTINGS,
  UPDATE_FINANCE,
  DELETE_FINANCE
} from './types/actions'
import mockData from '../mockData/initialState'

import { getLastDays, simpleDate } from '../utils/datetime'
const uuidv4 = () => {
  // eslint-disable-next-line
  return ([1e7] +- 1e3 +- 4e3 +- 8e3 +- 1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export default createStore({
  state: {
    isLoading: false,
    isUpdate: false,
    categories: [],
    finance: [],
    accounts: [],
    settings: {}
  },
  mutations: {
  },
  actions: {
    [FETCH_DATA] ({ state }) {
      state.isLoading = true

      setTimeout(() => {
        state.categories = [...mockData.categories]
        state.accounts = [...mockData.accounts]
        state.finance = [...mockData.finance]
        state.settings = { ...mockData.settings }
        state.isLoading = false
      }, 500)
    },
    [ADD_CATEGORY] ({ state }, category) {
      state.isUpdate = true
      setTimeout(() => {
        category.id = uuidv4()
        state.categories.push(category)
        state.isUpdate = false
      }, 1000)
    },
    [UPDATE_CATEGORY] ({ state }, category) {
      state.isUpdate = true
      setTimeout(() => {
        const cat = state.categories.find(cat => cat.id === category.id)
        cat.name = category.name
        state.isUpdate = false
      }, 1000)
    },
    [DELETE_CATEGORY] ({ state }, id) {
      state.isUpdate = true
      setTimeout(() => {
        const index = state.categories.findIndex(cat => cat.id === id)
        state.categories.splice(index, 1)
        state.isUpdate = false
      }, 1000)
    },
    [ADD_ACCOUNT] ({ state }, account) {
      state.isUpdate = true
      setTimeout(() => {
        account.id = uuidv4()
        state.accounts.push(account)
        state.isUpdate = false
      }, 1000)
    },
    [UPDATE_ACCOUNT] ({ state }, account) {
      state.isUpdate = true
      setTimeout(() => {
        const cat = state.accounts.find(acc => acc.id === account.id)
        cat.name = account.name
        cat.balance = account.balance
        state.isUpdate = false
      }, 1000)
    },
    [DELETE_ACCOUNT] ({ state }, id) {
      state.isUpdate = true
      setTimeout(() => {
        const index = state.accounts.findIndex(acc => acc.id === id)
        state.accounts.splice(index, 1)
        state.isUpdate = false
      }, 1000)
    },
    [ADD_FINANCE] ({ state, getters }, finance) {
      state.isUpdate = true
      setTimeout(() => {
        finance.id = uuidv4()
        state.finance.push(finance)
        // Обновление счета
        const account = getters.getAccountById(finance.account)
        const value = finance.value

        if (finance.group === 'expenses') {
          account.balance -= value
        } else if (finance.group === 'income') {
          account.balance += value
        }

        state.isUpdate = false
      }, 1000)
    },
    [UPDATE_FINANCE] ({ state, getters }, finance) {
      state.isUpdate = true

      setTimeout(() => {
        const item = state.finance.find(el => el.id === finance.id)
        const oldValue = item.value
        const delta = finance.value - oldValue
        const account = getters.getAccountById(finance.account)

        if (finance.group === 'expenses') {
          account.balance -= delta
        } else if (finance.group === 'income') {
          account.balance += delta
        }

        Object.keys(item).forEach(key => {
          item[key] = finance[key]
        })
        state.isUpdate = false
      }, 1000)
    },

    [DELETE_FINANCE] ({ state, getters }, id) {
      state.isUpdate = true
      setTimeout(() => {
        const index = state.finance.findIndex(fin => fin.id === id)
        const finance = state.finance[index]
        const account = getters.getAccountById(finance.account)

        if (finance.group === 'expenses') {
          account.balance += finance.value
        } else if (finance.group === 'income') {
          account.balance -= finance.value
        }

        state.finance.splice(index, 1)
        state.isUpdate = false
      }, 1000)
    },

    [UPDATE_SETTINGS] ({ state }, settings) {
      state.isUpdate = true
      setTimeout(() => {
        state.settings = { ...settings }
        // Обновление счета
        state.isUpdate = false
      }, 1000)
    }
  },
  getters: {
    getCategoryExpenses: state => {
      return state.categories.filter(cat => cat.group === 'expenses')
    },
    getCategoryIncome: state => {
      return state.categories.filter(cat => cat.group === 'income')
    },
    getCategoryById: state => id => {
      return state.categories.find(cat => cat.id === id)
    },
    getAccountById: state => id => {
      return state.accounts.find(acc => acc.id === id)
    },
    getFinanceSortDate: state => {
      return state.finance.sort((f1, f2) => f2.date - f1.date)
    },
    getFinanceDateset: state => () => {
      const startDate = new Date() - (state.settings.daysCnt - 1) * 24 * 60 * 60 * 1000
      const expensesData = state.finance.filter(item => item.group === 'expenses' && item.date >= startDate)
      const incomesData = state.finance.filter(item => item.group === 'income' && item.date >= startDate)
      const expenses = []
      const incomes = []
      const dates = getLastDays(state.settings.daysCnt)
      // todo - для повышения производительности сделать поле с датой у каждой записи и сравнивать без приведения даты
      dates.forEach(date => {
        expenses.push(
          expensesData
            .filter(el => simpleDate(el.date) === date)
            .reduce((prev, current) => prev + current.value, 0)
        )
        incomes.push(
          incomesData
            .filter(el => simpleDate(el.date) === date)
            .reduce((prev, current) => prev + current.value, 0)
        )
      })

      return {
        labels: dates,
        expenses: expenses,
        incomes: incomes
      }
    },
    getPopularCategories: state => () => {
      const startDate = new Date() - (state.settings.daysCnt - 1) * 24 * 60 * 60 * 1000
      const expensesData = state.finance.filter(item => item.group === 'expenses' && item.date >= startDate)

      const labels = []
      const labelsId = []
      const expenses = []

      expensesData.forEach(el => {
        if (!labelsId.includes(el.category)) {
          labelsId.push(el.category)
          labels.push(state.categories.find(cat => cat.id === el.category).name)
          expenses.push(
            expensesData.filter(expence => expence.category === el.category)
              .reduce((prev, curr) => prev + curr.value, 0)
          )
        }
      })
      labels.length = state.settings.categotiesCnt
      expenses.length = state.settings.categotiesCnt
      // Получить количество трат по каждой из категорий
      return {
        labels,
        expenses
      }
    },
    getFinanceById: state => id => {
      return state.finance.find(fn => fn.id === id)
    }
  },
  modules: {
    auth
  }
})
