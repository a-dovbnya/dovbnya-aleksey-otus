<template>
  <div class="app">
    <div class="app__navbar">
      <div class="app__logo">
        <svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M21 8C19.5 8 18.7 9.4 19.1 10.5L15.5 14.1C15.2 14 14.8 14 14.5 14.1L11.9 11.5C12.3 10.4 11.5 9 10 9C8.6 9 7.7 10.4 8.1 11.5L3.5 16C2.4 15.7 1 16.5 1 18C1 19.1 1.9 20 3 20C4.4 20 5.3 18.6 4.9 17.5L9.4 12.9C9.7 13 10.1 13 10.4 12.9L13 15.5C12.7 16.5 13.5 18 15 18C16.5 18 17.3 16.6 16.9 15.5L20.5 11.9C21.6 12.2 23 11.4 23 10C23 8.9 22.1 8 21 8M15 9L15.9 6.9L18 6L15.9 5.1L15 3L14.1 5.1L12 6L14.1 6.9L15 9M3.5 11L4 9L6 8.5L4 8L3.5 6L3 8L1 8.5L3 9L3.5 11Z" />
        </svg>
      </div>
      <span>My Money</span>
    </div>
    <div v-if="!isLoading" class="app__inner">
      <aside class="app__aside">
        <router-link to="/statistics" active-class="active" class="menu-link">
          <span class="menu-link__icon"><PieChart /></span>
          Статистика
        </router-link>
        <router-link to="/account" active-class="active" class="menu-link">
          <span class="menu-link__icon"><Money /></span>
          Счета
        </router-link>
        <router-link to="/categories" active-class="active" class="menu-link">
          <span class="menu-link__icon"><Management /></span>
          Категории
        </router-link>
        <router-link to="/settings" active-class="active" class="menu-link">
          <span class="menu-link__icon"><setting /></span>
          Настройки
        </router-link>
        <router-link to="/login" class="menu-link" @click="logout">
          <span class="menu-link__icon"><SwitchButton /></span>
          Выход
        </router-link>
      </aside>
      <main class="app__content">
        <div v-loading="isUpdate" class="app__content-inner">
          <router-view />
        </div>
      </main>
    </div>
    <div v-else v-loading="isLoading" class="app__inner"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isLoading = computed(() => {
  return store.state.isLoading
})
const isUpdate = computed(() => {
  return store.state.isUpdate
})

const logout = () => {
  store.commit('LOGOUT')
}
</script>

<style scoped lang="scss">
.app {
  height: 100%;
  width: 100%;

  &__navbar {
    height: 55px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background-color: #222a45;
    padding: 5px 20px;
    display: flex;
    align-items: center;

    span {
      color: white;
      margin-left: 10px;
      font-size: 20px;
      margin-top: 1px;
    }
  }

  &__logo {
    width: 32px;
    height: 32px;
    color: white;
    margin: 0px 0 0 5px;

    svg {
      width: 32px;
      height: 32px;
      fill: white;
    }
  }

  &__inner {
    display: flex;
    height: calc(100% - 55px);
  }

  &__aside {
    width: 250px;
    background-color: #222a45;
    padding-top: 20px;
  }

  &__menu {
    height: 100%;
  }

  &__content {
    flex: 1;
    padding: 25px 30px;
    overflow: auto;
  }

  &__content-inner {
    max-width: 1500px;
  }
}

.menu-link {
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  line-height: 48px;
  color: white;
  font-size: 14px;
  text-decoration: none;
  padding: 0  20px 0 15px;
  text-align: left;
  border-left: 4px solid transparent;
  transition: .25s ease;

  &:hover, &.active {
    background-color: #00000133;
  }

  &.active {
    border-left-color: white;
  }

  &__icon {
    width: 20px;
    height: 20px;
    display: block;
    font-size: 0;
    margin-right: 10px;

    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
