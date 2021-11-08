import {
  SET_AUTH,
  SET_AUTH_FETCHING,
  SET_AUTH_ERROR,
  TOGGLE_AUTH,
  LOGOUT
} from '../types/mutations'
import { AUTH_REQUEST, FETCH_DATA } from '../types/actions'
import router from '../../router/'

export default {
  state: {
    isAuth: false,
    isFetching: false,
    error: null,
    mode: 'auth',
    token: null
  },
  mutations: {
    [SET_AUTH] (state) {
      console.log('SET_AUTH')
      state.isAuth = true
      state.isFetching = false
      state.error = null
      // state.token = token

      router.push('/statistics')
    },
    [SET_AUTH_FETCHING] (state) {
      console.log('SET_AUTH_FETCHING')
      /*
       ** Отправлен запрос на авторизацию
       */
      state.isFetching = true
      state.error = false
    },
    [SET_AUTH_ERROR] (state) {
      console.log('SET_AUTH_ERROR')
    },
    [TOGGLE_AUTH] (state) {
      console.log('TOGGLE_AUTH')
    },
    [LOGOUT] (state) {
      console.log('LOGOUT')
      state.isAuth = false
      router.push('/login')
    }
  },
  actions: {
    [AUTH_REQUEST] ({ state, commit, dispatch, rootState }, auth) {
      console.log('auth = ', auth)
      commit(SET_AUTH_FETCHING)
      if (auth.login !== 'test' || auth.password !== 'test') {
        alert('Неверный логин или пароль')
        state.isFetching = false
        return
      }
      setTimeout(() => {
        commit(SET_AUTH)
        dispatch(FETCH_DATA)
      }, 500)
    }
  },
  getters: {
    isAuth: state => {
      return state.isAuth
    },
    isFetching: state => {
      return state.isFetching
    }
  }
}
