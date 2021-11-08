<template>
  <div>
    <h1 class="title">Настройки</h1>

    <div class="add-form">
      <el-form
        ref="formRef"
        :label-position="'top'"
        :model="settingForm"
        :rules="rules"
      >
        <h3>Графики</h3>
        <el-form-item label="Отображать данные за последние (дней)" prop="daysCnt">
          <el-input
            v-model.number="settingForm.daysCnt"
            placeholder="Введите количество"
          />
        </el-form-item>

        <el-form-item label="Количество популярных категорий" prop="categotiesCnt">
          <el-input
            v-model.number="settingForm.categotiesCnt"
            placeholder="Введите количество"
          />
        </el-form-item>

        <el-form-item label="Цвет линии расходов" prop="expensesColor">
          <el-color-picker v-model="settingForm.expensesColor" />
        </el-form-item>

        <el-form-item label="Цвет линии доходов" prop="incomesColor">
          <el-color-picker v-model="settingForm.incomesColor" />
        </el-form-item>

        <el-form-item class="el-form-item_last">
          <el-button type="primary" @click="submitForm()"
            >Сохранить</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { UPDATE_SETTINGS } from '../store/types/actions'

/**
 * Настройки
 * Отображать значение на графике за последние N дней
 * Цвет графика расходов
 * Цвет графика доходов
 */
const store = useStore()
const formRef = ref(null)
const settings = computed(() => store.state.settings)

const settingForm = ref({
  daysCnt: settings.value.daysCnt,
  categotiesCnt: settings.value.categotiesCnt,
  expensesColor: settings.value.expensesColor,
  incomesColor: settings.value.incomesColor
})

const submitForm = (formName) => {
  formRef.value.validate(valid => {
    if (!valid) {
      return
    }

    store.dispatch(UPDATE_SETTINGS, { ...settingForm.value })
  })
}
</script>
