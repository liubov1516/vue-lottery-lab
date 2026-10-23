import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { AuthTokens, AuthUser } from './types'

const STORAGE_KEY = 'vue-lottery-app:session'

interface StoredSession {
  accessToken: string | null
  refreshToken: string | null
  user: AuthUser | null
}

// Ручна синхронізація з localStorage (для порівняння з pinia-plugin-persistedstate,
// який використано в сторі теми: features/theme-toggle)
function readStoredSession(): StoredSession {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw) as StoredSession
    }
  } catch {
    // Пошкоджені дані або недоступний localStorage: починаємо без входу
  }
  return { accessToken: null, refreshToken: null, user: null }
}

export const useSessionStore = defineStore('session', () => {
  const stored = readStoredSession()

  const accessToken = ref<string | null>(stored.accessToken)
  const refreshToken = ref<string | null>(stored.refreshToken)
  const user = ref<AuthUser | null>(stored.user)

  const isAuthenticated = computed(() => accessToken.value !== null)

  // Будь-яка зміна токенів чи користувача одразу зберігається в localStorage
  watch(
    [accessToken, refreshToken, user],
    () => {
      try {
        if (accessToken.value) {
          const data: StoredSession = {
            accessToken: accessToken.value,
            refreshToken: refreshToken.value,
            user: user.value,
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      } catch {
        // localStorage недоступний: вхід працюватиме до перезавантаження сторінки
      }
    },
    { deep: true },
  )

  function setSession(tokens: AuthTokens, profile: AuthUser | null = null): void {
    accessToken.value = tokens.accessToken
    refreshToken.value = tokens.refreshToken
    user.value = profile
  }

  function setUser(profile: AuthUser): void {
    user.value = profile
  }

  function clearSession(): void {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
  }

  return {
    accessToken,
    refreshToken,
    user,
    isAuthenticated,
    setSession,
    setUser,
    clearSession,
  }
})
