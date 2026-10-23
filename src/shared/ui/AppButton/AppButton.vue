<script setup lang="ts">
import Button from 'primevue/button'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

// Обгортка над кнопкою UI-бібліотеки. Решта застосунку знає лише про AppButton,
// тому заміна бібліотеки зачіпає лише цей шар
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    label: string
    type?: 'button' | 'submit'
    severity?: 'primary' | 'secondary' | 'danger'
    small?: boolean
    text?: boolean
    loading?: boolean
    disabled?: boolean
    icon?: string
    // Якщо передано to, кнопка працює як посилання роутера
    to?: RouteLocationRaw
  }>(),
  {
    type: 'button',
    severity: 'primary',
    small: false,
    text: false,
    loading: false,
    disabled: false,
    icon: undefined,
    to: undefined,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// У PrimeVue основна кнопка не має severity
function libSeverity(): 'secondary' | 'danger' | undefined {
  return props.severity === 'primary' ? undefined : props.severity
}
</script>

<template>
  <RouterLink v-if="to" v-slot="{ href, navigate }" :to="to" custom>
    <Button
      v-bind="$attrs"
      as="a"
      :href="href"
      :label="label"
      :icon="icon"
      :severity="libSeverity()"
      :size="small ? 'small' : undefined"
      :text="text"
      @click="navigate"
    />
  </RouterLink>
  <Button
    v-else
    v-bind="$attrs"
    :type="type"
    :label="label"
    :icon="icon"
    :severity="libSeverity()"
    :size="small ? 'small' : undefined"
    :text="text"
    :loading="loading"
    :disabled="disabled || loading"
    @click="emit('click', $event)"
  />
</template>
