<template>
  <el-table :data="data" :row-class-name="tableRowClassName" class="fin-table">
    <el-table-column prop="date" label="Дата" width="180" />
    <el-table-column prop="value" label="Значение" width="180" />
    <el-table-column prop="category" label="Категория" />
    <el-table-column prop="note" label="Примечание" width="180" />
    <el-table-column width="80">
      <template #default="scope">
        <el-button
          class="action-btn"
          type="primary"
          circle
          @click="emits('change-item', scope.row.id)"
        ><Edit /></el-button>
      </template>
    </el-table-column>

    <el-table-column width="80">
      <template #default="scope">
        <el-button
          class="action-btn"
          type="danger"
          circle
          @click="emits('delete-item', scope.row.id)"
        ><Delete /></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { computed, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { simpleDate } from '../utils/datetime'

const store = useStore()
const emits = defineEmits(['change-item', 'delete-item'])
const finance = computed(() => store.getters.getFinanceSortDate)
const data = computed(() => {
  return finance.value.map(el => {
    const category = store.getters.getCategoryById(el.category)

    return {
      id: el.id,
      date: simpleDate(el.date),
      value: el.value + ' Р',
      category: category.name,
      note: el.note,
      group: el.group
    }
  })
})

const tableRowClassName = ({ row, rowIndex }) => {
  if (row.group === 'income') {
    return 'income-row'
  } else if (row.group === 'expenses') {
    return 'expenses-row'
  }
  return ''
}
</script>

<style scoped lang="scss">
.fin-table {
  width: 100%;
  margin-top: 30px;
}

.action-btn {
  svg {
    width: 18px;
    height: 18px;
  }
}
</style>
