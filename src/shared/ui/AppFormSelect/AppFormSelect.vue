<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'
import AppSelect from '../AppSelect/AppSelect.vue'
import type { SelectOption } from '../AppSelect/types'

const props = withDefaults(
  defineProps<{
    name: string
    label: string
    options: SelectOption[]
    placeholder?: string
    idPrefix?: string
  }>(),
  {
    placeholder: 'Оберіть…',
    idPrefix: 'field',
  },
)

const { value, errorMessage, meta, handleBlur } = useField<string | undefined>(() => props.name)

const selected = computed({
  get: () => value.value ?? '',
  set: (newValue: string) => {
    value.value = newValue
  },
})
</script>

<template>
  <AppSelect
    :id="`${idPrefix}-${name}`"
    v-model="selected"
    :label="label"
    :options="options"
    :placeholder="placeholder"
    :error="errorMessage ?? ''"
    :touched="meta.touched"
    @blur="handleBlur(undefined, true)"
  />
</template>
