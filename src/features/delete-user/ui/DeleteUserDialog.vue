<script setup lang="ts">
import { ref } from 'vue'
import { useUsersStore, type User } from '@/entities/user'
import { getErrorMessage } from '@/shared/lib'
import { AppConfirmDialog, useAppToast } from '@/shared/ui'

const props = defineProps<{
  user: User
}>()

const emit = defineEmits<{
  close: []
  deleted: [id: number]
}>()

const visible = defineModel<boolean>('visible', { default: true })

const usersStore = useUsersStore()
const toast = useAppToast()
const isDeleting = ref(false)
const error = ref<string | null>(null)

async function confirmDelete(): Promise<void> {
  isDeleting.value = true
  error.value = null
  try {
    await usersStore.removeUser(props.user.id)
    toast.success(`Учасника ${props.user.firstName} ${props.user.lastName} видалено.`)
    visible.value = false
    emit('deleted', props.user.id)
  } catch (deleteError) {
    error.value = getErrorMessage(deleteError)
    toast.error(error.value)
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <AppConfirmDialog
    v-model:visible="visible"
    title="Видалення учасника"
    :message="`Ви дійсно бажаєте видалити учасника &quot;${user.firstName} ${user.lastName}&quot;, &quot;${user.email}&quot;?`"
    :loading="isDeleting"
    :error="error"
    @confirm="confirmDelete"
    @cancel="emit('close')"
  />
</template>
