<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore, type UpdateUserDto } from '@/entities/user'
import { UserForm, type UserFormValues } from '@/features/user-form'
import { getErrorMessage } from '@/shared/lib'
import { AppButton, useAppToast } from '@/shared/ui'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const usersStore = useUsersStore()
const toast = useAppToast()

const userId = computed(() => Number(props.id))

// Користувача вже завантажила батьківська сторінка UserDetailsView
const user = computed(() => usersStore.findUser(userId.value))

const initialValues = computed(() => {
  if (!user.value) {
    return undefined
  }
  const { firstName, lastName, email, username, age, gender, phone } = user.value
  return { firstName, lastName, email, username, age, gender, phone, password: '' }
})

const isSubmitting = ref(false)
const serverError = ref<string | null>(null)

async function updateUser(values: UserFormValues): Promise<void> {
  // Порожній пароль означає "не змінювати", тому не надсилаємо його
  const { password, ...rest } = values
  const data: UpdateUserDto = password ? { ...rest, password } : rest

  isSubmitting.value = true
  serverError.value = null
  try {
    await usersStore.updateUser(userId.value, data)
    toast.success('Дані учасника оновлено.')
    await router.push({ name: 'user-details', params: { id: props.id } })
  } catch (error) {
    serverError.value = getErrorMessage(error)
    toast.error(serverError.value)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section v-if="initialValues" class="card">
    <div class="card-body p-4">
      <h2 class="h5 mb-4">Редагування даних</h2>
      <!-- key: при переході на іншого користувача форма створюється заново -->
      <UserForm
        :key="id"
        mode="edit"
        submit-label="Оновити дані"
        :initial-values="initialValues"
        :is-submitting="isSubmitting"
        :server-error="serverError"
        @submit="updateUser"
      >
        <template #actions>
          <AppButton
            label="Скасувати"
            severity="secondary"
            :to="{ name: 'user-details', params: { id } }"
          />
        </template>
      </UserForm>
    </div>
  </section>
</template>
