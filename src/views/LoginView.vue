<template>
  <div class="min-h-screen w-full bg-[#2d3a4b] overflow-hidden">
    <el-form
      class="relative w-[520px] max-w-full pt-40 px-9 mx-auto overflow-hidden"
      :model="form"
      :rules="rules"
      label-width="auto"
      style="max-width: 600px"
    >
      <div class="relative">
        <h3
          class="text-[26px] text-[#eee] my-0 mx-auto mb-10 text-center font-bold"
        >
          用户登录
        </h3>
      </div>
      <el-form-item prop="username" class="login-form-item">
        <span class="inline-block py-1.5 pl-4 pr-1 text-[#889aa4] align-middle">
          <svg-icon icon="user" />
        </span>
        <el-input
          v-model="form.name"
          name="username"
          placeholder="username"
          type="text"
          class="login-input"
        />
      </el-form-item>

      <el-form-item prop="password" class="login-form-item">
        <span class="inline-block py-1.5 pl-4 pr-1 text-[#889aa4] align-middle">
          <svg-icon icon="password" />
        </span>
        <el-input
          v-model="form.password"
          placeholder="password"
          name="password"
          :type="passwordType"
          class="login-input"
        />
        <span
          class="absolute right-2.5 top-1.5 text-base text-[#889aa4] cursor-pointer select-none"
        >
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            @click="onChangePwdType"
          />
        </span>
      </el-form-item>

      <el-button
        type="primary"
        class="w-full mb-[30px]"
        :loading="isLoading"
        @click="onSubmit"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import md5 from 'md5'

// do not use same name with ref
const form = reactive({
  name: '',
  password: '',
})

const authStore = useAuthStore()
const router = useRouter()
const passwordType = ref('password')
const isLoading = ref(false)

const onChangePwdType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}

const onSubmit = async () => {
  if (isLoading.value) return
  isLoading.value = true
  try {
    // 使用 md5 加密密码
    const encryptedPassword = md5(form.password)
    await authStore.login(form.name, encryptedPassword)
    if (localStorage.getItem('token')) {
      // 登录后操作
      router.push('/')
    } else {
      alert('Login failed!')
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
:deep(.login-form-item) {
  @apply border border-white/10 bg-black/10 rounded-md;
}

:deep(.el-input__wrapper) {
  @apply bg-transparent border-0 shadow-none;
}

:deep(.is-focus) {
  @apply shadow-none;
}

:deep(.login-input) {
  @apply inline-block h-[42px] w-[400px];

  input {
    @apply bg-transparent border-0 rounded-none h-[42px] w-[400px];
    -webkit-appearance: none;
    caret-color: #fff;
  }
}
</style>
