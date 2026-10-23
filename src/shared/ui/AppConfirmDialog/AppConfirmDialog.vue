<script setup lang="ts">
import Dialog from 'primevue/dialog'
import AppAlert from '../AppAlert/AppAlert.vue'
import AppButton from '../AppButton/AppButton.vue'

// Діалог підтвердження (наприклад, видалення користувача)
withDefaults(
  defineProps<{
    title: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
    loading?: boolean
    error?: string | null
  }>(),
  {
    confirmLabel: 'Так',
    cancelLabel: 'Ні',
    loading: false,
    error: null,
  },
)

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const visible = defineModel<boolean>('visible', { default: false })

function cancel(): void {
  visible.value = false
  emit('cancel')
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="title"
    :closable="!loading"
    :style="{ width: '28rem', maxWidth: '95vw' }"
    @hide="emit('cancel')"
  >
    <p class="mb-0">{{ message }}</p>
    <AppAlert v-if="error" class="mt-3 mb-0">{{ error }}</AppAlert>
    <template #footer>
      <AppButton :label="confirmLabel" severity="danger" :loading="loading" @click="emit('confirm')" />
      <AppButton :label="cancelLabel" severity="secondary" :disabled="loading" @click="cancel" />
    </template>
  </Dialog>
</template>
