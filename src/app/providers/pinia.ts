import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export function setupPinia() {
  const pinia = createPinia()
  // Плагін зберігає в localStorage ті сторі, де вказано опцію persist (стор теми)
  pinia.use(piniaPluginPersistedstate)
  return pinia
}
