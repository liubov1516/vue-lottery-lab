import { createApp } from 'vue'
import { useAuthStore } from '@/features/auth'
import { setAuthHooks } from '@/shared/api'
import { useSessionStore } from '@/entities/session'
import App from './App.vue'
import { setupPinia } from './providers/pinia'
import router from './providers/router'
import { registerServices } from './providers/services'
import { setupUi } from './providers/ui'

import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/main.scss'

// Сервіси реєструються до того, як будь-яке сторі спробує їх використати
registerServices()

const app = createApp(App)
const pinia = setupPinia()

// Pinia підключаємо першою: guard роутера вже використовує сторі
app.use(pinia)
app.use(router)
setupUi(app)

const session = useSessionStore(pinia)
const auth = useAuthStore(pinia)

// Пояснюємо HTTP-клієнту, де брати токен і що робити при 401
setAuthHooks({
  getAccessToken: () => session.accessToken,
  refreshAccessToken: () => auth.refreshAccessToken(),
  onUnauthorized: () => {
    auth.logout()
    // Чекаємо, поки роутер визначить поточну сторінку (важливо при першому завантаженні)
    void router.isReady().then(() => {
      const current = router.currentRoute.value
      if (current.meta.requiresAuth) {
        void router.push({ name: 'login', query: { redirect: current.fullPath } })
      }
    })
  },
})

// Якщо в localStorage є токен, перевіряємо його через /auth/me
void auth.fetchCurrentUser()

// Монтуємо застосунок, коли роутер визначив першу сторінку,
// щоб не було миготіння неправильного layout
void router.isReady().then(() => app.mount('#app'))
