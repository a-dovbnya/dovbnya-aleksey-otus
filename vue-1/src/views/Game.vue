<template>
  <div class="about">
    <div class="panel">
      <el-button v-if="!isStarted" type="primary" @click="startGame">Start</el-button>
      <el-button v-else type="primary" @click="stopGame">Stop</el-button>
      <GameTimer
        v-if="isStarted"
        :time="duration"
        @timer-done="stopGame"
      />
    </div>
    <p class="message">{{ message }}</p>
    <div :class="['game-body', {'game-body_inactive': !isStarted}]">
      <div class="output">
        <template v-for="(item, i) in output" :key="i">
          <span :class="['output__item', {active: i === activeIndex && !activeResult}]">{{ item }}</span>
          <span v-if="i === (output.length - 1)" class="output__operator">=</span>
          <span v-else class="output__operator">{{ operator }}</span>
        </template>
        <span :class="['output__item', {active: activeResult}]">{{ result? result: '?' }}</span>
      </div>

      <GameKeyboard
        @number="addNum"
        @operator="onOperator"
      />
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import GameKeyboard from '../components/GameKeyboard.vue'
import GameTimer from '../components/GameTimer'

export default {
  name: 'Game',
  components: { GameKeyboard, GameTimer },
  setup () {
    const currentValues = ref([])
    const activeIndex = ref(0)
    const activeResult = ref(false)
    const result = ref('')
    const operator = ref('?')
    const isStarted = ref(false)
    const message = ref('')
    const gameResults = reactive([])
    const store = useStore()

    const addNum = (num) => {
      if (activeResult.value) {
        result.value += num
        return
      }
      if (!currentValues.value[activeIndex.value]) {
        currentValues.value[activeIndex.value] = String(num)
        return
      }
      currentValues.value[activeIndex.value] += num
    }

    const onOperator = (operator) => {
      if (operator === '>') {
        if (activeIndex.value === settings.value.complexity - 1 && currentValues.value[activeIndex.value]) {
          activeResult.value = true
        } else if (currentValues.value[activeIndex.value]) {
          activeIndex.value += 1
        }
        return
      }
      if (operator === '<' && activeIndex.value > 0) {
        if (activeResult.value) {
          activeResult.value = false
          activeIndex.value = settings.value.complexity - 1
        } else {
          activeIndex.value -= 1
        }
        return
      }
      if (operator === '←') {
        if (activeResult.value) {
          result.value = result.value.slice(0, -1)
        } else {
          currentValues.value[activeIndex.value] = currentValues.value[activeIndex.value].slice(0, -1)
        }
        return
      }
      if (operator === '=') {
        if (activeResult.value && result.value) {
          checkResult()
          return
        }
        message.value = 'Введите значение'
        setTimeout(() => { message.value = '' }, 500)
      }
    }

    const checkResult = () => {
      // eslint-disable-next-line
      const resultExpr = parseInt(result.value) === parseInt(eval([...currentValues.value].join(operator.value)))

      message.value = resultExpr ? 'Правильно' : 'Не правильно'
      gameResults.push(resultExpr)

      setTimeout(() => {
        resetExpression()
        setOperator()
      }, 750)
    }

    const setOperator = () => {
      const operators = Object.values(settings.value.operation)
        .filter(item => item.value)
        .map(item => item.symbol)

      const index = Math.floor(Math.random() * operators.length)

      operator.value = operators[index]
    }

    const startGame = () => {
      isStarted.value = true
      setOperator()
    }

    const stopGame = () => {
      isStarted.value = false

      if (gameResults.length) {
        store.commit('addLastResult', [...gameResults])
      }

      resetExpression()
    }

    const resetExpression = () => {
      message.value = ''
      currentValues.value = []
      activeIndex.value = 0
      activeResult.value = false
      result.value = ''
      operator.value = '?'
    }

    const output = computed(() => {
      const delta = settings.value.complexity - currentValues.value.length
      const result = [...currentValues.value]

      for (let i = 0; i < delta; i++) {
        result.push('')
      }

      return result
    })

    onBeforeUnmount(() => {
      stopGame()
    })

    const settings = computed(() => store.getters.getSettings)
    const duration = computed(() => settings.value?.duration || 1)

    return {
      currentValues,
      activeIndex,
      activeResult,
      result,
      operator,
      isStarted,
      message,
      gameResults,
      addNum,
      onOperator,
      startGame,
      stopGame,
      output,
      duration
    }
  }
}
</script>

<style scoped lang="less">
.panel {
  display: flex;
  justify-content: space-between;
}

.game-body {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;

  &_inactive::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(255,255,255,0.6);
  }
}

.output {
  margin-bottom: 30px;
  font-size: 30px;
  width: 100%;
  text-align: center;

  &__item {
    display: inline-block;
    vertical-align: top;
    min-width: 70px;
    height: 35px;
    border-bottom: 1px solid black;
  }

  &__operator {
    margin: 0 8px;
    min-width: 20px;
    display: inline-block;
    vertical-align: top;
  }
}

.active {
  box-shadow: 0px 0px 3px 0px #ef181861;
  border-radius: 4px;
  border-bottom-color: #ef181861;
}

.message {
  text-align: center;
  margin: 10px 0 0;
  font-size: 19px;
  height: 22px;
}
</style>
