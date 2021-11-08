import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Statistics from '../views/Statistics'
import Settings from '../views/Settings'
import Account from '../views/Account'
import Categories from '../views/Categories'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/statistics',
        name: 'Statistics',
        component: Statistics,
        meta: { requiresAuth: true }
      },
      {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: { requiresAuth: true }
      },
      {
        path: '/account',
        name: 'Account',
        component: Account,
        meta: { requiresAuth: true }
      },
      {
        path: '/categories',
        name: 'Categories',
        component: Categories,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // этот путь требует авторизации, проверяем залогинен ли
    // пользователь, и если нет, перенаправляем на страницу логина
    if (!store.state.auth.isAuth) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    if (store.state.auth.isAuth) {
      next({
        path: '/statistics'
      })
    } else {
      next()
    }
  }
})

export default router
