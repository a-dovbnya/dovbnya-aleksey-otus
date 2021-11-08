<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="700px"
  >
    <slot />
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['toggle-editor'])
const dialogVisible = computed({
  get () {
    return props.open
  },
  set (value) {
    emit('toggle-editor', value)
  }
})
</script>

<style scoped>
.el-dialog__footer {
  display: none;
}
</style>
