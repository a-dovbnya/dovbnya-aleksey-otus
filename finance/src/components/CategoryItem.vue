<template>
  <div class="cat-item">
    <div class="cat-item__body">{{ props.title }}</div>
    <div class="cat-item__tool">
      <edit
        class="cat-item__btn"
        title="Редактировать"
        @click="$emit('cat-edit', props.id)"
      />
      <delete
        class="cat-item__btn cat-item__btn_del"
        @click="$emit('cat-delete', props.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  id: [String, Number],
  title: String
})
</script>

<style scoped lang="scss">
.cat-item {
  width: 100%;
  padding: 8px 20px;
  font-size: 19px;
  margin-top: -1px;
  cursor: default;
  display: flex;
  align-items: center;

  &:hover .cat-item__tool {
    opacity: 1;
  }

  &__tool {
    min-width: 60px;
    min-height: 30px;
    margin-left: 15px;
    display: flex;
    align-items: center;
    padding-top: 2px;
    opacity: 0;
    transition: opacity .25s linear;
  }

  &__btn {
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: #9f9f9f;
    outline: none !important;
    transition: .2s ease;

    &:hover {
      color: #409eff;
    }

    &_del:hover {
      color: #f23c3c;
    }
    & + & {
      margin-left: 8px;
    }
  }
}
</style>
