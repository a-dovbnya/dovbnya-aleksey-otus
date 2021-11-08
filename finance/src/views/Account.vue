<template>
  <div>
    <h1 class="title">Счета</h1>

    <div class="accounts">
      <div
        v-for="account in accounts"
        :key="account.id"
        class="account-item"
        @click="toggleEditor(true, account.id)"
      >
        <div class="account-item__title">{{ account.name }}</div>
        <div class="account-item__bl">
          Баланс:
          <span class="account-item__value">{{ account.balance }} ₽</span>
        </div>
        <StarFilled class="account-item__icon" />
        <Close class="account-item__del" @click.stop="deleteAccount(account.id)" />
      </div>
    </div>

    <div class="common-balance">Итого: {{ commonBalance }} ₽</div>

    <el-button
      type="primary"
      @click="toggleEditor(true)"
    >Добавить счёт</el-button>

    <EditorPopup
      :open="isOpenEditor"
      :title="`${activeAcc === null ? 'Добавить' : 'Редактировать'} счет`"
      @toggleEditor="isOpenEditor = $event"
    >
      <AccountForm
        :id="activeAcc"
        @closePopup="toggleEditor(false)"
      />
    </EditorPopup>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import EditorPopup from '../components/EditorPopup'
import AccountForm from '../components/AccountsForm'
import { DELETE_ACCOUNT } from '../store/types/actions'

const store = useStore()
const isOpenEditor = ref(false)
const activeAcc = ref(null)

const accounts = computed(() => store.state.accounts)
const commonBalance = computed(() => {
  return accounts.value.reduce((prev, current) => prev + current.balance, 0)
})

const toggleEditor = (value, id) => {
  activeAcc.value = id !== undefined ? id : null
  isOpenEditor.value = value

  if (!value) {
    activeAcc.value = null
  }
}

const deleteAccount = (id) => {
  store.dispatch(DELETE_ACCOUNT, id)
}
</script>

<style scoped lang="scss">
.accounts {
  display: flex;
  flex-wrap: wrap;
}

.account-item {
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  background-color: white;
  overflow: hidden;
  color: #303133;
  padding: 18px;
  width: 250px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
  transition: 0.2s linear;

  &:hover {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);

    .account-item__del {
      opacity: 1;
    }
  }

  & + & {
    margin-left: 20px;
  }

  &__title {
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 19px;
  }

  &__icon {
    width: 40px;
    height: 40px;
    color: #ffd700;
    margin-right: 4px;
    position: absolute;
    right: 0px;
    bottom: 3px;
    opacity: 0.3;
  }

  &__del {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 14px;
    top: 11px;
    opacity: 0;
    transition: .2s ease;

    &:hover {
      opacity: .5
    }
  }

  &__value {
    margin: 0;
    color: grey;
    font-size: 15px;
    font-weight: bold;
  }

  &__bl {
    margin-top: 5px;
    font-size: 15px;
    font-weight: bold;
  }
}

.common-balance {
  margin: 30px 0;
  font-size: 28px;
}
</style>
