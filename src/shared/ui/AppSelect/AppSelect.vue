<script setup lang="ts">
import { computed } from 'vue'
import Select from 'primevue/select'
import type { SelectOption } from './types'

const props = withDefaults(
  defineProps<{
    id: string
    label: string
    options: SelectOption[]
    placeholder?: string
    error?: string
    touched?: boolean
  }>(),
  {
    placeholder: 'Оберіть…',
    error: '',
    touched: false,
  },
)

const emit = defineEmits<{
  blur: []
}>()

const model = defineModel<string>({ required: true })

const isInvalid = computed(() => props.touched && props.error !== '')
</script>

<template>
  <div class="app-select mb-3">
    <label class="form-label" :for="id">{{ label }}</label>
    <Select
      v-model="model"
      class="w-100"
      :input-id="id"
      :options="options"
      option-label="label"
      option-value="value"
      :placeholder="placeholder"
      :invalid="isInvalid"
      @blur="emit('blur')"
    />
    <small v-if="isInvalid" :id="`${id}-error`" class="app-select__error">{{ error }}</small>
  </div>
</template>

<style scoped lang="scss">
.app-select__error {
  display: block;
  margin-top: 0.25rem;
  color: var(--p-red-500, #f05050);
}
</style>
