<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter, type RouteLocationRaw } from 'vue-router'
import { LoginForm, useAuthStore, type LoginFormValues } from '@/features/auth'
import { useAppToast } from '@/shared/ui'

const auth = useAuthStore()
const toast = useAppToast()
const route = useRoute()
const router = useRouter()

// Куди повернути користувача після входу. Дозволяємо лише внутрішні адреси
function getRedirectTarget(): RouteLocationRaw {
  const redirect = route.query.redirect
  if (typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect
  }
  return { name: 'users' }
}

async function handleLogin(values: LoginFormValues): Promise<void> {
  const success = await auth.login(values)
  if (success) {
    toast.success('Вхід виконано.')
    await router.replace(getRedirectTarget())
  } else if (auth.loginError) {
    toast.error(auth.loginError)
  }
}

// Прибираємо помилку від попередньої спроби
onMounted(() => {
  auth.loginError = null
})
</script>

<template>
  <section class="card">
    <div class="card-body p-4">
      <h1 class="h4 mb-1">Вхід</h1>
      <p class="text-secondary mb-4">Увійдіть, щоб переглядати учасників лотереї.</p>
      <LoginForm
        :is-submitting="auth.isLoggingIn"
        :server-error="auth.loginError"
        @submit="handleLogin"
      />
      <p class="login__hint mt-3 mb-0">
        Тестовий акаунт DummyJSON: <code>emilys</code> / <code>emilyspass</code>
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.login__hint {
  color: var(--app-text-muted);
  font-size: 0.875rem;
}
</style>
