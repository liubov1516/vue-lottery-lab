// Єдине місце (разом із shared/ui), де підключається UI-бібліотека PrimeVue.
// Компоненти імпортуються окремо в обгортках shared/ui, тому в бандл потрапляють лише потрібні
import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

// Тема: основний колір відповідає зеленому кольору застосунку ($primary у main.scss)
const AppPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f1f9f1',
      100: '#dcf0dc',
      200: '#bde2bd',
      300: '#92cf92',
      400: '#62b562',
      500: '#3b9e3b',
      600: '#2d802d',
      700: '#256625',
      800: '#205121',
      900: '#1b431c',
      950: '#0b250c',
    },
  },
})

export function setupUi(app: App): void {
  app.use(PrimeVue, {
    theme: {
      preset: AppPreset,
      options: {
        // Темна тема вмикається класом app-dark на <html> (features/theme-toggle)
        darkModeSelector: '.app-dark',
        cssLayer: false,
      },
    },
  })
  app.use(ToastService)
}
