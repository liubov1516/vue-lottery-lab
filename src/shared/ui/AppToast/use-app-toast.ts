import { useToast } from 'primevue/usetoast'

const LIFE_MS = 3500

// Сповіщення про результат операцій. Контейнер <AppToast /> розміщено в App.vue
export function useAppToast() {
  const toast = useToast()

  return {
    success(message: string): void {
      toast.add({ severity: 'success', summary: 'Готово', detail: message, life: LIFE_MS })
    },
    error(message: string): void {
      toast.add({ severity: 'error', summary: 'Помилка', detail: message, life: LIFE_MS * 2 })
    },
    info(message: string): void {
      toast.add({ severity: 'info', summary: 'Інформація', detail: message, life: LIFE_MS })
    },
  }
}
