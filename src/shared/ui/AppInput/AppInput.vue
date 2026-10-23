<script setup lang="ts">
import { computed } from 'vue'
import InputText from 'primevue/inputtext'

const props = withDefaults(
  defineProps<{
    id: string
    label: string
    type?: 'text' | 'email' | 'tel' | 'date' | 'password' | 'number' | 'search'
    placeholder?: string
    // Текст помилки валідації (VeeValidate)
    error?: string
    // touched: користувач уже працював з полем, тому можна показувати помилку
    touched?: boolean
    autocomplete?: string
    // Приховати підпис візуально (для поля пошуку), але залишити для скрінрідерів
    hideLabel?: boolean
  }>(),
  {
    type: 'text',
    placeholder: '',
    error: '',
    touched: false,
    autocomplete: undefined,
    hideLabel: false,
  },
)

const emit = defineEmits<{
  blur: []
}>()

const model = defineModel<string>({ required: true })

const isInvalid = computed(() => props.touched && props.error !== '')
</script>

<template>
  <div class="app-input mb-3">
    <label class="form-label" :class="{ 'visually-hidden': hideLabel }" :for="id">{{ label }}</label>
    <InputText
      :id="id"
      v-model="model"
      class="w-100"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :invalid="isInvalid"
      :aria-invalid="isInvalid"
      :aria-describedby="isInvalid ? `${id}-error` : undefined"
      @blur="emit('blur')"
    />
    <small v-if="isInvalid" :id="`${id}-error`" class="app-input__error">{{ error }}</small>
  </div>
</template>

<style scoped lang="scss">
.app-input__error {
  display: block;
  margin-top: 0.25rem;
  color: var(--p-red-500, #f05050);
}
</style>
