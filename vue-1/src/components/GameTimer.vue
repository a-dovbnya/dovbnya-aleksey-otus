<template>
  <div>{{ formatTime }}</div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'GameTimer',
  props: {
    time: {
      type: Number,
      required: true
    }
  },
  setup (props, { emit }) {
    const time = ref(props.time * 60)
    let _timer = null
    const formatTime = computed(() => {
      if (!time.value) {
        return ''
      }

      return `${parseInt(time.value / 60)}:${time.value % 60}`
    })

    onMounted(() => {
      _timer = setInterval(() => {
        if (time.value > 0) {
          time.value = time.value - 1
        } else {
          time.value = 0
          clearInterval(_timer)
          emit('timer-done')
        }
      }, 1000)
    })

    onBeforeUnmount(() => {
      clearInterval(_timer)
    })

    return {
      formatTime
    }
  }
}
</script>
