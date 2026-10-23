import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useSessionStore, type AuthService, type LoginCredentials } from '@/entities/session'
import { HttpError, ServiceProvider } from '@/shared/api'
import { getErrorMessage } from '@/shared/lib'

// Сценарії авторизації: вхід, вихід, оновлення токена.
// Сам стан (токени, користувач) зберігається в entities/session
export const useAuthStore = defineStore('auth', () => {
  const session = useSessionStore()
  const service = () => ServiceProvider.get<AuthService>('auth')

  const isLoggingIn = ref(false)
  const loginError = ref<string | null>(null)

  async function login(credentials: LoginCredentials): Promise<boolean> {
    isLoggingIn.value = true
    loginError.value = null
    try {
      const { accessToken, refreshToken, ...profile } = await service().login(credentials)
      session.setSession({ accessToken, refreshToken }, profile)
      return true
    } catch (error) {
      loginError.value =
        error instanceof HttpError && (error.status === 400 || error.status === 401)
          ? 'Невірне ім’я користувача або пароль.'
          : getErrorMessage(error)
      return false
    } finally {
      isLoggingIn.value = false
    }
  }

  // Перевіряє збережений токен через захищений ендпоінт /auth/me
  async function fetchCurrentUser(): Promise<void> {
    if (!session.accessToken) {
      return
    }
    try {
      session.setUser(await service().getCurrentUser())
    } catch {
      // 401 уже оброблено в http-клієнті (оновлення токена або вихід)
    }
  }

  // Викликається http-клієнтом, коли сервер відповів 401
  async function refreshAccessToken(): Promise<boolean> {
    if (!session.refreshToken) {
      return false
    }
    try {
      const tokens = await service().refresh(session.refreshToken)
      session.setSession(tokens, session.user)
      return true
    } catch {
      return false
    }
  }

  function logout(): void {
    session.clearSession()
  }

  return { isLoggingIn, loginError, login, fetchCurrentUser, refreshAccessToken, logout }
})
