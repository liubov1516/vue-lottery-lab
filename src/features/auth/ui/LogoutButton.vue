<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AppButton, useAppToast } from '@/shared/ui'
import { useAuthStore } from '../model/auth.store'

const auth = useAuthStore()
const router = useRouter()
const toast = useAppToast()

async function logout(): Promise<void> {
  auth.logout()
  await router.push({ name: 'login' })
  toast.info('Ви вийшли з акаунта.')
}
</script>

<template>
  <AppButton label="Logout" icon="bi bi-box-arrow-right" severity="secondary" text @click="logout" />
</template>
