import { z } from 'zod'

// Схема zod для форми входу. VeeValidate перевіряє поля за нею
export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Вкажіть ім’я користувача'),
  password: z
    .string()
    .min(1, 'Вкажіть пароль')
    .min(6, 'Пароль має містити щонайменше 6 символів'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
