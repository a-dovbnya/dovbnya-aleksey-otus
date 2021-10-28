<template>
  <div class="home">
    <div class="info">
      <h3>Привет!</h3>
      <p>
        Добро пожаловать!<br>
        Ваш последний результат - решено {{ lastResult.success }} из {{ lastResult.total }}.<br>
        Общая точность - {{ lastResult.accuracy }}%.
      </p>
    </div>
    <div>
      <div class="range-slider">
        <el-slider v-model="settings.duration" :min="1" :max="7"></el-slider>
        <div class="range-slider__row">Длительность: {{ settings.duration }} мин.</div>
      </div>
      <div class="range-slider">
        <el-slider v-model="settings.complexity" :min="2" :max="7"></el-slider>
        <div class="range-slider__row">Сложность: {{ settings.complexity }}</div>
      </div>
    </div>
    <div class="settings-form">
      <div>
        <el-checkbox v-model="settings.operation.addition.value" label="Сложение"></el-checkbox>
      </div>
      <div>
        <el-checkbox v-model="settings.operation.difference.value" label="Вычитание"></el-checkbox>
      </div>
      <div>
        <el-checkbox v-model="settings.operation.multiplication.value" label="Умножение"></el-checkbox>
      </div>
      <div>
        <el-checkbox v-model="settings.operation.division.value" label="Деление"></el-checkbox>
      </div>
    </div>
    <div class="btn-row">
      <el-button type="success" @click="saveSettings">Сохранить</el-button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, computed } from 'vue'

export default {
  name: 'Home',
  setup () {
    const store = useStore()
    const settings = reactive(store.getters.getSettings)
    const saveSettings = () => {
      store.commit('saveSettings', settings)
    }
    const lastResult = computed(() => store.getters.getLastResult)

    return {
      settings,
      saveSettings,
      lastResult
    }
  }
}
</script>

<style scoped lang="less">
.settings-form {
  text-align: left;
}

.range-slider {
  max-width: 250px;
  margin-bottom: 30px;

  &__row {
    text-align: left;
  }
}

.info {
  text-align: left;
  max-width: 400px;
}

.btn-row {
  text-align: left;
  margin-top: 30px;
}
</style>
