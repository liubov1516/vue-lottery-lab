<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUsersStore } from '@/entities/user'
import { UserForm, type UserFormValues } from '@/features/user-form'
import { getErrorMessage } from '@/shared/lib'
import { useAppToast } from '@/shared/ui'

const router = useRouter()
const usersStore = useUsersStore()
const toast = useAppToast()

const isSubmitting = ref(false)
const serverError = ref<string | null>(null)

async function createUser(values: UserFormValues): Promise<void> {
  isSubmitting.value = true
  serverError.value = null
  try {
    const user = await usersStore.createUser(values)
    toast.success(`Учасника ${user.firstName} ${user.lastName} створено.`)
    // Новий учасник показується на початку першої сторінки списку
    await router.push({ name: 'users' })
  } catch (error) {
    serverError.value = getErrorMessage(error)
    toast.error(serverError.value)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <RouterLink class="d-inline-block mb-3" :to="{ name: 'users', query: usersStore.lastListQuery }">
    <i class="bi bi-arrow-left me-1" aria-hidden="true"></i>До списку учасників
  </RouterLink>

  <section class="card">
    <div class="card-body p-4">
      <h1 class="h4 mb-1">Новий учасник</h1>
      <p class="text-secondary mb-4">Усі поля обов'язкові.</p>
      <UserForm
        mode="create"
        submit-label="Save"
        :is-submitting="isSubmitting"
        :server-error="serverError"
        @submit="createUser"
      />
    </div>
  </section>
</template>
