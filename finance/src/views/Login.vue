<template>
  <div v-loading="isLoading" class="auth-page">
    <div class="auth-box">
      <el-form
        ref="formRef"
        :label-position="'top'"
        :model="authForm"
        :rules="rules"
        class="auth-form"
      >
        <el-form-item label="Логин" prop="login">
          <el-input v-model="authForm.login" placeholder="Логин" />
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
          <el-input v-model="authForm.password" type="password" placeholder="Пароль" />
        </el-form-item>
        <el-form-item>
          <el-button class="auth-form__btn" type="primary" @click="submitForm">Вход</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { AUTH_REQUEST } from '../store/types/actions'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const formRef = ref(null)
const authForm = ref({
  login: '',
  password: ''
})

const isLoading = computed(() => store.state.auth.isFetching)

const submitForm = (formName) => {
  formRef.value.validate(valid => {
    if (!valid) {
      return false
    }

    store.dispatch(AUTH_REQUEST, { login: authForm.value.login, password: authForm.value.password })
  })
}

const rules = ref({
  login: [
    {
      required: true,
      message: 'Поле не должно быть пустым',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Поле не должно быть пустым',
      trigger: 'blur'
    }
  ]
})
</script>

<style scoped lang="scss">
.auth-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-box {
  background: #fff;
  // padding: 40px;
  width: 650px;
  min-height: 300px;
  -webkit-box-shadow: 0 15px 30px 0 rgb(0 0 0 / 20%);
  box-shadow: 0 15px 30px 0 rgb(0 0 0 / 20%);
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 46%;
    // background: url("../assets/img/auth-bg.webp") no-repeat center center/auto 100%;
    background: url("../assets/img/bg_2.jpg") no-repeat center center/auto 100%;
  }

  &__col {
    width: 50%;
  }
}

.auth-form {
  padding: 40px;
  width: 60%;
  text-align: left;

  &__title {
    margin-bottom: 25px;
    font-size: 27px;
  }

  &__row {
    margin-bottom: 25px;
  }

  &__btn {
    width: 200px;
  }
}
</style>
