import type { Router } from 'vue-router'
import { useSessionStore } from '@/entities/session'

const APP_NAME = 'Lottery'

export function setupGuards(router: Router): void {
  // Navigation guard: виконується перед кожним переходом.
  // Сторі використовується поза компонентом, тому Pinia має бути вже встановлена в застосунку
  router.beforeEach((to) => {
    const session = useSessionStore()

    if (to.meta.requiresAuth && !session.isAuthenticated) {
      // Запам'ятовуємо, куди хотів потрапити користувач, щоб повернути його після входу
      return { name: 'login', query: { redirect: to.fullPath } }
    }

    if (to.meta.guestOnly && session.isAuthenticated) {
      return { name: 'users' }
    }
  })

  // Після переходу міняємо заголовок вкладки
  router.afterEach((to) => {
    document.title = to.meta.title ? `${to.meta.title} | ${APP_NAME}` : APP_NAME
  })
}
