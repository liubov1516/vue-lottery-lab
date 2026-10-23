<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { AppAlert, AppButton, AppFormInput } from '@/shared/ui'
import { loginSchema, type LoginFormValues } from '../model/schema'

withDefaults(
  defineProps<{
    isSubmitting?: boolean
    // Помилка авторизації від сервера ("Невірне ім'я користувача або пароль")
    serverError?: string | null
  }>(),
  {
    isSubmitting: false,
    serverError: null,
  },
)

const emit = defineEmits<{
  submit: [values: LoginFormValues]
}>()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: { username: '', password: '' },
})

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form novalidate @submit.prevent="onSubmit">
    <AppFormInput id-prefix="login" name="username" label="Username" autocomplete="username" />
    <AppFormInput
      id-prefix="login"
      name="password"
      label="Password"
      type="password"
      autocomplete="current-password"
    />

    <AppAlert v-if="serverError">{{ serverError }}</AppAlert>

    <AppButton class="w-100" type="submit" label="Login" :loading="isSubmitting" />
  </form>
</template>
