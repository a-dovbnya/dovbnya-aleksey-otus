<template>
  <div>
    <el-tooltip
      class="item"
      effect="dark"
      content="Добавить расход или доход"
      placement="left"
    >
      <div class="add-btn" @click="dialogVisible = true"><Plus /></div>
    </el-tooltip>

    <el-dialog
      v-model="dialogVisible"
      title="Добавить"
      width="50%"
      @close="resetForm"
    >
      <el-tabs v-model="financeForm.group" type="card" @tab-click="changeTab">
          <el-tab-pane label="Доход" name="income" />
          <el-tab-pane label="Расход" name="expenses" />
      </el-tabs>

      <div class="add-form">
        <el-form
          ref="formRef"
          :label-position="'top'"
          :model="financeForm"
          :rules="rules"
        >
          <el-form-item label="Дата" prop="date">
            <el-config-provider :locale="locale">
              <el-date-picker v-model="financeForm.date" type="date" placeholder="Выберите дату"></el-date-picker>
            </el-config-provider>
          </el-form-item>

          <el-form-item label="Категория" prop="category">
            <el-select
              v-model="financeForm.category"
              placeholder="Select"
            >
              <el-option
                v-for="category in categories"
                :key="category.id"
                :label="category.name"
                :value="category.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Счет" prop="account">
            <el-select
              v-model="financeForm.account"
              placeholder="Select"
              @change="isLittleFunds = false"
            >
              <el-option
                v-for="account in accounts"
                :key="account.id"
                :label="`${account.name} (${account.balance})`"
                :value="account.id"
              />
            </el-select>
          </el-form-item>

          <el-alert
            v-if="isLittleFunds"
            title="На выбранном счёте недостаточно средств"
            type="warning"
            style="margin-bottom: 20px;"
            @close="isLittleFunds = false"
          />

          <el-form-item label="Сумма" prop="value">
            <el-input v-model.number="financeForm.value" placeholder="Укажите сумму" />
          </el-form-item>

          <el-form-item label="Примечание" prop="note">
            <el-input v-model="financeForm.note" type="textarea" placeholder="Примечание" />
          </el-form-item>

        </el-form>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Закрыть</el-button>
        <el-button type="primary" @click="submitForm('categoryForm')"
        >{{ financeForm.id ? 'Изменить' : 'Добавить' }}</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, defineExpose } from 'vue'
import { useStore } from 'vuex'
import ru from 'element-plus/lib/locale/lang/ru'
import { ADD_FINANCE, UPDATE_FINANCE } from '../store/types/actions'

const dialogVisible = ref(false)
const isLittleFunds = ref(false)
const locale = ru

const initialState = {
  id: '',
  date: new Date(),
  category: '',
  group: 'expenses',
  value: 0,
  account: 'acc-1',
  note: ''
}

const store = useStore()
const formRef = ref(null)
const financeForm = ref({ ...initialState })

const categories = computed(() => {
  if (financeForm.value.group === 'income') {
    return store.getters.getCategoryIncome
  }
  return store.getters.getCategoryExpenses
})

const accounts = computed(() => {
  return store.state.accounts
})

const changeTab = () => {
  financeForm.value.category = ''
}

const setFormValue = (id) => {
  if (!id) {
    resetForm()
  }

  financeForm.value = { ...store.getters.getFinanceById(id) }
}

const resetForm = () => {
  financeForm.value = { ...initialState }
  console.log('reset = ', financeForm.value)
  isLittleFunds.value = false
}

const submitForm = (formName) => {
  formRef.value.validate(valid => {
    if (!valid) {
      return false
    }

    const balance = store.getters.getAccountById(financeForm.value.account).balance

    // Расход при недостатке средств на карте
    if (financeForm.value.group === 'expenses' && balance < +financeForm.value.value) {
      isLittleFunds.value = true
      return
    }

    if (financeForm.value.id) {
      store.dispatch(UPDATE_FINANCE, { ...financeForm.value })
    } else {
      financeForm.value.date = (financeForm.value.date || new Date()).getTime()
      store.dispatch(ADD_FINANCE, { ...financeForm.value })
    }

    resetForm()
    dialogVisible.value = false
  })
}
// eslint-disable-next-line
const openEditor = (id) => {
  setFormValue(id)
  dialogVisible.value = true
}

defineExpose({ openEditor })

const rules = ref({
  date: [
    {
      required: true,
      message: 'Поле не должно быть пустым',
      trigger: 'blur'
    }
  ],
  category: [
    {
      required: true,
      message: 'Поле не должно быть пустым',
      trigger: 'blur'
    }
  ],
  account: [
    {
      required: true,
      message: 'Поле не должно быть пустым',
      trigger: 'blur'
    }
  ],
  value: [
    {
      required: true,
      message: 'Поле не должно быть пустым',
      trigger: 'blur'
    }
  ]
})
</script>

<style scoped lang="scss">
.add-btn {
  background-color: #0081ff;
  box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%);
  color: #fff;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  position: fixed;
  z-index: 1;
  right: 40px;
  bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: .2s ease;

  &:hover svg {
    transform: rotate(180deg);
  }

  svg {
    width: 25px;
    height: 25px;
    transition: .2s ease;
  }
}

.el-dialog__footer {
  text-align: left;
}
</style>
