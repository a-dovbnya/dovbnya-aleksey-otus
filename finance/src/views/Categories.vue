<template>
  <div>
    <h1 class="title">Категории</h1>

    <div class="categoties">
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="Расходы" name="costs">
          <div class="cat-list">
            <CategoryItem
              v-for="item in categoryExpenses"
              :key="`cost-${item.id}`"
              :id="item.id"
              :title="item.name"
              @cat-edit="categoryEdit"
              @cat-delete="categoryDelete"
            />
          </div>

          <el-button
            type="primary"
            class="add-cat"
            @click="toggleEditor(true)"
          >Добавить</el-button>
        </el-tab-pane>

        <el-tab-pane label="Доходы" name="income">
          <div class="cat-list">
            <CategoryItem
              v-for="item in categoryIncome"
              :key="`income-${item.id}`"
              :id="item.id"
              :title="item.name"
              @cat-edit="categoryEdit"
              @cat-delete="categoryDelete"
            />
          </div>

          <el-button
            type="primary"
            class="add-cat"
            @click="toggleEditor(true)"
          >Добавить</el-button>
        </el-tab-pane>
      </el-tabs>

      <EditorPopup
        :open="isOpenEditor"
        :title="`${activeCat === null ? 'Добавить' : 'Редактировать'} категорию`"
        @toggleEditor="isOpenEditor = $event"
      >
        <CategoryForm
          :id="activeCat"
          @closePopup="toggleEditor(false)"
        />
      </EditorPopup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import EditorPopup from '../components/EditorPopup'
import CategoryItem from '../components/CategoryItem'
import CategoryForm from '../components/CategoryForm'
import { DELETE_CATEGORY } from '../store/types/actions'

const activeTab = ref('costs')
const isOpenEditor = ref(false)
const activeCat = ref(null)
const store = useStore()
const categoryIncome = computed(() => store.getters.getCategoryIncome)
const categoryExpenses = computed(() => store.getters.getCategoryExpenses)

const categoryEdit = (id) => {
  toggleEditor(true, id)
}

const categoryDelete = (id) => {
  store.dispatch(DELETE_CATEGORY, id)
}

const toggleEditor = (value, id) => {
  activeCat.value = id !== undefined ? id : null
  isOpenEditor.value = value

  if (!value) {
    activeCat.value = null
  }
}

</script>

<style scoped lang="scss">
.add-cat {
  margin-top: 20px;
  margin-left: 25px;
  min-width: 150px;
}

.cat-list {
  padding: 10px 5px;
  display: flex;
  flex-wrap: wrap;
  width: 350px;
}
</style>
