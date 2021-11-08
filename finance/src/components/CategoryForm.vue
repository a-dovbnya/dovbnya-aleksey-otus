<template>
  <div class="add-form">
    <el-form
      ref="formRef"
      :label-position="'top'"
      :model="categoryForm"
      :rules="rules"
    >
      <el-form-item v-if="props.id" label="id">
        <el-input :modelValue="props.id" disabled />
      </el-form-item>

      <el-form-item label="Группа">
         <el-select
          v-model="categoryForm.group"
          :disabled="!!props.id"
          placeholder="Select"
        >
          <el-option
            label="Расходы"
            value="expenses"
          />
          <el-option
            label="Доходы"
            value="income"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Название" prop="name">
        <el-input v-model="categoryForm.name" placeholder="Please input" />
      </el-form-item>

      <el-form-item class="el-form-item_last">
        <el-button type="primary" @click="submitForm('categoryForm')"
          >Сохранить</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { ADD_CATEGORY, UPDATE_CATEGORY } from '../store/types/actions'

const store = useStore()
const props = defineProps({
  id: {
    type: [String, Number],
    default: null
  }
})
const emits = defineEmits(['close-popup'])
const formRef = ref(null)
const categoryForm = ref({
  group: 'income',
  name: ''
})
const rules = ref({
  name: [
    {
      required: true,
      message: 'Поле не должно быть пустым',
      trigger: 'blur'
    }
  ]
})

watch(
  () => props.id,
  (id) => setFormValue(id)
)

const submitForm = (formName) => {
  formRef.value.validate(valid => {
    if (!valid) {
      return
    }

    const category = {
      id: props.id,
      name: categoryForm.value.name,
      group: categoryForm.value.group
    }

    if (props.id) {
      store.dispatch(UPDATE_CATEGORY, category)
    } else {
      store.dispatch(ADD_CATEGORY, category)
    }

    emits('close-popup')
  })
}

const setFormValue = (id) => {
  if (!id) {
    categoryForm.value.name = ''
    return
  }

  setTimeout(() => {
    formRef.value.validate()
  }, 0)

  const category = store.getters.getCategoryById(id)

  categoryForm.value.group = category.group
  categoryForm.value.name = category.name
}

onMounted(() => {
  setFormValue(props.id)
})
</script>
