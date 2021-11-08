<template>
  <div class="add-form">
    <el-form
      ref="formRef"
      :label-position="'top'"
      :model="accountForm"
      :rules="rules"
    >
      <el-form-item label="Название счета" prop="name">
        <el-input v-model="accountForm.name" placeholder="Название счета" />
      </el-form-item>

      <el-form-item label="Баланс" prop="balance">
        <el-input v-model="accountForm.balance" placeholder="Баланс счета" />
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
import { ADD_ACCOUNT, UPDATE_ACCOUNT } from '../store/types/actions'

const store = useStore()

const props = defineProps({
  id: {
    type: [String, Number],
    default: null
  }
})
const emits = defineEmits(['close-popup'])
const formRef = ref(null)

const accountForm = ref({
  balance: 0,
  name: ''
})

const rules = ref({
  name: [
    {
      required: true,
      message: 'Поле не должно быть пустым',
      trigger: 'blur'
    }
  ],
  balance: [
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

    const account = {
      id: props.id,
      name: accountForm.value.name,
      balance: +accountForm.value.balance
    }

    if (props.id) {
      store.dispatch(UPDATE_ACCOUNT, account)
    } else {
      store.dispatch(ADD_ACCOUNT, account)
    }

    emits('close-popup')
  })
}

const setFormValue = (id) => {
  if (!id) {
    accountForm.value.name = ''
    accountForm.value.balance = ''
    return
  }

  setTimeout(() => {
    formRef.value.validate()
  }, 0)

  const account = store.getters.getAccountById(id)

  accountForm.value.balance = account.balance
  accountForm.value.name = account.name
}

onMounted(() => {
  setFormValue(props.id)
})
</script>
