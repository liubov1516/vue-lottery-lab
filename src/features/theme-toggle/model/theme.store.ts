import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export type ThemeMode = 'light' | 'dark'

// Клас, за яким PrimeVue вмикає темну тему (див. app/providers/ui.ts)
const DARK_CLASS = 'app-dark'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const mode = ref<ThemeMode>('light')
    const isDark = computed(() => mode.value === 'dark')

    function toggle(): void {
      mode.value = isDark.value ? 'light' : 'dark'
    }

    // Застосовуємо тему до <html>: клас для PrimeVue і атрибут для Bootstrap
    watch(
      mode,
      (value) => {
        document.documentElement.classList.toggle(DARK_CLASS, value === 'dark')
        document.documentElement.setAttribute('data-bs-theme', value)
      },
      { immediate: true },
    )

    return { mode, isDark, toggle }
  },
  {
    // pinia-plugin-persistedstate: збереження в localStorage одним рядком конфігурації
    persist: { key: 'vue-lottery-app:theme', pick: ['mode'] },
  },
)
