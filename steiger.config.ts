import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

// Лінтер правил Feature-Sliced Design: напрямок залежностей, Public API, глибокі імпорти
export default defineConfig([...fsd.configs.recommended])
