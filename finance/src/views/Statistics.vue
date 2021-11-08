<template>
  <div>
    <h1 class="title">Статистика</h1>
    <div class="card-box">
      <div class="card-box__item"></div>
      <div class="card-box__item card-box__item_sm"></div>

      <el-card class="card-item">
        <template #header>
          <div class="card-header">
            <span>Доходы и расходы</span>
          </div>
        </template>
        <LineChart :chartData="financeData" />
      </el-card>

      <el-card class="card-item card-item_sm">
        <template #header>
          <div class="card-header">
            <span>Популярные категории</span>
          </div>
        </template>
        <DoughnutChart :chartData="popularCategories" />
      </el-card>
    </div>

    <FinanceTable
      @change-item="changeItem"
      @delete-item="deleteItem"
    />
    <AddForm
      ref="addForm"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { DoughnutChart, LineChart } from 'vue-chart-3'
import FinanceTable from '../components/FinanceTable'
import AddForm from '../components/AddForm.vue'
import { DELETE_FINANCE } from '../store/types/actions'

const addForm = ref(null)
const store = useStore()
const financeData = computed(() => {
  const data = store.getters.getFinanceDateset()
  const settings = store.state.settings

  return {
    labels: [...data.labels],
    datasets: [
      {
        label: 'Расходы',
        data: data.expenses,
        borderColor: settings.expensesColor,
        backgroundColor: settings.expensesColor
      },
      {
        label: 'Доходы',
        data: data.incomes,
        borderColor: settings.incomesColor,
        backgroundColor: settings.incomesColor
      }
    ]
  }
})

const popularCategories = computed(() => {
  const data = store.getters.getPopularCategories()

  return {
    labels: data.labels,
    datasets: [
      {
        data: data.expenses,
        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED']
      }
    ]
  }
})

const changeItem = (id) => {
  if (addForm.value.openEditor && typeof addForm.value.openEditor === 'function') {
    addForm.value.openEditor(id)
  }
}
const deleteItem = (id) => {
  store.dispatch(DELETE_FINANCE, id)
}
</script>

<style scoped lang="scss">
.card-box {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
}

.card-item {
  margin: 12px;
  min-height: 200px;
  width: calc(60% - 24px);
  color: #304156;

  &_sm {
    width: calc(40% - 24px);
  }
}
</style>
